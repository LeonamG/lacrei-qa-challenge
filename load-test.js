import puppeteer from 'puppeteer';

// ============================================================
//  CONFIGURAÇÃO — edite aqui antes de rodar
// ============================================================
const CONFIG = {
  usuarios: 5,          // quantos usuários simultâneos simular
  delayEntreUsuarios: 1000, // ms de espera entre cada usuário iniciar (evita sobrecarga)
  tentativas: 2,        // quantas vezes tentar em caso de erro
  baseUrl: 'https://paciente-staging.lacreisaude.com.br',
  email: 'qa.testes.leonam@gmail.com',
  senha: 'LEONAMcs@1',
  termoBusca: 'São Paulo',
};
// ============================================================

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function tentarSimular(id) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const tempos = { usuario: id };
  const t = () => Date.now();

  try {
    // 1. Carregar página de login
    let inicio = t();
    await page.goto(CONFIG.baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    tempos.login_carregamento = t() - inicio;

    // 2. Fazer login
    inicio = t();
    await page.type('[name="email"]', CONFIG.email);
    await page.type('[name="password"]', CONFIG.senha);
    await page.click('button ::-p-text(Entrar)');
    await page.waitForSelector('[name="search"]', { visible: true, timeout: 30000 });
    tempos.login_submit = t() - inicio;

    // 3. Pesquisar profissional
    inicio = t();
    await page.type('[name="search"]', CONFIG.termoBusca);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#atendimentos > .sc-bbSZdi', { timeout: 30000 });
    tempos.pesquisa = t() - inicio;

    tempos.status = '✅ OK';
  } finally {
    await browser.close();
  }

  return tempos;
}

async function simularUsuario(id) {
  for (let tentativa = 1; tentativa <= CONFIG.tentativas; tentativa++) {
    try {
      const resultado = await tentarSimular(id);
      if (tentativa > 1) resultado.status = `✅ OK (tentativa ${tentativa})`;
      return resultado;
    } catch (err) {
      if (tentativa === CONFIG.tentativas) {
        return { usuario: id, status: `❌ ERRO: ${err.message.slice(0, 80)}` };
      }
      console.log(`  ⚠️  Usuário #${id} falhou na tentativa ${tentativa}, tentando novamente...`);
      await sleep(2000);
    }
  }
}

async function rodarTeste() {
  console.log(`\n🚀 Iniciando teste de carga com ${CONFIG.usuarios} usuário(s)...`);
  console.log(`   Delay entre usuários: ${CONFIG.delayEntreUsuarios}ms | Tentativas: ${CONFIG.tentativas}\n`);

  const inicio = Date.now();

  // Dispara usuários com delay escalonado para não sobrecarregar o servidor
  const promises = Array.from({ length: CONFIG.usuarios }, async (_, i) => {
    await sleep(i * CONFIG.delayEntreUsuarios);
    return simularUsuario(i + 1);
  });

  const resultados = await Promise.all(promises);
  const duracaoTotal = ((Date.now() - inicio) / 1000).toFixed(2);

  // Exibe tabela de resultados
  console.log('\n=== RESULTADOS POR USUÁRIO ===');
  console.table(
    resultados.map(r => ({
      'Usuário':        `#${r.usuario}`,
      'Login (ms)':     r.login_carregamento ?? 'N/A',
      'Submit (ms)':    r.login_submit       ?? 'N/A',
      'Pesquisa (ms)':  r.pesquisa           ?? 'N/A',
      'Status':         r.status,
    }))
  );

  // Calcula médias apenas dos que passaram
  const ok = resultados.filter(r => r.status?.startsWith('✅'));
  const media = (campo) =>
    ok.length
      ? Math.round(ok.reduce((s, r) => s + (r[campo] || 0), 0) / ok.length)
      : 'N/A';

  console.log('\n=== RESUMO ===');
  console.table([{
    'Usuários simulados':  CONFIG.usuarios,
    'Sucesso':             ok.length,
    'Falha':               CONFIG.usuarios - ok.length,
    'Média login (ms)':    media('login_carregamento'),
    'Média submit (ms)':   media('login_submit'),
    'Média pesquisa (ms)': media('pesquisa'),
    'Duração total (s)':   duracaoTotal,
  }]);
}

rodarTeste();
