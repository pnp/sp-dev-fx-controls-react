const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

jest.mock("@microsoft/decorators", () => {
  return {
    __decorate: (control) => {
      return control;
    }
  }
});
DEBUG = true;
