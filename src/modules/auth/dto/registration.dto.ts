import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IAuthRegistration } from 'src/interfaces/secure/auth.interface';
import { Regex } from 'src/constants/regex.constant';

export class RegistrationDto implements IAuthRegistration {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(Regex.member.password, { message: 'Incorrect password' })
  password: string;
}
