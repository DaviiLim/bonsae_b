import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Turma, TurmaDocument } from './schema/turmas.schema';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Injectable()
export class TurmasService {
  constructor(
    @InjectModel(Turma.name)
    private readonly turmaModel: Model<TurmaDocument>,
  ) {}

  async create(dto: CreateTurmaDto): Promise<Turma> {
    const existeTurma = await this.turmaModel.findOne({ codigoTurma: dto.codigoTurma });
    if (existeTurma) {
      throw new ConflictException('Já existe uma turma com esse código.');
    }

    const novaTurma = new this.turmaModel(dto);
    return novaTurma.save();
  }

  async findAll(): Promise<Turma[]> {
    const turmas = await this.turmaModel.find();
    if (!turmas.length) {
      throw new NotFoundException('Nenhuma turma encontrada.');
    }
    return turmas;
  }

  async findById(id: string): Promise<Turma> {
    const turma = await this.turmaModel.findById(id);
    if (!turma) {
      throw new NotFoundException('Turma não encontrada.');
    }
    return turma;
  }

  async update(id: string, dto: UpdateTurmaDto): Promise<Turma> {
    const atualizada = await this.turmaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizada) {
      throw new NotFoundException('Não foi possível atualizar: turma não encontrada.');
    }
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletada = await this.turmaModel.findByIdAndDelete(id);
    if (!deletada) {
      throw new NotFoundException('Turma não encontrada para exclusão.');
    }
    return { message: 'Turma excluída com sucesso.' };
  }

  async buscarProcesso(id: string): Promise<Turma> {
    const turma = await this.turmaModel
      .findById(id)
      .populate('processoID')
      .lean();

    if (!turma) {
      throw new NotFoundException('Processo vinculado não encontrado.');
    }

    return turma;
  }
}
