import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeriodosLetivos, PeriodosLetivosDocument } from './schema/periodos-letivos.schema';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';

@Injectable()
export class PeriodosLetivosService {
  constructor(
    @InjectModel(PeriodosLetivos.name)
    private readonly periodoLetivoModel: Model<PeriodosLetivosDocument>,
  ) {}

  async create(dto: CreatePeriodosLetivoDto): Promise<PeriodosLetivos> {
  const jaExiste = await this.periodoLetivoModel.findOne({ identificacao: dto.identificacao });
  if (jaExiste) {
    throw new ConflictException('ERROR - Já existe um período letivo com essa identificação');
  }

  const novoPeriodo = new this.periodoLetivoModel(dto);
  return novoPeriodo.save();
}


  async findAll(): Promise<PeriodosLetivos[]> {
    return this.periodoLetivoModel.find();
  }

  async findById(id: string): Promise<PeriodosLetivos> {
    const periodo = await this.periodoLetivoModel.findById(id);
    if (!periodo) throw new NotFoundException('ERROR - Período letivo não encontrado !');
    return periodo;
  }

  async findByProcessoId(processoId: string): Promise<PeriodosLetivos[]> {
  return this.periodoLetivoModel.find({ processoId });
}


  async update(id: string, dto: UpdatePeriodosLetivoDto): Promise<PeriodosLetivos> {
    const atualizado = await this.periodoLetivoModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizado) throw new NotFoundException('ERROR - Período letivo não foi atualizado/encontrado !');
    return atualizado;
  }

  async delete(id: string): Promise<{ message: string }> {
  const resultado = await this.periodoLetivoModel.findByIdAndDelete(id);
  if (!resultado) throw new NotFoundException('ERROR - Período letivo não encontrado !');

  return { message: 'Período letivo excluído com sucesso.' };
}

}
