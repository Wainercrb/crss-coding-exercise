import CountryController from './controllers/canton.controller';
import GeneralStatsController from './controllers/generalStats.controller';
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

    this.app.get(
      '/get-country-stats-by-code/:countryCode',
      CountryStatsValidator.validateCountryCode,
      CountryStatsController.getCountryStatsByCode
    );

    this.app.get(
      '/get-all-country-stats',
      this.checkGenericAuth,
      CountryStatsValidator.validatePaginationArgs,
      CountryStatsController.getAllCountryStats
    );

    this.app.get(
      '/get-general-stats',
      this.checkGenericAuth,
      GeneralStatsController.getGeneralStatsByCode
    );

    return this.app;
  }
}
