import { Country, CountrySchema } from "@/types/country";
import { z } from "zod";
/**
 * Fetches the list of countries from the API.
 *
 * @async
 * @function getCountries
 * @returns {Promise<Country[]>} A promise that resolves to an array of `Country` objects.
 *
 * @throws {Error} Throws an error if:
 * - The network request fails or the response status is not OK.
 * - The response body does not match the expected `CountrySchema` format.
 *
 * @example
 * try {
 *   const countries = await getCountries();
 *   console.log(countries);
 * } catch (error) {
 *   console.error("Error fetching countries:", error);
 * }
 */
export const getCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/countries`, {
    headers: {
      "X-API-Key": process.env.NEXT_PUBLIC_API_KEY!,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch countries: ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = z.array(CountrySchema).safeParse(json);

  if (!parsed.success) {
    console.error("Invalid countries response:", z.treeifyError(parsed.error));
    throw new Error("Invalid countries response format");
  }

  return parsed.data;
};
