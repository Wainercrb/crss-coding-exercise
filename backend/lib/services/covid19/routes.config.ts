import CountryController from './controllers/canton.controller';
import { Application } from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';

export class CountryRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'CountryRoutes');
  }

  configureRoutes() {
    this.app.get('/all-countries-inf', CountryController.getAllCountryList);

    return this.app;
  }
}
