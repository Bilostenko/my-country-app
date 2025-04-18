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
      <div className="p-4">
      <p>❌ Country with the "{name}" was not found</p>
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
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Go back
      </button>

      <h1 className="text-3xl font-bold mb-4">{country.name.common} ({country.cca3})</h1>
      <img src={country.flags.svg} alt={country.flags.alt || "Flag"} className="w-64 h-auto mb-4" />
      <p><strong>Official Name:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Top Level Domain:</strong> {country.tld?.join(", ")}</p>
      <p><strong>Currencies:</strong> {currencyList || "N/A"}</p>
      <p><strong>Languages:</strong> {languageList || "N/A"}</p>
      <p><strong>Bordering Countries:</strong> {country.borders?.join(", ") || "None"}</p>
    </div>
  );
};

export default CountryPage;
