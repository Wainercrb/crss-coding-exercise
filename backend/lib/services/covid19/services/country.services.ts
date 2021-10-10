import fetchRequest from '../../../config/fetchCore';
import { CountryDto } from '../dto/country.dto';

const API_URL = process.env.COVID19_API_URL || '';

class CountryService {
  async getAllCountryList(): Promise<CountryDto[]> {
    const { data } = await fetchRequest({
      url: `${API_URL}/help/countries?format=json`,
    });
    return data.map((item: any) => {
      return {
        name: item.name,
        code: item.alpha2code,
      };
    });
  }
}

export default new CountryService();
