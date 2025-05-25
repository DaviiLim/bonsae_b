import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discipline, DisciplineDocument } from './schema/disciplines.schema';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
// import { UpdateAcademicClassDto } from 'src/academic_classes/dto/update-academic_class.dto';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>,
  ) {}

  /** 
  async create(createDisciplineDto: UpdateAcademicClassDto): Promise<Discipline> {
    const createdDiscipline = new this.disciplineModel(createDisciplineDto);
    return createdDiscipline.save();
  }
  */

  async findAll(): Promise<Discipline[]> {
    return this.disciplineModel.find({ deleted_at: null }).exec();
  }

  async findOne(id: string): Promise<Discipline> {
    const discipline = await this.disciplineModel.findById(id).exec();
    if (!discipline) {
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);
    }
    return discipline;
  }

  async update(id: string, updateDisciplineDto: CreateDisciplineDto): Promise<Discipline> {
    const updatedDiscipline = await this.disciplineModel
      .findByIdAndUpdate(id, updateDisciplineDto, { new: true })
      .exec();

    if (!updatedDiscipline) {
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);
    }

    return updatedDiscipline;
  }

  async remove(id: string): Promise<String> {
    const discipline = await this.disciplineModel
    .findByIdAndDelete(id)
    .exec();

    if (!discipline) {
      throw new HttpException('Turma não encontrada ou já foi deletada.', HttpStatus.NOT_FOUND);
    }


    return 'Discipline deletada com sucesso!';
  }
}
