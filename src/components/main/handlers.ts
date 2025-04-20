import { SelectChangeEvent } from "@mui/material";
import { fetchAllCountries, fetchCountriesByRegion, Country } from "../../services/api";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from 'react-router-dom';

type Region = "all" | "africa" | "america" | "asia" | "europe" | "oceania";

export const handleRegionChange = async (
    event: SelectChangeEvent<string>,
    setRegion: Dispatch<SetStateAction<Region>>,
    setCountries: (countries: Country[]) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void
  ) => {
    const newRegion = event.target.value;
    try {
      setLoading(true);
      let data: Country[];
  
      if (newRegion === "all") {
        data = await fetchAllCountries();
      } else {
        data = await fetchCountriesByRegion(newRegion);
      }
  
      setRegion(newRegion as Region);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(`Unable to load countries from the region ${newRegion}`);
    } finally {
      setLoading(false);
    }
  };


  export const useSearchHandler = () => {
    const navigate = useNavigate();
  
    return (searchTerm: string) => {
      if (!searchTerm.trim()) return;
      navigate(`/country/${encodeURIComponent(searchTerm.trim())}`);
    };
  };