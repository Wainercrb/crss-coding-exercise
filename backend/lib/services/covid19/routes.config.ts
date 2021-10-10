import CountryController from './controllers/canton.controller';
import CountryStatsController from './controllers/countryStats.controller';
import CountryStatsValidator from './validators/countryStats.validator';
import { Application } from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';

export class CountryRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'CountryRoutes');
  }

  configureRoutes() {
    this.app.get('/all-countries-inf', CountryController.getAllCountryList);
    
    this.app.get(
      '/get-country-stats-by-code/:countryCode',
      CountryStatsValidator.validateCountryCode,
      CountryStatsController.getCountryStatsByCode
    );

    return this.app;
  }
}
