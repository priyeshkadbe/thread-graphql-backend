// import {UserService} from "../services"
// import { Request, Response} from 'express';
//
//
// class UserController{
//    private userService: UserService;
//  
//   constructor() {
//       this.userService= new UserService();
//   }
//   
//   async isAuthenticated(req:Request,res:Response){
//
//      try {
//     const token = req.headers['x-auth-token']; // Change this to your token header
//     const response = await this.userService.isAuthenticated(token);
//
//     return res.status(200).json({
//       message: 'user is verified and token is valid',
//       data: response,
//       success: true,
//       err: {},
//     });
//   } catch (error) {
//     console.error(error);
//
//     return res.status(500).json({
//       message: 'something went wrong in the verification of the token',
//       data: {},
//       success: false,
//       err: error,
//     });
//   }
//   }
//   
// }
//
// export default UserController;
