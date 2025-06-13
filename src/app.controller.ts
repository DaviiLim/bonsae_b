import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Bem-vindo à API Bonsae! A API está online e funcionando.';
  }
}
