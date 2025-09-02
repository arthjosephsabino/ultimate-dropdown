import CountriesDropdownContainer from "@/components/countriesDropdown/CountriesDropdownContainer";
import Header from "@/components/Header";
import { getCountries } from "@/services/countryService";
import Image from "next/image";

const Home = async () => {
  const countries = await getCountries();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
      {/* Header */}
      <div className="flex items-center gap-4 md:flex-row flex-col justify-center text-center">
        <Image
          src={"/ud-icon.png"}
          alt={"UD Icon"}
          height={64}
          width={64}
          priority
        />
        <Header content="Ultimate Dropdown" />
      </div>

      {/* Countries Dropdown */}
      <CountriesDropdownContainer countries={countries} />
    </div>
  );
};

export default Home;
