import { Request, Response } from 'express';
import GeneralStatsService from '../services/generalStats.service';

class GeneralStatsController {
  async getGeneralStatsByCode({ params }: Request, res: Response) {
    try {
      const countries = await GeneralStatsService.getGeneralStatsByCode();
      res.status(200).send(countries);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  }
}

export default new GeneralStatsController();
