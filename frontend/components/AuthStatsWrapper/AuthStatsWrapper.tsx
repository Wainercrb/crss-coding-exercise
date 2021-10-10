import usePagination from '../../hooks/usePagination';
import { useContext, useEffect, useState } from 'react';
import { fetchAllListCountries } from '../../services/crssApi';
import { InputSearch } from '../CountryInputSearch/CountryInputSearch';
import { AppContext } from '../../contexts/appContext';
import { CountryTable } from '../CountryTable/CountryTable';
import styles from './AuthStatsWrapper.module.css';

export function FullStatsWrapper() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [sortStrQuery, setSortStrQuery] = useState('');
  const [textStrQuery, setTextStrQuery] = useState('');
  const { appState } = useContext(AppContext);
  const { pages, skip, limit, handlePageClick, setTotal, currentPage } =
    usePagination({
      pageSize: 20,
      sortStrQuery,
      loading,
    });

  const formatData = (res: any) => {
    const data = res.data;
    setTotal(data.total);
    setData(data.entries);
    setLoading(false);
  };

  const printError = (error: unknown) => {
    console.error(error);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchAllListCountries({
      limit,
      skip,
      token: appState.token,
      sort: sortStrQuery,
      text: textStrQuery,
    })
      .then(formatData)
      .catch(printError);
  }, [skip, sortStrQuery, textStrQuery]);

  return (
    <div>
      <InputSearch setTextStrQuery={setTextStrQuery} />
      <div className={styles.filter}>
        <CountryTable
          setSortStrQuery={setSortStrQuery}
          type='CUSTOM'
          data={data}
        />
      </div>
      <div>
        {[...Array(pages || 0)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index ? styles.currentPage : ''}
            onClick={() => handlePageClick(index)}
          >
            {index + 1}
          </button>
        ))}
        {loading && <div className={styles.loading}>Loading...</div>}
      </div>
    </div>
  );
}
