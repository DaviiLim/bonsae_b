import { Injectable } from '@nestjs/common';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';

@Injectable()
export class PeriodosLetivosService {
  create(createPeriodosLetivoDto: CreatePeriodosLetivoDto) {
    return 'This action adds a new periodosLetivo';
  }

  findAll() {
    return `This action returns all periodosLetivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} periodosLetivo`;
  }

  update(id: number, updatePeriodosLetivoDto: UpdatePeriodosLetivoDto) {
    return `This action updates a #${id} periodosLetivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} periodosLetivo`;
  }
}
