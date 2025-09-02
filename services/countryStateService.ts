import { CountryState, CountryStateSchema } from "@/types/countryState";
import { z } from "zod";
/**
 * Fetches the list of states for a given country by its ID.
 *
 * Sends a GET request to the `/countries/{countryId}/states` endpoint of the API
 * and validates the response against the `CountryStateSchema`.
 *
 * @param {number} countryId - The ID of the country for which to fetch states.
 * @returns {Promise<CountryState[]>} A promise that resolves to an array of `CountryState` objects.
 *
 * @throws {Error} If the fetch request fails (non-OK response).
 * @throws {Error} If the response format is invalid and cannot be parsed as `CountryState[]`.
 *
 * @example
 * ```ts
 * try {
 *   const states = await getCountryStatesByCountryId(1);
 *   console.log(states);
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 */
export const getCountryStatesByCountryId = async (
  countryId: number
): Promise<CountryState[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/countries/${countryId}/states`,
    {
      headers: {
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY!,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch states for country ${countryId}: ${res.statusText}`
    );
  }

  const json = await res.json();
  const parsed = z.array(CountryStateSchema).safeParse(json);

  if (!parsed.success) {
    console.error("Invalid states response:", z.treeifyError(parsed.error));
    throw new Error("Invalid states response format");
  }

  return parsed.data;
};
