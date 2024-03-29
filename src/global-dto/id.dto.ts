import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdDto_c {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class IdStringDto_c {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    id: string;
}
