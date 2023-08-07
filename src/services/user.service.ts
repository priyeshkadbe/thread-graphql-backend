import { UserRepository } from '../repository';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { serverConfig } from '../config/serverConfig';
import {
  createUserPayload,
  UserId,
  updateUserPayload,
  userSignInPayload
} from '../interfaces/user.interface';

import {hashWithCustomSalt} from "../utils/HashAndSaltGenerator"

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(payload: createUserPayload) {
    const { firstName, lastName, profileImageUrl, email, password } = payload;
    console.log('paylaod received',payload)
   try {
      
     const userExits= await this.userRepository.getUserByEmail(email)
     if(userExits){
       return "email already taken";
     }
     
      const user = await this.userRepository.create({
        firstName,
        lastName,
        profileImageUrl,
        password ,
        email, 
      });
      
      return user;
    } catch (error) {
      console.log('something went wrong in the service layer ', error);
      throw { error };
    }
  }

  async signIn(payload:userSignInPayload){
   try {
         
   } catch (error) {
       console.log('something went wrong in the service layer ', error);
       throw { error };
   
   } 
  }
}

export default UserService;
