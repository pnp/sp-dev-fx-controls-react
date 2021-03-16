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