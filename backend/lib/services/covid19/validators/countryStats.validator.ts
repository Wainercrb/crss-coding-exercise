import { NextFunction, Response, Request } from 'express';

class CountryStasValidator {
  validateCountryCode({ params }: Request, res: Response, next: NextFunction) {
    if (!params.countryCode) {
      return res.status(400).send({
        error: 'Param [countryCode] not fount',
      });
    }
    next();
  }

  validatePaginationArgs({ query }: Request, res: Response, next: NextFunction) {
    if (!query.limit) {
      return res.status(400).send({
        error: 'Query arg [limit] not fount',
      });
    }
    if (!query.skip) {
      return res.status(400).send({
        error: 'Query arg [skip] not fount',
      });
    }
    next();
  }
}

export default new CountryStasValidator();
