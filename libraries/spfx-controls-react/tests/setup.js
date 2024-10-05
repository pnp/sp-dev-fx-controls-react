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
})
DEBUG = true;