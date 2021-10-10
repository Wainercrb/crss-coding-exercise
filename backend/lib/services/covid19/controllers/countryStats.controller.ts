import { Request, Response } from 'express';
import { PagQueryArg } from '../dto/paginQuery.dto'
import CountryStatsService from '../services/countryStats.service';

class CountryStatsController {
  async getCountryStatsByCode({ params }: Request, res: Response) {
    try {
      const countries = await CountryStatsService.getCountryStatsByCode(
        params.countryCode
      );
      res.status(200).send(countries);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  }

  async getAllCountryStats({ query }: Request, res: Response) {
    try {
      const resorce: PagQueryArg = {
        limit: Number(query.limit),
        skip: Number(query.skip),
        sortKey: query.sortKey as string,
        sortValue: query.sortValue as string,
        findText: query.findText as string,
      };
      const countries = await CountryStatsService.getAllCountryStats(resorce);
      res.status(200).send(countries);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  }
}

export default new CountryStatsController();
