import { z } from "zod";
/**
 * NOTE: this is derived from the API: /countries/{countryId}/states
 * Zod schema for validating a CountryState object.
 *
 * A country state object consists of:
 * - `id`: a unique numeric identifier.
 * - `value`: the name of the state as a string.
 *
 * @example
 * ```ts
 * const state = { id: 1, value: "Quebec" };
 * CountryStateSchema.parse(state); // ✅ Validates successfully
 * ```
 */

export const CountryStateSchema = z.object({
  id: z.number(),
  value: z.string(),
});

/**
 * Type inferred from `CountryStateSchema`.
 *
 * Represents a state or region of a country with a numeric ID and a string name.
 */

export type CountryState = z.infer<typeof CountryStateSchema>;
