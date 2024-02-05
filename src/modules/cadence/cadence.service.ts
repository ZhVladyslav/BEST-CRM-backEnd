import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ICadence, ICadenceCreate, ICadenceGetById, ICadenceUpdate } from 'src/interfaces/meeting/cadence.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CadenceService {
    constructor(private readonly prisma: PrismaService) {}

    /* ----------------  GET  ---------------- */

    public async list(): Promise<ICadence[]> {
        const cadence = await this.prisma.cadence.findMany();
        return cadence;
    }

    public async getById(dto: ICadenceGetById): Promise<ICadence> {
        const cadence = await this.prisma.cadence.findUnique({
            where: { id: dto.id },
        });
        if (!cadence) throw new NotFoundException('cadence not found');

        return cadence;
    }

    /* ----------------  POST  ---------------- */
    public async create(dto: ICadenceCreate): Promise<ICadence> {
        const cadence = await this.prisma.cadence.findUnique({ where: { number: dto.number } });
        if (cadence) throw new BadRequestException('cadence is exist');

        const cadenceNew = await this.prisma.cadence.create({
            data: {
                number: dto.number,
                startDate: dto.startDate,
                endDate: dto.endDate,
                isEnd: dto.isEnd,
            },
        });

        return cadenceNew;
    }

    /* ----------------  PUT  ---------------- */
    public async update(dto: ICadenceUpdate): Promise<ICadence> {
        const cadenceById = await this.prisma.cadence.findUnique({ where: { id: dto.id } });
        if (!cadenceById) throw new NotFoundException('cadence not found');

        const cadenceByName = await this.prisma.cadence.findUnique({ where: { number: dto.number } });
        if (cadenceByName) throw new BadRequestException('cadence is exist');

        const cadenceUpdate = await this.prisma.cadence.update({
            where: { id: dto.id },
            data: {
                number: dto.number,
                startDate: dto.startDate,
                endDate: dto.endDate,
                isEnd: dto.isEnd,
            },
        });

        return cadenceUpdate;
    }

    /* ----------------  DELETE  ---------------- */
    public async delete(dto: string[]) {
        const deleteRes = await this.prisma.cadence.deleteMany({
            where: { id: { in: dto } },
        });

        return deleteRes;
    }
}
