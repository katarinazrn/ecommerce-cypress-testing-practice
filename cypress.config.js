const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  e2e: {
    baseUrl: "https://saucedemo.com/"
  },
});
