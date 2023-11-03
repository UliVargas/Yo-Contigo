import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrors } from '../utils/db-errors';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.logger.error(error);
      DBErrors(error);
    }
  }

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email'],
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: string) {
    await this.usersRepository.delete({
      id,
    });
    return `User with id ${id} has been deleted`;
  }
}
