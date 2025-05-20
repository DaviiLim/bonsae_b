import { Module } from '@nestjs/common';
import { VinculosService } from './vinculos.service';
import { VinculosController } from './vinculos.controller';

@Module({
  controllers: [VinculosController],
  providers: [VinculosService],
})
export class VinculosModule {}
