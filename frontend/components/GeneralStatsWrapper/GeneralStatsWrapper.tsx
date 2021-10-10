import { useContext, useEffect, useState } from 'react';
import { fetchGeneralStats } from '../../services/crssApi';
import { AppContext } from '../../contexts/appContext';
import { CountryTable } from '../CountryTable/CountryTable';
import styles from './GeneralStatsWrapper.module.css';

export function GeneralStatsWrapper() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const { appState } = useContext(AppContext);

  const formatData = (res: any) => {
    setData(res.data);
    setLoading(false);
  };

  const printError = (error: unknown) => {
    console.error(error);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchGeneralStats(appState.token)
      .then(formatData)
      .catch(printError);
  }, []);

  return (
    <div>
      <div className={styles.table}>
        <CountryTable
          type='CUSTOM'
          data={data}
        />
        {loading && <span>Loading...</span>}
      </div>
    </div>
  );
}
