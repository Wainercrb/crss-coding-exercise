import { Request, Response } from 'express';
import CountryService from '../services/country.services';

class CountryController {
  async getAllCountryList(req: Request, res: Response) {
    try {
      const countries = await CountryService.getAllCountryList();
      res.status(200).send(countries);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  }
}

export default new CountryController();
