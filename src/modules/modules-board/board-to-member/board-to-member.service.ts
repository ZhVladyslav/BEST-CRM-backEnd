import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ICreateReq, IDeleteReq, IGetByBoardIdReq, IGetByCadenceIdReq, IGetByIdReq, IGetByMemberIdReq, IUpdateReq } from './interfaces/req.interface';
import { PrismaService } from '../../prisma/prisma.service';
import {
    ICreateRes,
    IDeleteArrayRes,
    IDeleteRes,
    IGetByBoardIdRes,
    IGetByCadenceIdRes,
    IGetByIdRes,
    IGetByMemberIdRes,
    IGetListRes,
    IUpdateRes,
} from './interfaces/res.interface';
import { MemberService } from '../../modules-member/member/member.service';
import { CadenceService } from '../../cadence/cadence.service';
import { BoardService } from '../board/board.service';

interface IBoardService {
    getList(): Promise<IGetListRes[]>;

    getById(dto: IGetByIdReq): Promise<IGetByIdRes>;

    getByMemberId(dto: IGetByMemberIdReq): Promise<IGetByMemberIdRes[]>;

    getByCadenceId(dto: IGetByCadenceIdReq): Promise<IGetByCadenceIdRes[]>;

    getByBoardId(dto: IGetByBoardIdReq): Promise<IGetByBoardIdRes[]>;

    create(dto: ICreateReq): Promise<ICreateRes>;

    update(dto: IUpdateReq): Promise<IUpdateRes>;

    deleteById(dto: IDeleteReq): Promise<IDeleteRes>;

    deleteArray(dto: number[]): Promise<IDeleteArrayRes>;
}

@Injectable()
export class BoardToMemberService implements IBoardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly memberService: MemberService,
        private readonly cadenceService: CadenceService,
        private readonly boardService: BoardService,
    ) {}

    /* ----------------  GET  ---------------- */

    public async getList(): Promise<IGetListRes[]> {
        return this.prisma.boardToMember.findMany({
            select: { id: true, memberId: true, boardId: true, cadenceId: true, excluded: true, excludedDate: true },
        });
    }

    public async getById(dto: IGetByIdReq): Promise<IGetByIdRes> {
        const boardToMember = await this.prisma.boardToMember.findUnique({ where: { id: parseInt(dto.id) } });
        if (!boardToMember) throw new NotFoundException('Board to member not found');

        return boardToMember;
    }

    public async getByMemberId(dto: IGetByMemberIdReq): Promise<IGetByMemberIdRes[]> {
        return this.prisma.boardToMember.findMany({ where: { memberId: parseInt(dto.memberId) } });
    }

    public async getByCadenceId(dto: IGetByCadenceIdReq): Promise<IGetByCadenceIdRes[]> {
        return this.prisma.boardToMember.findMany({ where: { cadenceId: parseInt(dto.cadenceId) } });
    }

    public async getByBoardId(dto: IGetByBoardIdReq): Promise<IGetByBoardIdRes[]> {
        return this.prisma.boardToMember.findMany({ where: { boardId: parseInt(dto.boardId) } });
    }

    /* ----------------  POST  ---------------- */
    public async create(dto: ICreateReq): Promise<ICreateRes> {
        const boardToMember = await this.prisma.boardToMember.findFirst({
            where: { memberId: dto.memberId, cadenceId: dto.cadenceId, boardId: dto.boardId },
        });
        if (boardToMember) throw new BadRequestException('This board to member is exist');

        await this.memberService.checkById({ id: dto.memberId });
        await this.boardService.checkById({ id: dto.boardId });
        await this.cadenceService.checkById({ id: dto.cadenceId });

        const createBoardToMember = await this.prisma.boardToMember.create({
            data: {
                cadenceId: dto.cadenceId,
                boardId: dto.boardId,
                memberId: dto.memberId,
                excluded: dto.excluded,
                excludedDate: dto.excludedDate,
            },
        });

        return { id: createBoardToMember.id };
    }

    /* ----------------  PUT  ---------------- */
    public async update(dto: IUpdateReq): Promise<IUpdateRes> {
        const boardToMember = await this.prisma.boardToMember.findUnique({ where: { id: dto.id } });
        if (!boardToMember) throw new NotFoundException('Board to member not found');

        await this.memberService.checkById({ id: dto.memberId });
        await this.boardService.checkById({ id: dto.boardId });
        await this.cadenceService.checkById({ id: dto.cadenceId });

        const updateBoardToMember = await this.prisma.boardToMember.update({
            where: { id: dto.id },
            data: {
                cadenceId: dto.cadenceId,
                boardId: dto.boardId,
                memberId: dto.memberId,
                excluded: dto.excluded,
                excludedDate: dto.excludedDate,
            },
        });

        return { id: updateBoardToMember.id };
    }

    /* ----------------  DELETE  ---------------- */
    public async deleteById(dto: IDeleteReq): Promise<IDeleteRes> {
        const boardToMember = await this.prisma.boardToMember.findUnique({ where: { id: parseInt(dto.id) } });
        if (!boardToMember) throw new NotFoundException('Board to member is not found');

        try {
            const deleteBoardToMember = await this.prisma.boardToMember.delete({ where: { id: parseInt(dto.id) } });
            return { id: deleteBoardToMember.id };
        } catch (err) {
            throw new InternalServerErrorException('Error delete board to member');
        }
    }

    public async deleteArray(dto: number[]): Promise<IDeleteArrayRes> {
        try {
            return this.prisma.boardToMember.deleteMany({ where: { id: { in: dto } } });
        } catch (err) {
            throw new InternalServerErrorException('Error delete all board to member');
        }
    }
}
