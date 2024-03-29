import { IntersectionType } from '@nestjs/swagger';
import { IsActiveDto_c, NameDto_c } from './components.dto';
import { ICreateReq, IDeleteArrayReq, IDeleteReq, IGetByIdReq, IUpdateReq } from '../interfaces/req.interface';
import { IdArrayDto_c, IdDto_c, IdStringDto_c } from '../../../../global-dto';

/* ----------- GET ----------- */
export class CommitteeGetByIdDto extends IntersectionType(IdStringDto_c) implements IGetByIdReq {}

/* ----------- POST ----------- */
export class CommitteeCreateDto extends IntersectionType(NameDto_c, IsActiveDto_c) implements ICreateReq {}

/* ----------- PUT ----------- */
export class CommitteeUpdateDto extends IntersectionType(IdDto_c, NameDto_c, IsActiveDto_c) implements IUpdateReq {}

/* ----------- DELETE ----------- */
export class CommitteeDeleteDto extends IntersectionType(IdStringDto_c) implements IDeleteReq {}

export class CommitteeDeleteArrayDto extends IntersectionType(IdArrayDto_c) implements IDeleteArrayReq {}
