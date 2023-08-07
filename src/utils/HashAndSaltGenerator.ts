
import bcrypt from 'bcrypt';
import {serverConfig} from "../config/serverConfig"

export const hashWithCustomSalt = async (text: string ): Promise<{ hashedPassword: string; salt: string }> => {
  try {
    
    const salt=await bcrypt.genSalt(Number(serverConfig.SALT))
    
    // Hash the password using the provided salt
    const hashedPassword = await bcrypt.hash(text, salt);
    
    // Return the hashed password and the original salt
    return { hashedPassword, salt };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
