const API_URL = process.env.NEXT_PUBLIC_CRSS_API_URL || '';

type TFetchArgs = {
  url: string;
  body?: BodyInit;
  method: 'POST' | 'GET';
  headers?: {
    Authorization: string;
  };
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
