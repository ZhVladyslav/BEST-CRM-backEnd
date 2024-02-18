import { ICoordinatorPrisma } from '../../../../interfaces/prisma';

export interface IGetListReq {}

export interface IGetByIdReq {
    id: string;
}

export interface ICreateReq extends Omit<ICoordinatorPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateReq extends Omit<ICoordinatorPrisma, 'createdAt' | 'updatedAt'> {}

export interface IDeleteReq {
    id: string;
}

export interface IDeleteArrayReq {
    id: number[];
}
