import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

// Board
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
    imports: [PrismaModule],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
