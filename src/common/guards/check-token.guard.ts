import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger, InternalServerErrorException } from '@nestjs/common';
import { IAccessToken, IRefreshToken } from 'src/interfaces/secure/token.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CheckTokenGuard implements CanActivate {
    logger = new Logger(CheckTokenGuard.name);

    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext) {
        try {
            const disableStatus = process.env.CHECK_TOKEN_GUARD_DISABLE;
            if (disableStatus === 'true') return true;

            const request = context.switchToHttp().getRequest();
            const accessToken = request.user as IAccessToken | IRefreshToken;
            const refreshTokenId = accessToken.refreshTokenId;

            const refreshTokenInDb = await this.prisma.refreshToken.findUnique({ where: { id: refreshTokenId } });
            if (!refreshTokenInDb) throw new UnauthorizedException();

            if (refreshTokenInDb.needUpdate === false) {
                return true;
            } else if (refreshTokenInDb.needUpdate === true) {
                throw new UnauthorizedException(['need update tokens', '0x401']);
            }
        } catch (error) {
            this.logger.error(error.stack);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
