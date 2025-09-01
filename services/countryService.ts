import { Country } from "@/types/country";
import { apiRequest } from "./utils/apiClient";

//* CRUD
//* Retrieve
export const getCountries = async (): Promise<Country[]> => {
  return apiRequest<Country[]>({ url: "/countries", method: "GET" });
};
