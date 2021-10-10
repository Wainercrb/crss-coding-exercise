import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TCountry } from '../../types/Country';
import { fetchAllCountriesInf } from '../../services/crssApi';

type TProps = {
  selectedCountry: string;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
};

export function CountrySelect({ selectedCountry, setSelectedCountry }: TProps) {
  const [countries, setCountries] = useState<TCountry[]>([]);

  const formatResult = (response: any) => {
    setCountries(response.data);
  };

  const printError = (error: unknown) => {
    console.error(error);
  };

  useEffect(() => {
    if (!countries.length) {
      fetchAllCountriesInf().then(formatResult).catch(printError);
    }
  }, []);

  return (
    <div>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countries &&
          countries.map(({ code, name }: TCountry, idx) => (
            <option key={idx} value={code}>
              {name}
            </option>
          ))}
      </select>
    </div>
  );
}
