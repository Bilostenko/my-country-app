import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  fetchAllCountries,
  fetchCountriesByRegion,
  searchCountriesByName,
  Country,
} from "../../services/api";
import { lightTheme, darkTheme } from "./MUI_theme";
import { ThemeProvider } from "@mui/material/styles";

type Region = "all" | "africa" | "america" | "asia" | "europe" | "oceania";

export default function Main() {
  const [searchValue, setSearchValue] = useState("");
  const [region, setRegion] = useState<Region>("all");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // get countries
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError("Failed to load country data.");
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // changing dar|light mode for MatrialUI components
  useEffect(() => {
    const checkDarkClass = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkClass();

    const observer = new MutationObserver(checkDarkClass);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  const handleRegionChange = async (event: SelectChangeEvent<Region>) => {
    const newRegion = event.target.value as Region;
    try {
      setLoading(true);
      let data: Country[];

      if (newRegion === "all") {
        data = await fetchAllCountries();
      } else {
        data = await fetchCountriesByRegion(newRegion);
      }

      setRegion(newRegion);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(`Unable to load countries from the region ${newRegion}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    navigate(`/country/${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };
  return (
    <main>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <div className="flex flex-col gap-4 p-10 md:flex-row md:items-center md:justify-between dark:bg-gray-900 dark:text-white">
          <TextField
            sx={{ width: "100%" }} // Використовуємо 100% ширини на мобільних екранах
            variant="outlined"
            placeholder="Enter country name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleSearch(searchValue)}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            variant="outlined"
            sx={{ width: "100%" }} // Використовуємо 100% ширини на мобільних екранах
            className="dark:bg-gray-900 dark:text-white"
          >
            <InputLabel>Region</InputLabel>
            <Select<Region>
              value={region}
              onChange={handleRegionChange}
              label="Region"
            >
              <MenuItem value="all">All Regions</MenuItem>
              <MenuItem value="africa">Africa</MenuItem>
              <MenuItem value="america">America</MenuItem>
              <MenuItem value="asia">Asia</MenuItem>
              <MenuItem value="europe">Europe</MenuItem>
              <MenuItem value="oceania">Oceania</MenuItem>
            </Select>
          </FormControl>
        </div>
        {error && (
          <div className="p-4 dark:bg-gray-900 dark:text-white">
            <Alert severity="error">{error}</Alert>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-10">
            <CircularProgress />
          </div>
        ) : (
          !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 p-10 dark:bg-gray-900 dark:text-white">
              {countries.map((country) => (
                <div
                  onClick={() => navigate(`/country/${country.name.common}`)}
                  key={country.name.common}
                  className="h-full bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg dark:bg-gray-800 dark:text-white6"
                >
                  <div className="aspect-video w-full">
                    <img
                      width={500}
                      height={500}
                      src={country.flags.png}
                      alt={
                        country.flags.alt || `Flag of ${country.name.common}`
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">
                      {country.name.common}
                    </h2>
                    <p>
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </p>
                    <p>
                      <strong>Region:</strong> {country.region}
                    </p>
                    <p>
                      <strong>Capital:</strong>{" "}
                      {country.capital?.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </ThemeProvider>
    </main>
  );
}
