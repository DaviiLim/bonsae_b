import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Processo, ProcessoDocument } from './schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosDocument } from '../periodos-letivos/schema/periodos-letivos.schema';

@Injectable()
export class ProcessosService {
  constructor(
    @InjectModel(Processo.name) private processoModel: Model<ProcessoDocument>,
    @InjectModel(PeriodosLetivos.name) private periodosLetivosModel: Model<PeriodosLetivosDocument>,
  ) {}

  async criarProcesso(id): Promise<Processo> {
    const novoProcesso = new this.processoModel({ id });
    return novoProcesso.save();
  }

  async listarProcessos(): Promise<Processo[]> {
    return this.processoModel.find().exec();
  }

  async procurarProcessos(id): Promise<Processo[]> {
    const processos = await this.processoModel.find({ id }).exec();

    if (processos.length === 0) {
      throw new NotFoundException('Nenhum processo encontrado com este ID!');
    }

    return processos;
  }

  async concluirProcesso(id): Promise<Processo> {
    const processoAtualizado = await this.processoModel
      .findByIdAndUpdate(
        id,
        { status: 'CONCLUIDO', dataFim: new Date() },
        { new: true },
      )
      .exec();

    if (!processoAtualizado) {
      throw new NotFoundException(`Processo com ID ${id} não encontrado`);
    }

    return processoAtualizado;
  }

  async buscarProcessoPorId(id): Promise<Processo> {
    const processo = await this.processoModel.findById(id).exec();

    if (!processo) {
      throw new NotFoundException(`Processo com ID ${id} não encontrado`);
    }

    return processo;
  }

  async buscaratreladosPorProcesso(id) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de processo inválido');
    }

    const periodos = await this.periodosLetivosModel.find({ id }).exec();

    if (!periodos || periodos.length === 0) {
      throw new NotFoundException('Nenhum período letivo encontrado para este processo');
    }

    return periodos;
  }
}
