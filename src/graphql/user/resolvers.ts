import { createUserPayload } from '../../interfaces/user.interface';
import { UserService } from '../../services/';

const userService = new UserService();

const queries = {
  
};

const mutations = {
  createUser: async (_: any, { payload }: { payload: createUserPayload }) => {
    const res = await userService.create(payload);
    return res;
  },
};

export const resolvers = { queries, mutations };
