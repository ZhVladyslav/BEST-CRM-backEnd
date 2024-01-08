import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';

export class MemberDeleteArrayByIdDto {
  @IsNotEmpty()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  id: string[];
}
