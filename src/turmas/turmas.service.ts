import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Turma, TurmaDocument } from './schema/turmas.schema';
import { CreateTurmaArrayDto, CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Processo, ProcessoDocument } from 'src/processos/schema/processos.schema';
import { Disciplina, DisciplinaDocument } from 'src/disciplinas/schema/disciplinas.schema';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class TurmasService {
  constructor(
    
    @InjectModel(Turma.name) private readonly turmaModel: Model<TurmaDocument>,
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>

  ) {}

async createMany(dto: CreateTurmaArrayDto): Promise<Turma[]> {
  const { turmas } = dto;

  const processoID = turmas[0].processoID;
  const disciplinaCodigo = turmas[0].disciplinaCodigo;

  const processoExiste = await this.processoModel.exists({ _id: processoID });
  if (!processoExiste) {
    throw new BadRequestException(`Processo ${processoID} não encontrado`);
  }

  const disciplinaExiste = await this.disciplinaModel.exists({ _id: disciplinaCodigo });
  if (!disciplinaExiste) {
    throw new BadRequestException(`Disciplina ${disciplinaCodigo} não encontrada`);
  }

  const codigos = turmas.map((t) => t.codigo);
  const codigosDuplicados = await this.turmaModel.find({
    codigo: { $in: codigos },
  });

  if (codigosDuplicados.length > 0) {
    const codigosExistentes = codigosDuplicados.map((t) => t.codigo).join(' | ');
    throw new BadRequestException(`Os seguintes códigos de turma já existem: ${codigosExistentes}`);
  }

  const turmasParaInserir = turmas.map((t) => ({
    ...t,
    codigo: t.codigo,
  }));

  return await this.turmaModel.insertMany(turmasParaInserir, { ordered: true });
}

  async findAll(): Promise<Turma[]> {
    const turmas = await this.turmaModel.find();
    if (!turmas.length) {
      throw new NotFoundException('Nenhuma turma encontrada.');
    }
    return turmas;
  }

  async findById(id: string): Promise<Turma> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const turma = await this.turmaModel.findById(id);
    if (!turma) {
      throw new NotFoundException('Turma não encontrada.');
    }
    return turma;
  }

  async update(id: string, dto: UpdateTurmaDto): Promise<Turma> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const atualizada = await this.turmaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizada) {
      throw new NotFoundException('Não foi possível atualizar: turma não encontrada.');
    }
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const deletada = await this.turmaModel.findByIdAndDelete(id);
    if (!deletada) {
      throw new NotFoundException('Turma não encontrada para exclusão.');
    }

    return { message: 'Turma excluída com sucesso.' };
  }

  async bsucarProcesso(processoID: string): Promise<Turma[]> {
  return await this.turmaModel.find({ processoID })
}

  async buscarDisciplina(id: string): Promise<Turma> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const turma = await this.turmaModel
      .findById(id)
      .populate('disciplinaCodigo')
      .lean();

    if (!turma) {
      throw new NotFoundException('Disciplina vinculada não encontrada.');
    }

    return turma;
  }
}
