import { UserRepository } from '../repository';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { serverConfig } from '../config/serverConfig';
import {
  createUserPayload,
  UserId,
  updateUserPayload,
} from '../interfaces/user.interface';
class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(payload: createUserPayload) {
    const { firstName, lastName, profileImageUrl, email, password } = payload;
    
    const salt = crypto
      .randomBytes(Number(serverConfig.RANDOM_BYTES))
      .toString('hex');
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await this.userRepository.create({
        firstName,
        lastName,
        profileImageUrl,
        password: hashedPassword,
        email,
        salt,
      });
      return user;
    } catch (error) {
      console.log('something went wrong in the service layer ', error);
      throw { error };
    }
  }
}

export default UserService;
