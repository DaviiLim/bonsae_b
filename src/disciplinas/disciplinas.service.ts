import {  ConflictException,  Injectable,  NotFoundException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  Disciplina,  DisciplinaDocument,} from './schema/disciplinas.schema';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinasService {
  constructor(
    @InjectModel(Disciplina.name)
    private readonly disciplinaModel: Model<DisciplinaDocument>,
  ) {}

  async create(dto: CreateDisciplinaDto): Promise<Disciplina> {
    const jaExiste = await this.disciplinaModel.findOne({ codigo: dto.codigo });
    if (jaExiste) {
      throw new ConflictException(
        'ERROR - Já existe uma disciplina com esse código',
      );
    }

    const novaDisciplina = new this.disciplinaModel(dto);
    return novaDisciplina.save();
  }

  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaModel.find();
  }

  async findById(id: string): Promise<Disciplina> {
    const disciplina = await this.disciplinaModel.findById(id);
    if (!disciplina)
      throw new NotFoundException('ERROR - Disciplina não encontrada !');
    return disciplina;
  }

  async update(id: string, dto: UpdateDisciplinaDto): Promise<Disciplina> {
    const atualizada = await this.disciplinaModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!atualizada)
      throw new NotFoundException(
        'ERROR - Disciplina não foi atualizada/encontrada !',
      );
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    const resultado = await this.disciplinaModel.findByIdAndDelete(id);
    if (!resultado)
      throw new NotFoundException('ERROR - Disciplina não encontrada !');

    return { message: 'Disciplina excluída com sucesso.' };
  }
}
