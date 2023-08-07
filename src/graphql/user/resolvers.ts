import { createUserPayload,userSignInPayload } from '../../interfaces/user.interface';
import { UserService } from '../../services/';

const userService = new UserService();

const queries = {
  signIn:async(_:any,payload:userSignInPayload)  =>{
    const res = await userService.signIn(payload);
    return res;
  }
};

const mutations = {
  createUser: async (_: any, payload: createUserPayload ) => {
    console.log('payload',payload)
    const res = await userService.create(payload);
    return res;
  },
};

export const resolvers = { queries, mutations };
