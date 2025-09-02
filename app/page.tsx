import CountriesDropdownContainer from "@/components/countriesDropdown/CountriesDropdownContainer";
import Header from "@/components/Header";
import { getCountries } from "@/services/countryService";
import Image from "next/image";

const Home = async () => {
  const countries = await getCountries();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6 relative p-4">
      {/* Background */}
      <div className="absolute inset-0 h-full w-full -z-10">
        {/* Overlay */}
        <div className="bg-black/70 absolute h-full w-full -z-10" />
        {/* Background GIF */}
        <img
          src="/earth-loop.gif"
          alt="Earth Loop"
          className="absolute inset-0 h-full w-full object-cover -z-[11]"
        />
      </div>

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
