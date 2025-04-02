import { useState, useEffect } from "react";
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
import { fetchAllCountries, fetchCountriesByRegion, searchCountriesByName, Country } from "../../services/api";

type Region = "all" | "africa" | "america" | "asia" | "europe" | "oceania";

export default function Main() {
  const [searchValue, setSearchValue] = useState("");
  const [region, setRegion] = useState<Region>("all");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Не вдалося завантажити дані про країни');
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const handleRegionChange = async (event: SelectChangeEvent<Region>) => {
    const newRegion = event.target.value as Region;
    try {
      setLoading(true);
      let data: Country[];
      
      if (newRegion === 'all') {
        data = await fetchAllCountries();
      } else {
        data = await fetchCountriesByRegion(newRegion);
      }
      
      setRegion(newRegion);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(`Не вдалося завантажити країни з регіону ${newRegion}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      if (!searchTerm.trim()) {
        // Якщо поле пошуку порожнє, повертаємо всі країни
        const data = await fetchAllCountries();
        setCountries(data);
        return;
      }
      
      const data = await searchCountriesByName(searchTerm);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(`Не знайдено країн, що відповідають "${searchTerm}"`);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  return (
    <main>
      <div className="flex items-center justify-between p-10">
        <TextField
          sx={{ width: "26%" }}
          variant="outlined"
          placeholder="Введіть назву країни"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSearch(searchValue)} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ width: "16%" }}>
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
        <div className="p-4">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center p-10">
          <CircularProgress />
        </div>
      ) : (
        !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
            {countries.map((country) => (
              <div 
                key={country.name.common} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={country.flags.png} 
                    alt={country.flags.alt || `Flag of ${country.name.common}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{country.name.common}</h2>
                  <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </main>
  );
}