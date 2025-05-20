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
    const jaExiste = await this.turmaModel.findOne({ codigoTurma: dto.codigoTurma });
    if (jaExiste) {
      throw new ConflictException('ERROR - Já existe uma turma com esse código');
    }

    const novaTurma = new this.turmaModel(dto);
    return novaTurma.save();
  }

  async findAll(): Promise<Turma[]> {
    return this.turmaModel.find();
  }

  async findById(id: string): Promise<Turma> {
    const turma = await this.turmaModel.findById(id);
    if (!turma) {
      throw new NotFoundException('ERROR - Turma não encontrada!');
    }
    return turma;
  }

  async update(id: string, dto: UpdateTurmaDto): Promise<Turma> {
    const atualizada = await this.turmaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizada) {
      throw new NotFoundException('ERROR - Turma não foi atualizada/encontrada!');
    }
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    const resultado = await this.turmaModel.findByIdAndDelete(id);
    if (!resultado) {
      throw new NotFoundException('ERROR - Turma não encontrada!');
    }

    return { message: 'Turma excluída com sucesso.' };
  }
}
