import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Disciplina, DisciplinaDocument } from '../schemas/disciplina.schema';
import { CreateDisciplinaDto } from '../dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from '../dto/update-disciplina.dto';

@Injectable()
export class DisciplinasService {
  constructor(@InjectModel(Disciplina.name) private disciplinaModel: Model<DisciplinaDocument>) {}

  async create(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    const createdDisciplina = new this.disciplinaModel(createDisciplinaDto);
    return createdDisciplina.save();
  }

  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaModel.find().exec();
  }

  async findOne(id: string): Promise<Disciplina | null> {
    return this.disciplinaModel.findById(id).exec();
  }

  async update(id: string, updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina | null> {
    return this.disciplinaModel.findByIdAndUpdate(id, updateDisciplinaDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Disciplina | null> {
    return this.disciplinaModel.findByIdAndDelete(id).exec();
  }

  async bulkCreate(rows: Record<string, any>[]): Promise<DisciplinaDocument[]> {
    const createdDocs = await this.disciplinaModel.insertMany(rows);
    return createdDocs as DisciplinaDocument[];
  }
}
