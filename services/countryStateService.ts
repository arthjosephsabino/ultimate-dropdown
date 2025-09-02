import { CountryState, CountryStateSchema } from "@/types/countryState";
import { z } from "zod";

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
