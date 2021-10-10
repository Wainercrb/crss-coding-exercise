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
}

export default new CountryStasValidator();
