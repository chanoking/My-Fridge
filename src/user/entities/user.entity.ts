import { Users } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserEntity implements Users {
  userId: number;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'Should be numbers more than 8' })
  @MaxLength(15, { message: 'Should be numbers until 15' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*$/, {
    message: 'Should contain at least one letter and one number',
  })
  password: string;

  @IsNumber()
  trash: number;

  @IsNumber()
  success: number;

  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
}
