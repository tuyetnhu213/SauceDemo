const { defineConfig } = require("cypress");

module.exports = defineConfig({
    video: true,
    videoCompression: 32,
    videoUploadOnPasses: true,

    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: false,
        json: true
    },

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here if needed
        },
        specPattern: 'cypress/e2e/**/*.cy.js'    }
});
