"use client";

import { getCountryStatesByCountryId } from "@/services/countryStateService";
import { Country } from "@/types/country";
import { CountryState } from "@/types/countryState";
import { SelectOption } from "@/types/option";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";

/**
 * A container component that displays two linked dropdowns for selecting a country and its state.
 *
 * - Selecting a country triggers an API call to fetch its states.
 * - Selecting a state updates the internal state.
 * - A submit button displays the selected location.
 *
 * @param {Object} props - Component props.
 * @param {Country[]} props.countries - Array of countries to populate the first dropdown.
 *
 * @returns {JSX.Element} A container with country and state dropdowns, a submit button, and a displayed location.
 *
 * @example
 * ```tsx
 * const countries = [
 *   { id: 1, value: "Philippines" },
 *   { id: 2, value: "Australia" },
 * ];
 *
 * <CountriesDropdownContainer countries={countries} />
 * ```
 */

interface Props {
  countries: Country[];
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const CountriesDropdownContainer = ({ countries }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>(
    null
  );
  const [selectedCountryState, setSelectedCountryState] =
    useState<SelectOption | null>(null);
  const [states, setStates] = useState<CountryState[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [submittedLocation, setSubmittedLocation] = useState<string | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const handleCountryChange = async (country: SelectOption) => {
    setSelectedCountry(country);
    setSelectedCountryState(null);
    setSubmittedLocation(null);
    setLocation(null);
    setIsDirty(true);
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
    setLocation(null);
    setIsDirty(true);
  };

  const handleSubmit = async () => {
    if (!selectedCountry) return;

    let locationText = `Your desired location: ${selectedCountry.value}`;
    if (selectedCountryState) {
      locationText += `, ${selectedCountryState.value}`;
    }
    setSubmittedLocation(locationText);

    const address = selectedCountryState
      ? `${selectedCountryState.value}, ${selectedCountry.value}`
      : selectedCountry.value;

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
      }
    } catch (error) {
      console.error("Failed to fetch location:", error);
    }

    setIsDirty(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <Dropdown
          options={countries}
          value={selectedCountry?.id}
          onChange={handleCountryChange}
          placeholder="Select a country"
        />

        {loading && <p className="text-sm text-gray-500">Loading states...</p>}

        {states.length > 0 && !loading && (
          <Dropdown
            options={states}
            value={selectedCountryState?.id}
            onChange={handleCountryStateChange}
            placeholder="Select a state"
          />
        )}

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

      {submittedLocation && (
        <p className="mt-4 text-gray-100 font-medium">{submittedLocation}</p>
      )}

      {location && isLoaded && (
        <div className="w-full mt-4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={6}
            options={{
              disableDefaultUI: true,
              zoomControl: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              draggable: false,
              keyboardShortcuts: false,
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
            }}
          >
            <Marker position={location} />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default CountriesDropdownContainer;
