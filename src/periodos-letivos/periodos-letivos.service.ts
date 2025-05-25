import { Injectable } from '@nestjs/common';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schema/periodos-letivos.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PeriodosLetivosService {
  constructor(
    @InjectModel(PeriodoLetivo.name)
    private periodoModel: Model<PeriodoLetivoDocument>
  ) {}

  async create(dto: CreatePeriodosLetivoDto): Promise<PeriodoLetivo> {
    const created = new this.periodoModel({
      periodoLetivo: dto.periodoLetivo,
      dataInicial: new Date(dto.dataInicial),
      dataFinal: new Date(dto.dataFinal),
    })
    return created.save()
  }

  async findAll(): Promise<PeriodoLetivo[]> {
    return this.periodoModel.find().exec();
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
