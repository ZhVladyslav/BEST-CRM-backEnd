import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CoordinatorToMember_GetById_Dto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  cadence_id: string;
}
