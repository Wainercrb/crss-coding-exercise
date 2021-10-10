import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type TProps = {
  setTextStrQuery: Dispatch<SetStateAction<string>>;
}

export function InputSearch({ setTextStrQuery }: TProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setTextStrQuery(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <input
      autoFocus
      type='text'
      autoComplete='off'
      className='live-search-field'
      placeholder='Search'
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
