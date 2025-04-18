import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { fetchCountryByName } from "../../services/api";

interface CountryDetailsType {
  name: {
    common: string;
    official: string;
  };
  cca3?: string;
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  tld?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}

const CountryPage = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState<CountryDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const loadCountry = async () => {
      if (!name) return;
      setLoading(true);
      const data = await fetchCountryByName(name);
      if (data) {
        setCountry(data);
      } 
      setLoading(false);
    };

    loadCountry();
  }, [name]);

  if (loading) return <div className="p-4">⏳ Loading...</div>;
  if (!country)
    return (
      <div className="p-4 my-16 text-3xl">
      <p className="py-5">❌ Country with the "{name}" was not found</p>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Go back
      </Button>
    </div>
    );

  const currencyList = Object.values(country.currencies || {})
    .map((c) => `${c.name} (${c.symbol})`)
    .join(", ");

  const languageList = Object.values(country.languages || {}).join(", ");

  return (
    <div className="my-0 lg:my-20 min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">


      <div className="p-4 max-w-[1200px] mx-auto flex flex-col text-xl">
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded dark:bg-gray-800 dark:text-white"
        >
          ← Go back
        </button>
  
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || "Flag"}
            className="w-72 sm:w-96 h-auto mb-8 lg:mb-0"
          />
  
          <div className="lg:ml-8 mb-8 lg:mb-0 leading-loose text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              {country.name.common} ({country.cca3})
            </h1>
            <p><strong>Official Name:</strong> {country.name.official}</p>
            <p><strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
          </div>
  
          <div className="lg:ml-8 leading-loose text-center lg:text-left">
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Top Level Domain:</strong> {country.tld?.join(", ")}</p>
            <p><strong>Currencies:</strong> {currencyList || "N/A"}</p>
            <p><strong>Languages:</strong> {languageList || "N/A"}</p>
            <p><strong>Bordering Countries:</strong> {country.borders?.join(", ") || "None"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
