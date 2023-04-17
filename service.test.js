import { nanoid } from 'nanoid';
import * as userService from '../../src/services/users.service.js';
import User from '../../src/models/user.model.js';

describe('Users Service', () => {
  const user = { name: 'John Doe', email: 'john.doe@example.com' };
  let createdUser;

  describe('createUser', () => {
    it('should create a new user', async () => {
      const result = await userService.createUser(user);
      createdUser = await User.findById(result._id);
      expect(createdUser).toMatchObject({ id: createdUser.id, ...user });
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      const result = await userService.getAllUsers();
      expect(result).toBeInstanceOf(Array);
      expect(result).toContainEqual(createdUser);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const result = await userService.getUserById(createdUser.id);
      expect(result).toMatchObject(createdUser);
    });

    it('should return null if user ID is not found', async () => {
      const result = await userService.getUserById(nanoid());
      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update a user by ID', async () => {
      const result = await userService.updateUser(createdUser.id, {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
      const updatedUser = await User.findById(createdUser.id);
      expect(updatedUser).toMatchObject({
        id: createdUser.id,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
    });

    it('should return null if user ID is not found', async () => {
      const result = await userService.updateUser(nanoid(), {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      await userService.deleteUser(createdUser.id);
      const result = await User.findById(createdUser.id);
      expect(result).toBeNull();
    });

    it('should return null if user ID is not found', async () => {
      const result = await userService.deleteUser(nanoid());
      expect(result).toBeNull();
    });
  });
});
