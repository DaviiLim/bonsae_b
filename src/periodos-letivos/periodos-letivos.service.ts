import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeriodosLetivos, PeriodosLetivosDocument } from './schema/periodos-letivos.schema';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';

@Injectable()
export class PeriodoLetivoService {
  constructor(
    @InjectModel(PeriodosLetivos.name)
    private readonly periodoLetivoModel: Model<PeriodosLetivosDocument>,
  ) {}

  async create(dto: CreatePeriodosLetivoDto): Promise<PeriodosLetivos> {
    const novoPeriodo = new this.periodoLetivoModel(dto);
    return novoPeriodo.save();
  }

  async findAll(): Promise<PeriodosLetivos[]> {
    return this.periodoLetivoModel.find();
  }

  async findById(id: string): Promise<PeriodosLetivos> {
    const periodo = await this.periodoLetivoModel.findById(id);
    if (!periodo) throw new NotFoundException('Período letivo não encontrado !');
    return periodo;
  }

  async update(id: string, dto: UpdatePeriodosLetivoDto): Promise<PeriodosLetivos> {
    const atualizado = await this.periodoLetivoModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizado) throw new NotFoundException('Período letivo não encontrado !');
    return atualizado;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.periodoLetivoModel.findByIdAndDelete(id);
    if (!resultado) throw new NotFoundException('Período letivo não encontrado !');
  }
}
