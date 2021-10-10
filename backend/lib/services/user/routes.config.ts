import UserController from './controllers/user.controller';
import { Application } from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.post('/sign-in', UserController.signIn);

    return this.app;
  }
}
