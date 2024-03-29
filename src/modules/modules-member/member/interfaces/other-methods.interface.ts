import { IMemberPrisma } from '../../../../interfaces/prisma';

// get by login
export interface IGetByLoginReq extends Pick<IMemberPrisma, 'login'> {}
export interface IGetByLoginRes extends Pick<IMemberPrisma, 'login' | 'password'> {}

// update membership
export interface IUpdateMembershipReq extends Pick<IMemberPrisma, 'id' | 'membership'> {}
