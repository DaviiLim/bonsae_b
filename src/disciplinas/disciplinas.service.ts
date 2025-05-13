import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schema/disciplinas.schema';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinasService {
  constructor(
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
    @InjectModel('PeriodosLetivos') private readonly periodoLetivoModel: Model<any>,
  ) {}

  async create(createDisciplinaDto: CreateDisciplinaDto) {
    try {

      if (!Types.ObjectId.isValid(createDisciplinaDto.identificacaoPeriodoLetivo)) {
        throw new BadRequestException('ID do período letivo inválido');
      }

      const periodoId = new Types.ObjectId(createDisciplinaDto.identificacaoPeriodoLetivo);

      const periodoExists = await this.periodoLetivoModel.exists({ _id: periodoId });
      if (!periodoExists) {
        throw new NotFoundException('Período letivo não encontrado');
      }
    
      const disciplinaExists = await this.disciplinaModel.findOne({
        codigo: createDisciplinaDto.codigo
      });
      
      if (disciplinaExists) {
        throw new ConflictException('Já existe uma disciplina com este código');
      }

      const novaDisciplina = new this.disciplinaModel({
        ...createDisciplinaDto,
        identificacaoPeriodoLetivo: periodoId,
      });

      const disciplinaSalva = await novaDisciplina.save();
      return disciplinaSalva.toObject();

    } catch (error) {
      console.error('Erro detalhado:', error);  
      }
      
    }
  


  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaModel.find();
  }

  async findById(id: string): Promise<Disciplina> {
    const disciplina = await this.disciplinaModel.findById(id);
    if (!disciplina) {
      throw new NotFoundException('ERROR - Disciplina não encontrada!');
    }
    return disciplina;
  }

  async update(id: string, dto: UpdateDisciplinaDto): Promise<Disciplina> {
    const atualizada = await this.disciplinaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizada) {
      throw new NotFoundException('ERROR - Disciplina não encontrada ou não atualizada!');
    }
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletada = await this.disciplinaModel.findByIdAndDelete(id);
    if (!deletada) {
      throw new NotFoundException('ERROR - Disciplina não encontrada!');
    }

    return { message: 'Disciplina excluída com sucesso !' };
  }
}
