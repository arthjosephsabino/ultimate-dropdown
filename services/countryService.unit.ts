import { mockCountries } from "@/__mocks__/countries";
import * as countryService from "./countryService";
import { apiRequest } from "./utils/apiClient";

jest.mock("./utils/apiClient", () => ({
  apiRequest: jest.fn(),
}));

describe("countryService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getCountries should return a list of countries", async () => {
    (apiRequest as jest.Mock).mockResolvedValue(mockCountries);

    const result = await countryService.getCountries();

    expect(apiRequest).toHaveBeenCalledWith({
      url: "/countries",
      method: "GET",
    });
    expect(result).toEqual(mockCountries);
  });

  it("getCountries should throw error when apiRequest fails", async () => {
    const mockError = new Error("Network Error");

    (apiRequest as jest.Mock).mockRejectedValue(mockError);

    await expect(countryService.getCountries()).rejects.toThrow(
      "Network Error"
    );
    expect(apiRequest).toHaveBeenCalledWith({
      url: "/countries",
      method: "GET",
    });
  });
});
