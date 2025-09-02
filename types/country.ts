import { z } from "zod";
/**
 *
 * NOTE: this is derived from the API: /countries
 * Zod schema for validating a Country object.
 *
 * A country object consists of:
 * - `id`: a unique numeric identifier.
 * - `value`: the name of the country as a string.
 *
 * @example
 * ```ts
 * const country = { id: 1, value: "Philippines" };
 * CountrySchema.parse(country); // Validates successfully
 * ```
 */

export const CountrySchema = z.object({
  id: z.number(),
  value: z.string(),
});

/**
 * Type inferred from `CountrySchema`.
 *
 * Represents a country with a numeric ID and a string name.
 */

export type Country = z.infer<typeof CountrySchema>;
