import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Processo, ProcessoDocument } from './schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosDocument } from '../periodos-letivos/schema/periodos-letivos.schema';
import { Turma, TurmaDocument } from 'src/turmas/schema/turmas.schema';
import { Disciplina, DisciplinaDocument } from 'src/disciplinas/schema/disciplinas.schema';
import { VinculoAluno, VinculoAlunoDocument } from 'src/vinculos/schema/vinculo-aluno-turma.schema';
import { VinculoProfessor, VinculoProfessorDocument } from 'src/vinculos/schema/vinculo-professor-turma.schema';
import { Usuario } from 'src/usuarios/schema/usuarios.schema';
import { PeriodosLetivos as PeriodosLetivosSQL } from '../periodos-letivos/entities/periodos-letivo.entity';
import { DataSource } from 'typeorm';
import { CreateProcessoDto } from './dto/create-processo.dto';

@Injectable()
export class ProcessosService {
  constructor(
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
    @InjectModel(Turma.name) private readonly turmaModel: Model<TurmaDocument>,
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
    @InjectModel(PeriodosLetivos.name) private readonly periodoLetivoModel: Model<PeriodosLetivosDocument>,
    @InjectModel(VinculoAluno.name) private readonly vinculoAlunoModel: Model<VinculoAlunoDocument>,
    @InjectModel(VinculoProfessor.name) private readonly vinculoProfessorModel: Model<VinculoProfessorDocument>,


    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateProcessoDto): Promise<Processo> {
    const { identificacao } = dto;

    const jaExiste = await this.processoModel.findOne({ identificacao });
    if (jaExiste) {
      throw new ConflictException('Já existe um processo com essa identificação.');
    }

    const novo = new this.processoModel(dto);

    try {
      return await novo.save();
    } catch (err) {

      throw new NotFoundException('Falha ao salvar o processo.');
    }
  }

  async find(): Promise<Processo[]> {
    const processos = await this.processoModel.find()

    if (!processos.length){
      throw new NotFoundException('Nenhum processo foi encontrado!')
    }

    return processos
  }

  async findById(_id: string): Promise<Processo> {
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException('ID inválido');
    }

    const processo = await this.processoModel.findById(_id);
    if (!processo) throw new NotFoundException('Processo não encontrado');

    return processo;
  }

  async concluirProcesso(_id: string): Promise<Processo> {
    const existeProcesso = await this.processoModel.findById(_id);
    if (!existeProcesso) {
      throw new NotFoundException('Processo não encontrado');
    }
    const atualizado = await this.processoModel.findByIdAndUpdate(
      _id,
      { status: 'CONCLUIDO', dataFim: new Date() },
      { new: true },
    );
    if (!atualizado) {
      throw new NotFoundException('Falha ao atualizar o processo');
    }

    return atualizado;
  }

  async abortarProcesso(_id: string): Promise<Processo> {
    const existeProcesso = await this.processoModel.findById(_id);
    if (!existeProcesso) {
      throw new NotFoundException('Processo não encontrado');
    }
    const atualizado = await this.processoModel.findByIdAndUpdate(
      _id,
      { status: 'ABORTADO', dataFim: new Date() },
      { new: true },
    );
    if (!atualizado) {
      throw new NotFoundException('Falha ao atualizar o processo');
    }

    return atualizado;
  }

    async buscarTudoById(processoID: string) {
    
    const processo = await this.processoModel.findById(processoID);
    if (!processo) throw new NotFoundException('Processo não encontrado');


    const disciplinas = await this.disciplinaModel.find({ processoID });

    const periodosLetivos = await this.periodoLetivoModel.find({ processoID });

    const usuarios = await this.usuarioModel.find({ processoID });

    const turmas = await this.turmaModel.find({ processoID });

    const alunos = await this.vinculoAlunoModel.find({ processoID });

    const professores = await this.vinculoProfessorModel.find({ processoID });

      return {
      processoID,
      disciplinas,
      periodosLetivos,
      usuarios,
      turmas,
      alunos,
      professores
    };
  }

  async apagarTudo(processoID: string): Promise<string> { // não usar !
  if (!Types.ObjectId.isValid(processoID)) {
    throw new NotFoundException('processoID inválido');
  }

  const processo = await this.processoModel.findById(processoID);
  if (!processo) {
    throw new NotFoundException('Processo não encontrado');
  }

  await Promise.all([
    this.vinculoAlunoModel.deleteMany({ processoID }),
    this.vinculoProfessorModel.deleteMany({ processoID }),
    this.usuarioModel.deleteMany({ processoID }),
    this.turmaModel.deleteMany({ processoID }),
    this.disciplinaModel.deleteMany({ processoID }),
    this.periodoLetivoModel.deleteMany({ processoID }),
  ]);

  await this.processoModel.findByIdAndDelete(processoID);

  return 'Dados deletados com sucesso. Todos os dados relacionados ao processo foram removidos.';
}

async migrarProcesso(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new NotFoundException('ID inválido.');
  }

  const processoMongo = await this.processoModel.findById(id);
  if (!processoMongo) {
    throw new NotFoundException('Processo não encontrado.');
  }

  const periodoMongo = await this.periodoLetivoModel.findOne({ processoID: id });
  if (!periodoMongo) {
    throw new NotFoundException('Período Letivo não encontrado para o processo.');
  }

  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {

    const periodoSQL = queryRunner.manager.create(PeriodosLetivosSQL, {
      identificacao: periodoMongo.identificacao,
      periodoLetivo: periodoMongo.periodoLetivo,
      dataInicial: periodoMongo.dataInicial,
      dataFim: periodoMongo.dataFim,
    });

    await queryRunner.manager.save(periodoSQL);

    await queryRunner.commitTransaction();

    await this.concluirProcesso(id);

    return await this.buscarTudoById(id);

  } catch (error) {
    await queryRunner.rollbackTransaction();
    await this.abortarProcesso(id)

    throw error;
  } finally {
    await queryRunner.release();
  }
}


}
