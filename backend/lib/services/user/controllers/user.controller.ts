import { Request, Response } from 'express';
import usersService from '../services/user.service';

class UserController {
  signIn(req: Request, res: Response) {
    try {
      const users =  usersService.signIn();
      res.status(200).send(users);      
    } catch (error) {
      res.status(500);
    }
  }
}

export default new UserController();
