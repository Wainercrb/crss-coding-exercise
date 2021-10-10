import fetchRequest from '../../../config/fetchCore';
import { CountryStatsDto } from '../dto/countryStats.dto';

const API_URL = process.env.COVID19_API_URL || '';

class CountryStatsService {
  async getCountryStatsByCode(
    countryCode: string
  ): Promise<CountryStatsDto | null> {
    const { data } = await fetchRequest({
      url: `${API_URL}/country/code?code=${countryCode}&format=json`,
    });
    if (data.length) {
      const { confirmed, country, recovered } = data[0] as CountryStatsDto;
      return {
        confirmed,
        country,
        recovered,
      };
    }
    return null;
  }
}

export default new CountryStatsService();
