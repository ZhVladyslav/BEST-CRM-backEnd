import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IServerInfo } from '../../types/serverInfo.type';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Info')
@Controller('info')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiCreatedResponse()
  serverInfo(): IServerInfo {
    return this.appService.serverInfo();
  }
}
