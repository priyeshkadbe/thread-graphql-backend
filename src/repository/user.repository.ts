import { prismaClient } from '../lib/db';
import { UserId } from '../interfaces/user.interface';

class UserRepository {
  async create(userData: any) {
    try {
      const user = await prismaClient.user.create({
        data: userData,
      });
      return user.id;
    } catch (error) {
      console.log('something went wrong in the user repository', error);
      throw { error };
    }
  }

  async get(userId: UserId) {
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

  async update(userId: UserId, updatedUserData: any) {
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

  async delete(userId: UserId) {
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
