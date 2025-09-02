import { Country, CountrySchema } from "@/types/country";
import { z } from "zod";

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
