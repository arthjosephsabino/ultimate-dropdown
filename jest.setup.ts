import "@testing-library/jest-dom";
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning:") ||
        args[0].includes("ReactDOM.render is no longer supported"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Warning:")) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
