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

jest.mock('chart.js', () => {
  class MockChart {
    static defaults = {
      global: {
        title: {},
        legend: {
          labels: {}
        },
        tooltips: {},
        defaultFontColor: '',
        defaultFontFamily: '',
        defaultFontSize: 0
      },
      scale: {
        gridLines: {
          color: ''
        }
      }
    };

    constructor(canvas) {
      this.canvas = canvas;
      this.destroy = jest.fn();
      this.update = jest.fn();
      this.render = jest.fn();
      this.stop = jest.fn();
      this.clear = jest.fn();
      this.toBase64Image = jest.fn();
      this.getDatasetAtEvent = jest.fn().mockReturnValue([]);
      this.getElementAtEvent = jest.fn().mockReturnValue([]);
      this.getElementsAtEvent = jest.fn().mockReturnValue([]);
    }
  }

  return {
    Chart: MockChart
  };
});

DEBUG = true;
