import { useEffect, useState } from 'react';
import { fetchGetCountryByCode } from '../../services/crssApi';
import { TCountryStats } from '../../types/CountryStats';
import { CountrySelect } from '../CountrySelect/CountrySelect';
import { CountryTable } from '../CountryTable/CountryTable';
import styles from './SingleStatsWrapper.module.css';

export function SingleStatsWrapper() {
  const [data, setData] = useState<TCountryStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const formatResult = (response: any) => {
    setData(response.data);
    setLoading(false);
  };

  const printError = (error: unknown) => {
    console.error(error);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      fetchGetCountryByCode(selectedCountry)
        .then(formatResult)
        .catch(printError);
    }
  }, [selectedCountry]);
  return (
    <div className={styles.singleStatsWrapper}>
      <div className={styles.wrapperBody}>
        <div className={styles.wrapperHeader}>
          <span>Country</span>
          <CountrySelect
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
        <div className={styles.wrapperBody}>
          <CountryTable data={data} type='SIMPLE' />
          {loading && <span>Loading.....</span>}
        </div>
      </div>
    </div>
  );
}
