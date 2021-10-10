import { Application, NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/authorization';

export abstract class CommonRoutesConfig {
  app: Application;
  name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  async checkGenericAuth(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(300).send({
        error:
          'Token not found, please provide tiken as: [Authorization: bearer --]',
      });
    }

    const tokenIsValid = await verifyToken(token);
    if (!tokenIsValid) {
      return res.status(500).send({
        error: 'Token is not valid',
      });
    }
    next();
  }

  get getName() {
    return this.name;
  }

  abstract configureRoutes(): Application;
}
