import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schema/disciplinas.schema';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinasService {
  constructor(
    @InjectModel(Disciplina.name)
    private readonly disciplinaModel: Model<DisciplinaDocument>,
  ) {}

  async create(dto: CreateDisciplinaDto): Promise<Disciplina> {
    const existeCodigo = await this.disciplinaModel.findOne({ codigo: dto.codigo });
    if (existeCodigo) {
      throw new ConflictException('Já existe uma disciplina com esse código.');
    }

    const novaDisciplina = new this.disciplinaModel(dto);
    return novaDisciplina.save();
  }

  async findAll(): Promise<Disciplina[]> {
    const disciplinas = await this.disciplinaModel.find();
    if (!disciplinas.length) {
      throw new NotFoundException('Nenhuma disciplina encontrada.');
    }
    return disciplinas;
  }

  async findById(id: string): Promise<Disciplina> {
    const disciplina = await this.disciplinaModel.findById(id);
    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada.');
    }
    return disciplina;
  }

  async update(id: string, dto: UpdateDisciplinaDto): Promise<Disciplina> {
    const atualizada = await this.disciplinaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizada) {
      throw new NotFoundException('Não foi possível atualizar: disciplina não encontrada.');
    }
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletada = await this.disciplinaModel.findByIdAndDelete(id);
    if (!deletada) {
      throw new NotFoundException('Disciplina não encontrada para exclusão.');
    }
    return { message: 'Disciplina excluída com sucesso.' };
  }

  async buscarProcesso(id: string): Promise<Disciplina> {
    const disciplina = await this.disciplinaModel
      .findById(id)
      .populate('processoID')
      .lean();

    if (!disciplina) {
      throw new NotFoundException('Processo vinculado não encontrado.');
    }

    return disciplina;
  }

  async buscarPeriodoLetivo(id: string): Promise<Disciplina> {
    const disciplina = await this.disciplinaModel
      .findById(id)
      .populate('periodosLetivosID')
      .lean();

    if (!disciplina) {
      throw new NotFoundException('Processo vinculado não encontrado.');
    }

    return disciplina;
  }

  
}
