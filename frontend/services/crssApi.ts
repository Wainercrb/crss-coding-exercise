const API_URL = process.env.NEXT_PUBLIC_CRSS_API_URL || '';

type TFetchArgs = {
  url: string;
  body?: BodyInit;
  method: 'POST' | 'GET';
  headers?: {
    Authorization: string;
  };
};

type TFetchContriesArgs = {
  token: string;
  limit: number;
  skip: number;
  text: string;
  sort: string;
};

const fetchRequest = async ({ url, headers, body, method }: TFetchArgs) => {
  const response = await fetch(url, { headers, body, method });
  const data = await response.json();
  return {
    data,
    status: response.status,
  };
};

export const fetchSignIn = async () => {
  return fetchRequest({ url: `${API_URL}/sign-in`, method: 'POST' });
};

export const fetchAllCountriesInf = async () => {
  return fetchRequest({ url: `${API_URL}/all-countries-inf`, method: 'GET' });
};

export const fetchGetCountryByCode = async (countryCode: string) => {
  return fetchRequest({
    url: `${API_URL}/get-country-stats-by-code/${countryCode}`,
    method: 'GET',
  });
};

export const fetchGeneralStats = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetchRequest({
    url: `${API_URL}/get-general-stats`,
    method: 'GET',
    headers,
  });
};

export const fetchAllListCountries = async ({
  token,
  limit,
  skip,
  text,
  sort,
}: TFetchContriesArgs) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const findText = text.length ? `findText=${text}&` : '';
  const splitSortArgs = sort.length ? sort.split('&') : '';
  const sortArg = splitSortArgs
    ? `sortKey=${splitSortArgs[0]}&sortValue=${splitSortArgs[1]}&`
    : '';
  return fetchRequest({
    url: `${API_URL}/get-all-country-stats?${findText}${sortArg}limit=${limit}&skip=${skip}`,
    method: 'GET',
    headers,
  });
};
