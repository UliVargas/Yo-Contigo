import { User } from '../../src/users/entities/user.entity';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto';

export const createUserDto: CreateUserDto = {
  name: 'John',
  email: 'john@email.com',
  phone: '1234567890',
  birthdate: '1995-09-02',
  gender: 'male',
};

export const updateUserDto: UpdateUserDto = {
  name: 'Richard',
  email: 'john@email.com',
};

export const user: Omit<User, 'validateAge'> = {
  id: 'user123',
  name: 'John',
  email: 'john@email.com',
  birthdate: '1995-09-02',
  phone: '1234567890',
  gender: 'male',
};
