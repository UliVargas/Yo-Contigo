import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    minLength: 10,
    maxLength: 10,
  })
  @IsString()
  @Length(10)
  @Matches(/^([0-9]{2,3})([\s.-]?)([0-9]{3,4})([\s.-]?)([0-9]{4})$/s, {
    message:
      'Enter a correct phone number, remember that it must be 10 digits long',
  })
  phone: string;

  @ApiProperty({
    uniqueItems: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsDateString()
  birthdate: string;

  @ApiProperty()
  @IsString()
  gender: string;
}
