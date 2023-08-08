import { UserRepository } from '../repository';
import {
  createUserPayload,
  UserId,
  updateUserPayload,
  userSignInPayload
} from '../interfaces/user.interface';
import bcrypt from "bcrypt"
import {hashPassword} from "../utils/hashPassword"
import {serverConfig} from "../config/serverConfig"
import jwt,{JwtPayload} from 'jsonwebtoken'

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
      console.log(userExits) 
       return "email already taken";
     }
      
      const encryptedPassword = await hashPassword(password)
      const user = await this.userRepository.create({
        firstName,
        lastName,
        profileImageUrl,
        password:encryptedPassword,
        email, 
      });
      
      return user;
    } catch (error) {
      console.log('something went wrong in the service layer ', error);
      throw { error };
    }
  }

  async signIn({email,password}:userSignInPayload){
   try {
      const user= await this.userRepository.getUserByEmail(email)
      
      if(!user){
        throw new Error("user does not exits");
      }
      
      const passwordMatch=this.#checkPassword(password,user.password)
      if(!passwordMatch) {
        throw Error("password didnt match ")
      }
      //   const newJwt = this.createToken({
      //   email: user.email ,
      //   id: user.id ,
      // });
          const newJwt = this.#createToken({ email: user.email as string, id: user.id as string });

      return newJwt;

   } catch (error) {
       console.log('something went wrong in the service layer ', error);
       throw { error };
   
   } 
  }
 
  async isAuthenticated(token:string){
       try {
      const response = this.#verifyToken(token);
      if (!response) {
        throw { error: "invalid token" };
      }
     const jwtPayload = response as JwtPayload;

      const user = await this.userRepository.getUserByEmail(jwtPayload.email);
      if (!user) {
        throw { error: "No user with corresponding token exists" };
      }
      return user;
    } catch (error) {
      console.log("something went wrong in the auth process");
      throw { error };
    }
  
  }
  
  #checkPassword(plainPassword:string,encryptedPassword:string){
    try {
        return  bcrypt.compareSync(plainPassword,encryptedPassword)
    } catch (error) {
        console.log('something went wrong in the service layer ', error);
       throw { error };
     
    }
  }

  #createToken(user: { email: string; id: string }) {
    try {
      const result = jwt.sign(user, serverConfig.JWT_KEY as jwt.Secret, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("something went wrong in the token creation");
      throw { error };
    }
  }
  
  async #verifyToken(token:string): Promise<JwtPayload>{
        try {
      const response = await jwt.verify(token, serverConfig.JWT_KEY as jwt.Secret );
      return response as JwtPayload;
    } catch (error) {
      console.log("something went wrong in token validation");
      throw { error };
    }

  }

}

export default UserService;
