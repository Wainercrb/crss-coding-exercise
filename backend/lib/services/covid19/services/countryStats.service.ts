import fetchRequest from '../../../config/fetchCore';
import { CountryStatsDto } from '../dto/countryStats.dto';
import { PagQueryArg } from '../dto/paginQuery.dto';
import { PagResult } from '../dto/paginResult';

const API_URL = process.env.COVID19_API_URL || '';

class CountryStatsService {
  async getCountryStatsByCode(countryCode: string): Promise<CountryStatsDto[]> {
    const { data } = await fetchRequest({
      url: `${API_URL}/country/code?code=${countryCode}&format=json`,
    });
    if (data.length) {
      const { confirmed, country, recovered } = data[0] as CountryStatsDto;
      return [
        {
          country,
          confirmed,
          recovered,
        },
      ];
    }
    return [];
  }

  private finterCountryByValue(countries: CountryStatsDto[], value?: string) {
    if (!value || typeof value !== 'string') {
      return countries;
    }
    if (!isNaN(Number(value))) {
      const parseToNumber = Number(value);
      return countries.filter((item) =>
        [item.confirmed, item.recovered].includes(parseToNumber)
      );
    }
    const parseToString = String(value);
    return countries.filter((item) =>
      item.country.toLowerCase().includes(parseToString.toLowerCase())
    );
  }

  private sortCountryByKey(
    countries: CountryStatsDto[],
    key?: unknown,
    direc?: unknown
  ) {
    if (!key || typeof key !== 'string') {
      return countries;
    }
    return countries.sort((itemA: any, itemB: any) => {
      if (direc == 'ASC') {
        return itemA[key] > itemB[key] ? 1 : -1;
      }
      return itemB[key] > itemA[key] ? 1 : -1;
    });
  }

  private cleanCountriesData(data: any[]): CountryStatsDto[] {
    return data.map((item: any) => ({
      country: item.country || '',
      confirmed: item.confirmed || 0,
      recovered: item.recovered || 0,
    }));
  }

  async getAllCountryStats({
    findText,
    sortKey,
    sortValue,
    skip,
    limit,
  }: PagQueryArg): Promise<PagResult> {
    const { data } = await fetchRequest({
      url: `${API_URL}/country/all?format=json`,
    });
    const countries = this.cleanCountriesData(data);
    const filterCountries = this.finterCountryByValue(countries, findText);
    const sortCountries = this.sortCountryByKey(
      filterCountries,
      sortKey,
      sortValue
    );
    const sliceCountries = sortCountries.slice(skip, skip + limit);
    return {
      entries: sliceCountries,
      total: sortCountries.length,
    };
  }
}

export default new CountryStatsService();
