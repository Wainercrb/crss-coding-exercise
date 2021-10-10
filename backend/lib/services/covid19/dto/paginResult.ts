import { CountryStatsDto } from './countryStats.dto';

export interface PagResult {
  total: number;
  entries: CountryStatsDto[];
}
