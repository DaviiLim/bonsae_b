import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolPeriod, SchoolPeriodDocument } from './schema/shool_periods.schema';
import { CreateSchoolPeriodDto } from './dto/create-school_period.dto';
import { UpdateSchoolPeriodDto } from './dto/update-school_period.dto';

@Injectable()
export class SchoolPeriodsService {
  constructor(
    @InjectModel(SchoolPeriod.name) private schoolPeriodModel: Model<SchoolPeriodDocument>,
  ) {}

  async create(createSchoolPeriodDto: CreateSchoolPeriodDto): Promise<SchoolPeriod> {
    const createdPeriod = new this.schoolPeriodModel(createSchoolPeriodDto);
    return createdPeriod.save();
  }

  async findAll(): Promise<SchoolPeriod[]> {
    return this.schoolPeriodModel.find({ deleted_at: null }).exec();
  }

  async findOne(id: string): Promise<SchoolPeriod> {
    const period = await this.schoolPeriodModel.findById(id).exec();
    if (!period) {
      throw new HttpException('O Período letivo não foi encontrado!', HttpStatus.NOT_FOUND);
    }
    return period;
  }

  async update(id: string, updateSchoolPeriodDto: UpdateSchoolPeriodDto): Promise<SchoolPeriod> {
    const updatedPeriod = await this.schoolPeriodModel
      .findByIdAndUpdate(
        id,
        updateSchoolPeriodDto, 
        { new: true } 
      )
      .exec();
  
    if (!updatedPeriod) {
      throw new HttpException('Período letivo não foi encontrado!', HttpStatus.NOT_FOUND);
    }
  
    return updatedPeriod;
  }

  async remove(id: string): Promise<String> {
    const updatedDeletedPeriod = await this.schoolPeriodModel
      .findById(id)
      .exec();
  
    if (!updatedDeletedPeriod || updatedDeletedPeriod.deleted_at) {
      throw new HttpException('O Período letivo não foi encontrado ou foi deletado!', HttpStatus.NOT_FOUND);
    }
    
    await updatedDeletedPeriod.updateOne({deleted_at: new Date()})

    return 'School Period deletado com sucesso!';  
  }
  
}
