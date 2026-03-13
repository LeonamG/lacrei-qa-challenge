import { writeFileSync } from 'fs';
import puppeteer from 'puppeteer';
import { startFlow, desktopConfig } from 'lighthouse';

async function captureUserFlow() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const flow = await startFlow(page, {
    config: desktopConfig,
    name: 'Fluxo de Qualidade Lacrei Saúde',
  });

  console.log('Iniciando navegação...');
  await flow.navigate('https://paciente-staging.lacreisaude.com.br/');

  // --- PARTE DE INTERAÇÃO ---
  await flow.startTimespan({ stepName: 'Login e Busca' });
  
  await page.type('[name="email"]', 'qa.testes.leonam@gmail.com');
  await page.type('[name="password"]', 'LEONAMcs@1');
  
  // Usando o seletor corrigido para o botão
  const loginButton = 'button ::-p-text(Entrar)';
  await page.waitForSelector(loginButton);
  await page.click(loginButton);
  
  // Espera carregar a busca e faz a pesquisa
  await page.waitForSelector('[name="search"]', { visible: true, timeout: 15000 });
  await page.type('[name="search"]', 'São Paulo');
  await page.keyboard.press('Enter');
  
  await flow.endTimespan();

  // --- AQUI ENTRA A PARTE DA TABELA (O QUE VOCÊ PEDIU) ---
  console.log('\nProcessando scores...');
  const flowResult = await flow.createFlowResult();

  const tabelaResultados = flowResult.steps.map(step => {
    const categories = step.lhr.categories;
    const getScore = (cat) => cat ? Math.round(cat.score * 100) : 'N/A';

    return {
      'Etapa': step.name,
      'Performance': getScore(categories.performance),
      'Acessibilidade': getScore(categories.accessibility),
      'SEO': getScore(categories.seo)
    };
  });

  console.log('\n=== RELATÓRIO DE QUALIDADE (0-100) ===');
  console.table(tabelaResultados); // Isso cria a tabela mágica no terminal

  // --- FECHAMENTO ---
  await browser.close();
}

captureUserFlow();