# teste-ci-cd
Modelo de automação simples para exemplo de execução no CI do GitHub Actions

✅ Opção mais comum e poderosa: Allure Reports
1. Instale os pacotes:

npm install -D @shelex/cypress-allure-plugin allure-commandline
2. Configure o cypress.config.js:

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@shelex/cypress-allure-plugin/writer')(on, config);
      return config;
    },
    baseUrl: 'https://qa-impact.github.io/',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
  },
  reporter: 'cypress-allure-plugin',
  reporterOptions: {
    outputDir: 'allure-results',
    overwrite: true,
    clean: true,
  },
});

3. No cypress/support/e2e.js:

import '@shelex/cypress-allure-plugin';
4. Scripts no package.json:
json
Copiar
Editar
"scripts": {
  "test": "cypress run",
  "report:generate": "allure generate allure-results --clean -o allure-report",
  "report:open": "allure open allure-report"
}
5. Rodar:

npm run test
npm run report:generate
npm run report:open   # ou publique o conteúdo da pasta allure-report
🌐 Publicando o relatório
✅ No GitHub Pages:
Configure o deploy do repositório para publicar o conteúdo da pasta allure-report/.

Ou use um GitHub Action para gerar e publicar automaticamente (posso montar um pra você).

🧠 Alternativa mais simples: cypress-mochawesome-reporter
Se preferir algo mais direto e só com HTML simples:

1. Instale:

npm install -D mochawesome mochawesome-merge mochawesome-report-generator cypress-mochawesome-reporter
2. No cypress.config.js:

reporter: 'cypress-mochawesome-reporter',
reporterOptions: {
  charts: true,
  reportPageTitle: 'QA Playground Report',
  embeddedScreenshots: true,
  inlineAssets: true
},
e2e: {
  setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
  },
},
3. No cypress/support/e2e.js:

import 'cypress-mochawesome-reporter/register';
4. Script:

"scripts": {
  "test": "cypress run",
  "report": "npx mochawesome-merge cypress/results/*.json | npx mochawesome-report-generator --reportDir cypress/report --reportFilename index.html"
}
