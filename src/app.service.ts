import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'A api está rodando perfeitamente! Obrigado pela confiança!';
  }
}
