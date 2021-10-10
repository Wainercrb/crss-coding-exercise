import { Request, Response } from 'express';
import Covid19Service from '../services/country.services';

class CountryController {
  async getAllCountryList(req: Request, res: Response) {
    try {
      const countries = await Covid19Service.getAllCountryList();
      res.status(200).send(countries);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  }
}

export default new CountryController();
