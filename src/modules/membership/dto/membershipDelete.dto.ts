import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MembershipDeleteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;
}
