"use client";

import { getCountryStatesByCountryId } from "@/services/countryStateService";
import { Country } from "@/types/country";
import { CountryState } from "@/types/countryState";
import { SelectOption } from "@/types/option";
import { useState } from "react";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";

interface Props {
  countries: Country[];
}

const CountriesDropdownContainer = ({ countries }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>(
    null
  );
  const [selectedCountryState, setSelectedCountryState] =
    useState<SelectOption | null>(null);
  const [states, setStates] = useState<CountryState[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittedLocation, setSubmittedLocation] = useState<string | null>(
    null
  );
  const [isDirty, setIsDirty] = useState(false);

  const handleCountryChange = async (country: SelectOption) => {
    setSelectedCountry(country);
    setSelectedCountryState(null);
    setSubmittedLocation(null);
    setIsDirty(true); // mark dirty
    setLoading(true);

    try {
      const data = await getCountryStatesByCountryId(country.id);
      setStates(data);
    } catch (error) {
      console.error("Failed to fetch states:", error);
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryStateChange = (countryState: SelectOption) => {
    setSelectedCountryState(countryState);
    setSubmittedLocation(null);
    setIsDirty(true); // mark dirty
  };

  const handleSubmit = () => {
    if (!selectedCountry) return;

    let location = `Your desired location: ${selectedCountry.value}`;
    if (selectedCountryState) {
      location += `, ${selectedCountryState.value}`;
    }
    setSubmittedLocation(location);
    setIsDirty(false); // reset after submit
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Countries Dropdown */}
        <Dropdown
          options={countries}
          value={selectedCountry?.id}
          onChange={handleCountryChange}
          placeholder="Select a country"
        />

        {/* States Dropdown */}
        {loading && <p className="text-sm text-gray-500">Loading states...</p>}

        {states.length > 0 && !loading && (
          <Dropdown
            options={states}
            value={selectedCountryState?.id}
            onChange={handleCountryStateChange}
            placeholder="Select a state"
          />
        )}

        {/* Submit Button (disabled until dirty) */}
        {selectedCountry && !loading && (
          <Button
            className="px-8 md:min-w-0 min-w-60"
            onClick={handleSubmit}
            disabled={!isDirty}
          >
            Submit
          </Button>
        )}
      </div>

      {/* Submitted Location */}
      {submittedLocation && (
        <p className="mt-4 text-gray-300 font-medium">{submittedLocation}</p>
      )}
    </div>
  );
};

export default CountriesDropdownContainer;
