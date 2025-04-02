import axios from "axios";

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  borders: string[];
  area: number;
}
// Отримання всіх країн (за замовчуванням)
export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    throw error;
  }
};

// Отримання країн за регіоном
export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при отриманні країн з регіону ${region}:`, error);
    throw error;
  }
};

// Пошук країн за назвою (часткове співпадіння)
export const searchCountriesByName = async (name: string): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при пошуку країн за назвою ${name}:`, error);
    throw error;
  }
};

// Фільтрація полів відповіді (для оптимізації)
export const fetchCountriesWithFilteredFields = async (): Promise<Partial<Country>[]> => {
  try {
    // Запитуємо тільки необхідні поля
    const fields = ['name', 'population', 'region', 'capital', 'flags'];
    const response = await axios.get<Partial<Country>[]>(
      `https://restcountries.com/v3.1/all?fields=${fields.join(',')}`
    );
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні фільтрованих даних:", error);
    throw error;
  }
};