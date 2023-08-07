import { createUserPayload } from '../../interfaces/user.interface';
import { UserService } from '../../services/';

const userService = new UserService();

const queries = {
  
};

const mutations = {
  createUser: async (_: any, payload: createUserPayload ) => {
    console.log('payload',payload)
    const res = await userService.create(payload);
    return res;
  },
};

export const resolvers = { queries, mutations };
