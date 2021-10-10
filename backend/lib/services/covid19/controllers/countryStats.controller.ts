import { Request, Response } from 'express';
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
}

export default new CountryStatsController();
