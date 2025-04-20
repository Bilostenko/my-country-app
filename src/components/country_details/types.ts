export default interface CountryDetailsType {
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