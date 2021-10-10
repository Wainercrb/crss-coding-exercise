import { UserDto } from '../dto/user.dto';
import { createToken } from '../../../config/authorization';

class UserService {
  signIn(): UserDto {
    return {
      token: createToken(),
      userName: 'CRSS'
    }
  }
}

export default new UserService();
