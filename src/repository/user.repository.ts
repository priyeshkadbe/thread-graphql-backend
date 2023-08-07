import { prismaClient } from '../lib/db';

class UserRepository {
  async create(userData: any) {
    try {
      const user = await prismaClient.user.create({
        data: userData,
      });
      return user;
    } catch (error) {
      console.log('something went wrong in the user repository', error);
      throw { error };
    }
  }

  async get(userId: string) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log('something went wrong in the user repository');
    }
  }

  async update(userId: string, updatedUserData: any) {
    try {
      const user = await prismaClient.user.update({
        where: { id: userId },
        data: updatedUserData,
      });
      return user;
    } catch (error) {
      console.log('something went wrong in the user repository');
    }
  }

  async delete(userId: string) {
    try {
      const user = await prismaClient.user.delete({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      console.log('something went wrong in the user repository');
    }
  }
}
export default UserRepository;
