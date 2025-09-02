import { CountryState } from "@/types/countryState";
import { getCountryStatesByCountryId } from "./countryStateService";

describe("getCountryStatesByCountryId", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should return parsed states when API responds with valid data", async () => {
    const mockStates: CountryState[] = [
      { id: 1, value: "Queensland" },
      { id: 2, value: "Victoria" },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockStates,
    });

    const result = await getCountryStatesByCountryId(36);

    expect(result).toEqual(mockStates);
  });

  it("should throw an error if response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Forbidden",
    });

    await expect(getCountryStatesByCountryId(36)).rejects.toThrow(
      "Failed to fetch states for country 36: Forbidden"
    );
  });

  it("should throw an error if response format is invalid", async () => {
    const invalidResponse = [{ id: "wrong-type", value: "Queensland" }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidResponse,
    });

    await expect(getCountryStatesByCountryId(36)).rejects.toThrow(
      "Invalid states response format"
    );
    expect(consoleErrorSpy).toHaveBeenCalled(); // optional check
  });

  it("should throw on network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    await expect(getCountryStatesByCountryId(36)).rejects.toThrow(
      "Network Error"
    );
  });
});
