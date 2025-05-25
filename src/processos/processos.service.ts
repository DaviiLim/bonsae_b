import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Processo, ProcessoDocument } from './schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosDocument } from '../periodos-letivos/schema/periodos-letivos.schema';

@Injectable()
export class ProcessosService {
  constructor(
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
  ) {}

  async create(processoID: string): Promise<Processo> {

  const jaExiste = await this.processoModel.findOne({ processoID });
  if (jaExiste) {
    throw new ConflictException('Já existe um processo com esse processoID.');
  }

  const novo = new this.processoModel({ processoID });

  try {
    return await novo.save();
  } catch (err) {
    throw new NotFoundException('Falha ao salvar o processo.');
  }
}


  async find(): Promise<Processo[]> {
    return this.processoModel.find();
  }

  async findById(_id: string): Promise<Processo> {
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException('ID inválido');
    }

    const processo = await this.processoModel.findById(_id);
    if (!processo) throw new NotFoundException('Processo não encontrado');

    return processo;
  }

  async delete(_id: string): Promise<string> {
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException('ID inválido');
    }

    const processo = await this.processoModel.findById(_id);
    if (!processo) throw new NotFoundException('Processo não encontrado');

    await this.processoModel.findByIdAndDelete(_id);

    return 'O processo foi deletado com sucesso !'
  }

  async concluirProcesso(_id: string): Promise<Processo> {
    const existeProcesso = await this.processoModel.findById(_id);
    if (!existeProcesso) {
      throw new NotFoundException('Processo não encontrado');
    }
    const atualizado = await this.processoModel.findByIdAndUpdate(
      _id,
      { status: 'CONCLUIDO', dataFim: new Date() },
      { new: true },
    );
    if (!atualizado) {
      throw new NotFoundException('Falha ao atualizar o processo');
    }

    return atualizado;
  }

  
}
