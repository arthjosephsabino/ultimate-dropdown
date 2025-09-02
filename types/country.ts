import { z } from "zod";

export const CountrySchema = z.object({
  id: z.number(),
  value: z.string(),
});

export type Country = z.infer<typeof CountrySchema>;
