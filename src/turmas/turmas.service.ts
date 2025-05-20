import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Turma, TurmaDocument } from 'src/turmas/schema/turmas.schema';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Injectable()
export class TurmaService {
  constructor(
    @InjectModel(Turma.name) private turmaModel: Model<TurmaDocument>,
  ) {}

  async create(createTurmaDto: CreateTurmaDto): Promise<Turma> {
    const turma = new this.turmaModel(createTurmaDto);
    return turma.save();
  }

  async findAll(): Promise<Turma[]> {
    return this.turmaModel
      .find()
      .populate('disciplina')
      .populate('processo');
  }

  async findOne(id: string): Promise<Turma> {
    const turma = await this.turmaModel
      .findById(id)
      .populate('disciplina')
      .populate('processo');
    if (!turma) throw new NotFoundException('Turma não encontrada');
    return turma;
  }

  async update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    const updated = await this.turmaModel.findByIdAndUpdate(id, updateTurmaDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Turma não encontrada');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.turmaModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Turma não encontrada');
  }
}
