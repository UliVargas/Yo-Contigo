import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'Users',
})
export class User {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'Name',
  })
  @Column('text')
  name: string;

  @ApiProperty({
    example: '3312123465',
    description: 'Phone Number',
  })
  @Column('text')
  phone: string;

  @ApiProperty({
    example: 'email@email.com',
    description: 'Email',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: '1990-12-01',
    description: 'Birthdate',
  })
  @Column({ type: 'date' })
  birthdate: string;

  @ApiProperty({
    example: 'Male',
    description: 'Gender',
  })
  @Column('text')
  gender: string;

  @BeforeInsert()
  @BeforeUpdate()
  private validateAge() {
    // Validar que la fecha de nacimiento sea válida
    const error: {
      code: string;
      detail: string;
    } = {
      code: '',
      detail: '',
    };
    if (new Date(this.birthdate) > new Date()) {
      error.code = 'date-error';
      error.detail = 'The date of birth cannot be in the future';
      throw error;
    }

    // Calcular la edad
    const birthDate = new Date(this.birthdate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Validar que el usuario sea mayor de 18 años
    if (age < 18) {
      error.code = 'younger';
      error.detail = 'The user must be over 18 years old';
      throw error;
    }
  }
}
