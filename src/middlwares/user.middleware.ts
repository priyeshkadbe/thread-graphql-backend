// import jwt from 'jsonwebtoken';
// import { Request } from 'express'; // Import Request from 'express' for type safety
// import { serverConfig } from './config/serverConfig';
//
// class UserMiddlewares{
//   
//   async validateUserAuth(req:Request){
//      const token = req.headers['authorization'];
//       if (token) {
//     try {
//       const decoded = jwt.verify(token, serverConfig.JWT_KEY) as any; // Use 'as any' to bypass type checking
//       return { user: decoded }; // Adding user info to the context
//     } catch (error) {
//       console.error('Authentication middleware error:', error);
//     }
//   }
// }
//
// export default UserMiddlewares;
