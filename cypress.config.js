const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://paciente-staging.lacreisaude.com.br',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin.default(config)] }));
      return config;
    },
    specPattern: "cypress/e2e/feature/**/*.feature",
    env: {
      userEmail: 'qa.testes.leonam@gmail.com',
      userPassword: 'LEONAMcs@1'
    }
  },
});
