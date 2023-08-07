
import bcrypt from 'bcrypt';
import {serverConfig} from "../config/serverConfig"

export const hashPassword= async (text: string ):  Promise<string> => {
  try {
    
    const salt=await bcrypt.genSalt(Number(serverConfig.SALT))
    
    // Hash the password using the provided salt
    const hashedPassword = await bcrypt.hash(text, salt);
    
    // Return the hashed password and the original salt
    return hashedPassword ;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

