import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Processo, ProcessoDocument } from './schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosDocument } from '../periodos-letivos/schema/periodos-letivos.schema';
import { Turma, TurmaDocument } from 'src/turmas/schema/turmas.schema';
import { Disciplina, DisciplinaDocument } from 'src/disciplinas/schema/disciplinas.schema';
import { VinculoAluno, VinculoAlunoDocument } from 'src/vinculos/schema/vinculo-aluno-turma.schema';
import { VinculoProfessor, VinculoProfessorDocument } from 'src/vinculos/schema/vinculo-professor-turma.schema';
import { Usuario, UsuarioDocument } from 'src/usuarios/schema/usuarios.schema';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { School_Periods } from 'src/periodos-letivos/entities/periodos-letivo.entity';
import { migrarDisciplinas, migrarPeriodoLetivo, migrarTurmas, migrarUsuarios, migrarVinculos } from './migracao';
import { InjectRepository } from '@nestjs/typeorm';
import { Disciplines } from 'src/turmas/entities/turma.entity';
import { User } from 'src/usuarios/entities/usuario.entity';
import { DisciplineUser } from 'src/vinculos/entities/vinculo.entity';
import { Vinculo, VinculoDocument } from 'src/vinculos/schema/vinculo.schema';


@Injectable()
export class ProcessosService {
  constructor(
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,

    @InjectModel(Turma.name) private readonly turmaModel: Model<TurmaDocument>,
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>, 
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
    @InjectModel(PeriodosLetivos.name) private readonly periodoLetivoModel: Model<PeriodosLetivosDocument>,
    @InjectModel(VinculoAluno.name) private readonly vinculoAlunoModel: Model<VinculoAlunoDocument>,
    @InjectModel(VinculoProfessor.name) private readonly vinculoProfessorModel: Model<VinculoProfessorDocument>,
    @InjectModel(Vinculo.name) private readonly vinculoModel: Model<VinculoDocument>,
    
    @InjectRepository(School_Periods)private readonly schoolPeriodsRepo: Repository<School_Periods>,
    @InjectRepository(AcademicClasses)private readonly academicClassesRepo: Repository<AcademicClasses>,

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

async apagarTudo(processoID: string): Promise<string> { 
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

async migrarProcesso(processoID: string) {
  const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    if (!mongoose.Types.ObjectId.isValid(processoID)) {
      throw new Error('processoID inválido');
    }

    console.log(`Iniciando migração para processoID: ${processoID}`);

    const periodoLetivoIdMap = await migrarPeriodoLetivo(
      processoID,
      this.periodoLetivoModel,
      queryRunner.manager.getRepository(School_Periods),
    );
    console.log(`Períodos Letivos migrados. Total: ${periodoLetivoIdMap.size}`);

    const disciplinaIdMap = await migrarDisciplinas(
      processoID,
      this.disciplinaModel,
      queryRunner.manager.getRepository(AcademicClasses),
      periodoLetivoIdMap,
    );
    console.log(`Disciplinas migradas. Total: ${disciplinaIdMap.size}`);

    const periodoLetivoParaTurmasId = Array.from(periodoLetivoIdMap.values())[0];
    if (!periodoLetivoParaTurmasId) {
      throw new Error('Nenhum ID de período letivo encontrado no mapa para associar às turmas.');
    }
    console.log(`Usando Período Letivo Principal ID para turmas: ${periodoLetivoParaTurmasId}`);

    const turmaIdMap = await migrarTurmas(
      processoID,
      this.turmaModel,
      queryRunner.manager.getRepository(Disciplines),
      disciplinaIdMap,
      periodoLetivoParaTurmasId,
    );
    console.log(`Turmas migradas. Total: ${turmaIdMap.size}`);

    const usuarioIdMap = await migrarUsuarios(
      processoID,
      this.usuarioModel,
      queryRunner.manager.getRepository(User),
    );
    console.log(`Usuários migrados. Total: ${usuarioIdMap.size}`);

    // Buscar vínculos diretamente
    const vinculoProfessorDocs = await this.vinculoProfessorModel.find({ processoID });
    const vinculoAlunoDocs = await this.vinculoAlunoModel.find({ processoID });
    console.log(`Vínculos encontrados: Professores = ${vinculoProfessorDocs.length}, Alunos = ${vinculoAlunoDocs.length}`);

    // Migrar vínculos
    const vinculoIdMap = await migrarVinculos(
      vinculoAlunoDocs,
      vinculoProfessorDocs,
      queryRunner.manager.getRepository(DisciplineUser),
      usuarioIdMap,
      disciplinaIdMap,
      turmaIdMap,
    );
    console.log(`Vínculos (professor e aluno) migrados para o SQL. Total: ${vinculoIdMap.size}`);

    // Concluir migração
    await queryRunner.commitTransaction();
    await this.concluirProcesso(processoID);
    console.log(`Migração para processoID: ${processoID} concluída com sucesso!`);

    return { message: 'Migração concluída com sucesso', processoID };

  } catch (error) {
    await queryRunner.rollbackTransaction();
    await this.abortarProcesso(processoID);
    console.error('--- ERRO DURANTE A MIGRAÇÃO DO PROCESSO ---');
    console.error('ProcessoID:', processoID);
    console.error('Mensagem de Erro:', error.message);
    throw error;
  } finally {
    await queryRunner.release();
    console.log(`Recursos para processoID: ${processoID} liberados.`);
  }
}


}





