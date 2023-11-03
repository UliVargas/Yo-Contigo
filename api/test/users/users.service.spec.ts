import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../dependencies';
import { User } from '../../src/users/entities/user.entity';
import { createUserDto, updateUserDto, user } from './user.mock';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create User', () => {
    it('should create a new user', async () => {
      jest.spyOn(mockRepository, 'create').mockReturnValue(createUserDto);
      jest.spyOn(mockRepository, 'save').mockReturnValue(createUserDto);

      const result = await service.create(createUserDto);

      expect(result).toEqual(createUserDto);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('Find All Users', () => {
    it('should return an array of users', async () => {
      jest.spyOn(mockRepository, 'find').mockReturnValue([user]);
      const result = await service.findAll();

      expect(result).toEqual([user]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('Find One User By Id', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockReturnValue(user);
      const result = await service.findOne(user.id);

      expect(result).toEqual(user);
      expect(mockRepository.findOneBy).toHaveBeenCalled();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockReturnValue(undefined);
      try {
        await service.findOne(user.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(mockRepository, 'save').mockResolvedValue({
        ...user,
        ...updateUserDto,
      });
      const result = await service.update(user.id, updateUserDto);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...user,
        ...updateUserDto,
      });
      expect(result).toEqual({ ...user, ...updateUserDto });
    });
  });

  describe('Remove User By Id', () => {
    it('should delete a user', async () => {
      await service.remove(user.id);
      expect(mockRepository.delete).toHaveBeenCalledWith({
        id: user.id,
      });
    });
  });
});
