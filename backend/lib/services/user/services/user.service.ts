import { UserDto } from '../dto/user.dto';
import { createToken } from '../../../config/authorization';

class UserService {
  signIn(): UserDto {
    return {
      token: createToken(),
      userName: `CRSS ${(Math.floor(Math.random() * 100))}`
    }
  }
}

export default new UserService();
