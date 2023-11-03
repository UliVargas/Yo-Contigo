import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { mockService } from '../dependencies';
import { createUserDto, updateUserDto, user } from './user.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestingModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create New User', () => {
    it('Should return the created user', async () => {
      jest.spyOn(mockService, 'create').mockReturnValue(user);
      const result = await controller.create(createUserDto);
      expect(result).toEqual(user);
      expect(mockService.create).toHaveBeenCalled();
      expect(mockService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('Should return BadRequestException when user creation fails', async () => {
      jest.spyOn(mockService, 'create').mockImplementation(() => {
        throw new BadRequestException('User creation failed');
      });

      try {
        await controller.create(createUserDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('User creation failed');
      }
    });
  });

  describe('Get All Users', () => {
    it('Should return all users', async () => {
      jest.spyOn(mockService, 'findAll').mockReturnValue([user]);
      const result = await controller.findAll();
      expect(result).toEqual([user]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('Find User By Id', () => {
    it('Should return one user by id', async () => {
      jest.spyOn(mockService, 'findOne').mockReturnValue(user);
      const result = await controller.findOne(user.id);
      expect(result).toEqual(user);
      expect(mockService.findOne).toHaveBeenCalled();
      expect(mockService.findOne).toHaveBeenCalledWith(user.id);
    });

    it('Should return NotFoundException when user is not found', async () => {
      jest.spyOn(mockService, 'findOne').mockReturnValue(undefined);

      try {
        await controller.findOne('nonexistentUserId');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Update User', () => {
    it('Should return the updated user', async () => {
      jest.spyOn(mockService, 'update').mockReturnValue({
        ...user,
        ...updateUserDto,
      });
      const result = await controller.update(user.id, updateUserDto);

      expect(result).toEqual({
        ...user,
        ...updateUserDto,
      });
      expect(mockService.update).toHaveBeenCalled();
      expect(mockService.update).toHaveBeenCalledWith(user.id, updateUserDto);
    });

    it('Should return NotFoundException when user is not found', async () => {
      jest.spyOn(mockService, 'update').mockReturnValue(null);

      try {
        await controller.update('nonexistentUserId', updateUserDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Delete User', () => {
    it('Should return the deleted user', async () => {
      jest.spyOn(mockService, 'remove').mockReturnValue(user);
      const result = await controller.remove(user.id);

      expect(result).toEqual(user);
      expect(mockService.remove).toHaveBeenCalled();
      expect(mockService.remove).toHaveBeenCalledWith(user.id);
    });

    it('Should return NotFoundException when user is not found', async () => {
      jest.spyOn(mockService, 'remove').mockReturnValue(null);

      try {
        await controller.remove('nonexistentUserId');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
