import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schema/disciplinas.schema';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Processo, ProcessoDocument } from 'src/processos/schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosDocument } from 'src/periodos-letivos/schema/periodos-letivos.schema';

@Injectable()
export class DisciplinasService {
  constructor(
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
    @InjectModel(PeriodosLetivos.name) private readonly periodoLetivoModel: Model<PeriodosLetivosDocument>,
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
  ) {}

  async create(dto: CreateDisciplinaDto): Promise<Disciplina> {
    const existeCodigo = await this.disciplinaModel.findOne({ codigo: dto.codigo });
    if (existeCodigo) {
      throw new ConflictException('Já existe uma disciplina com esse código.');
    }

    const periodoExiste = await this.periodoLetivoModel.findById(dto.periodosLetivosID);
    if (!periodoExiste) {
      throw new NotFoundException('Período letivo informado não existe.');
    }

    const processoExiste = await this.processoModel.findById(dto.processoID);
    if (!processoExiste) {
      throw new NotFoundException('Processo informado não existe.');
    }

    const novaDisciplina = new this.disciplinaModel(dto);
    return novaDisciplina.save();
  }

   async createMany(dtos: CreateDisciplinaDto[]): Promise<Disciplina[]> {
  const codigos = dtos.map(a => a.codigo);

  const existentes = await this.disciplinaModel.find({ codigo: { $in: codigos } });
  if (existentes.length > 0) {
    const codigosExistentes = existentes.map(b => b.codigo).join(' | ');
    throw new ConflictException(`Já existem disciplinas com os seguintes códigos ->  ${codigosExistentes}`);
  }

  const documentos = await this.disciplinaModel.insertMany(dtos);
  return documentos.map(doc => doc.toObject());
  }

  async findAll(): Promise<Disciplina[]> {
    const disciplinas = await this.disciplinaModel.find();
    if (!disciplinas.length) {
      throw new NotFoundException('Nenhuma disciplina encontrada.');
    }
    return disciplinas;
  }

  async findById(id: string): Promise<Disciplina> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const disciplina = await this.disciplinaModel.findById(id);
    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada.');
    }
    return disciplina;
  }

  async update(id: string, dto: UpdateDisciplinaDto): Promise<Disciplina> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const atualizada = await this.disciplinaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizada) {
      throw new NotFoundException('Não foi possível atualizar: disciplina não encontrada.');
    }
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const deletada = await this.disciplinaModel.findByIdAndDelete(id);
    if (!deletada) {
      throw new NotFoundException('Disciplina não encontrada para exclusão.');
    }

    return { message: 'Disciplina excluída com sucesso.' };
  }

  async buscarProcesso(id: string): Promise<Disciplina> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

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
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const disciplina = await this.disciplinaModel
      .findById(id)
      .populate('periodosLetivosID')
      .lean();

    if (!disciplina) {
      throw new NotFoundException('Período letivo vinculado não encontrado.');
    }

    return disciplina;
  }
}
