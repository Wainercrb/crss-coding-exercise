import fetchRequest from '../../../config/fetchCore';
import { CountryStatsDto } from '../dto/countryStats.dto';
import { GeneralStatsDto } from '../dto/generalStats.dto';


const API_URL = process.env.COVID19_API_URL || '';

class GeneralStatsService {
  async getGeneralStatsByCode(): Promise<GeneralStatsDto[]> {
    const { data } = await fetchRequest({
      url: `${API_URL}/totals?format=json`,
    });
    if (data.length) {
      const { confirmed, recovered } = data[0] as CountryStatsDto;
      return [
        {
          totalConfirmed: confirmed,
          totalRecovered: recovered,
        },
      ];
    }
    return [];
  }
}

export default new GeneralStatsService();
