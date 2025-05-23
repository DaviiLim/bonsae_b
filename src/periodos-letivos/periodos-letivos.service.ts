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
    const existeIdentificacao = await this.periodoLetivoModel.findOne({ identificacao: dto.identificacao });
    if (existeIdentificacao) {
      throw new ConflictException('Já existe um período letivo com essa identificação.');
    }

    const existeProcesso = await this.periodoLetivoModel.findOne({ processoID: dto.processoID });
    if (existeProcesso) {
      throw new ConflictException('Já existe um período letivo vinculado a esse processo.');
    }

    const novoPeriodo = new this.periodoLetivoModel(dto);
    return novoPeriodo.save();
  }

  async findAll(): Promise<PeriodosLetivos[]> {
    const periodos = await this.periodoLetivoModel.find();
    if (!periodos.length) {
      throw new NotFoundException('Nenhum período letivo encontrado.');
    }
    return periodos;
  }

  async findById(id: string): Promise<PeriodosLetivos> {
    const periodo = await this.periodoLetivoModel.findById(id);
    if (!periodo) {
      throw new NotFoundException('Período letivo não encontrado.');
    }
    return periodo;
  }

  async update(id: string, dto: UpdatePeriodosLetivoDto): Promise<PeriodosLetivos> {
    const atualizado = await this.periodoLetivoModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizado) {
      throw new NotFoundException('Não foi possível atualizar: período letivo não encontrado.');
    }
    return atualizado;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletado = await this.periodoLetivoModel.findByIdAndDelete(id);
    if (!deletado) {
      throw new NotFoundException('Período letivo não encontrado para exclusão.');
    }
    return { message: 'Período letivo excluído com sucesso.' };
  }

  async buscarProcesso(id: string): Promise<PeriodosLetivos> {
    const periodo = await this.periodoLetivoModel
      .findById(id)
      .populate('processoID')
      .lean();

    if (!periodo) {
      throw new NotFoundException('Processo vinculado não encontrado.');
    }

    return periodo;
  }
}
