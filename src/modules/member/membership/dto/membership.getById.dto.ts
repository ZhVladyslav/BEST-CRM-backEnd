import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Membership_GetById_Dto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;
}
