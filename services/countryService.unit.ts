import { mockCountries } from "@/__mocks__/countries";
import { getCountries } from "./countryService";

describe("getCountries", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should return parsed countries when API responds with valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCountries,
    });

    const result = await getCountries();

    expect(result).toEqual(mockCountries);
  });

  it("should throw an error if response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    });

    await expect(getCountries()).rejects.toThrow(
      "Failed to fetch countries: Internal Server Error"
    );
  });

  it("should throw an error if response format is invalid", async () => {
    const invalidResponse = [{ id: "wrong-type", value: "Test" }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidResponse,
    });

    await expect(getCountries()).rejects.toThrow(
      "Invalid countries response format"
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should throw on network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    await expect(getCountries()).rejects.toThrow("Network Error");
  });
});
