import { CountryState } from "@/types/countryState";
import { apiRequest } from "./utils/apiClient";

//* CRUD
//* Retrieve
export const getCountryStatesByCountryId = async (
  countryId: number
): Promise<CountryState[]> => {
  return apiRequest<CountryState[]>({
    url: `/countries/${countryId}/states`,
    method: "GET",
  });
};
