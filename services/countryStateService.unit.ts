import { mockCountryStates } from "@/__mocks__/countryStates";
import * as countryStateService from "./countryStateService";
import { apiRequest } from "./utils/apiClient";

jest.mock("./utils/apiClient", () => ({
  apiRequest: jest.fn(),
}));

describe("countryStateService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getCountryStatesByCountryId should return states for a given country", async () => {
    const countryId = 123;

    (apiRequest as jest.Mock).mockResolvedValue(mockCountryStates);

    const result = await countryStateService.getCountryStatesByCountryId(
      countryId
    );

    expect(apiRequest).toHaveBeenCalledWith({
      url: `/countries/${countryId}/states`,
      method: "GET",
    });
    expect(result).toEqual(mockCountryStates);
  });

  it("getCountryStatesByCountryId should throw error when apiRequest fails", async () => {
    const mockError = new Error("Network Error");
    const countryId = 123;

    (apiRequest as jest.Mock).mockRejectedValue(mockError);

    await expect(
      countryStateService.getCountryStatesByCountryId(countryId)
    ).rejects.toThrow("Network Error");

    expect(apiRequest).toHaveBeenCalledWith({
      url: `/countries/${countryId}/states`,
      method: "GET",
    });
  });
});
