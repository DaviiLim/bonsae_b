import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicClasses, AcademicClassDocument } from './schema/academic_classes.schema';
import { CreateAcademicClassDto } from './dto/create-academic_class.dto';
import { UpdateAcademicClassDto } from './dto/update-academic_class.dto';

@Injectable()
export class AcademicClassesService {
  constructor(
    @InjectModel(AcademicClasses.name) private academicClassModel: Model<AcademicClassDocument>,
  ) {}

  async create(createAcademicClassDto: CreateAcademicClassDto): Promise<AcademicClasses> {
    const createdAcademicClass = new this.academicClassModel(createAcademicClassDto);
    return createdAcademicClass.save();
  }

  async findAll(): Promise<AcademicClasses[]> {
    return this.academicClassModel.find({ deleted_at: null }).exec();
  }

  async findOne(id: string): Promise<AcademicClasses> {
    const academicClass = await this.academicClassModel.findById(id).exec();
    if (!academicClass) {
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);
    }
    return academicClass;
  }

  async update(id: string, updateAcademicClassDto: UpdateAcademicClassDto): Promise<AcademicClasses> {
    const updatedAcademicClass = await this.academicClassModel
      .findByIdAndUpdate(id, updateAcademicClassDto, { new: true })
      .exec();

    if (!updatedAcademicClass) {
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);
    }

    return updatedAcademicClass;
  }

  async remove(id: string): Promise<string> {
    const academicClass = await this.academicClassModel.findById(id).exec();

    if (!academicClass || academicClass.deleted_at) {
      throw new HttpException('Turma não encontrada ou já foi deletada.', HttpStatus.NOT_FOUND);
    }

    await academicClass.updateOne({ deleted_at: new Date() });

    return 'Turma deletada com sucesso!';
  }
}
