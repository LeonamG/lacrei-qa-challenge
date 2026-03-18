import puppeteer from 'puppeteer';

// altere para quantos usuarios que irá ter no testes
const CONFIG = {
  usuarios: 10,          // quantos usuários simultâneos simular
  baseUrl: 'https://paciente-staging.lacreisaude.com.br',
  email: 'qa.testes.leonam@gmail.com',
  senha: 'LEONAMcs@1',
  termoBusca: 'São Paulo',
};

async function simularUsuario(id) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const tempos = { usuario: id };
  const t = (label) => ({ label, inicio: Date.now() });
  const encerrar = (timer) => ({ ...timer, ms: Date.now() - timer.inicio });

  try {
    // 1. Carregar página de login
    let timer = t('login_carregamento');
    await page.goto(CONFIG.baseUrl, { waitUntil: 'networkidle2' });
    tempos.login_carregamento = encerrar(timer).ms;

    // 2. Fazer login
    timer = t('login_submit');
    await page.type('[name="email"]', CONFIG.email);
    await page.type('[name="password"]', CONFIG.senha);
    await page.click('button ::-p-text(Entrar)');
    await page.waitForSelector('[name="search"]', { visible: true, timeout: 15000 });
    tempos.login_submit = encerrar(timer).ms;

    // 3. Pesquisar profissional
    timer = t('pesquisa');
    await page.type('[name="search"]', CONFIG.termoBusca);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#atendimentos > .sc-bbSZdi', { timeout: 15000 });
    tempos.pesquisa = encerrar(timer).ms;

    tempos.status = '✅ OK';
  } catch (err) {
    tempos.status = `❌ ERRO: ${err.message.slice(0, 80)}`;
  } finally {
    await browser.close();
  }

  return tempos;
}

async function rodarTeste() {
  console.log(`\n🚀 Iniciando teste de carga com ${CONFIG.usuarios} usuário(s) simultâneo(s)...\n`);

  const inicio = Date.now();

  // Dispara todos os usuários ao mesmo tempo
  const promises = Array.from({ length: CONFIG.usuarios }, (_, i) =>
    simularUsuario(i + 1)
  );

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
  const ok = resultados.filter(r => r.status === '✅ OK');
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
