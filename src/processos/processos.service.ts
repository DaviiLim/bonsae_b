import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Processo, ProcessoDocument } from './schema/processos.schema';
import { ProcessosStatusEnum } from './enum/processosStatus.enum';

@Injectable()
export class ProcessosService {
  constructor(
    @InjectModel(Processo.name) private processoModel: Model<ProcessoDocument>,
  ) {}

  async criarProcesso(processoID: string): Promise<Processo> {
    const novoProcesso = new this.processoModel({
      processoID,
      status: ProcessosStatusEnum.EM_ANDAMENTO,
      dataInicio: new Date(),
    });
    return novoProcesso.save();
  }

  async listarProcessos(): Promise<Processo[]> {
    return this.processoModel.find().exec();
  }

  async procurarProcessos(processoID: string): Promise<Processo[]> {
  const processos = await this.processoModel.find({ processoID }).exec();

  if (processos.length === 0) {
    throw new NotFoundException('ERRO - Nenhum processo encontrado com este ID!');
  }

  return processos;
}

  async concluirProcesso(id: string): Promise<Processo> {
    const processoAtualizado = await this.processoModel
      .findByIdAndUpdate(
        id,
        { 
          status: ProcessosStatusEnum.CONCLUIDO,
          dataFim: new Date() 
        },
        { new: true },
      )
      .exec();

    if (!processoAtualizado) {
      throw new NotFoundException(`Processo com ID ${id} não encontrado`);
    }

    return processoAtualizado;
  }

  async buscarProcessoPorId(id: string): Promise<Processo> {
    const processo = await this.processoModel.findById(id).exec();

    if (!processo) {
      throw new NotFoundException(`Processo com ID ${id} não encontrado`);
    }

    return processo;
  }
}