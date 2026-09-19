const { initializeIcons } = require("@uifabric/icons");
const { registerIcons } = require("@uifabric/styling");

jest.mock("@microsoft/sp-http", () => {
  return {
    SPHttpClient: {
      configurations: {
        v1: 1
      }
    },
    HttpClient: {
      configurations: {
        v1: 1
      }
    }
  }
});
jest.mock("@microsoft/decorators", () => {
  return {
    __decorate: (control) => {
      return control;
    }
  }
});

initializeIcons();
registerIcons({
  icons: {
    FileSass: "\uEAE3",
    VisioDocument: "\uE452",
    WordDocument: "\uE8A5"
  }
});

DEBUG = true;