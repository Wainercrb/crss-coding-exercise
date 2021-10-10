import axios from 'axios';

type TArgs = {
  url: string;
  data?: unknown;
};

const fetchRequest = ({ url, data }: TArgs): Promise<any | any[]> => {
  return axios(url, {
    data,
  });
};


export default fetchRequest