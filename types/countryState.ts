import { z } from "zod";

export const CountryStateSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export type CountryState = z.infer<typeof CountryStateSchema>;
