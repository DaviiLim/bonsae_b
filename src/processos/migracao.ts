import { DeepPartial, Repository } from 'typeorm';
import { Types, Model } from 'mongoose';

import { PeriodosLetivosDocument } from '../periodos-letivos/schema/periodos-letivos.schema';
import { DisciplinaDocument } from '../disciplinas/schema/disciplinas.schema';
import { TurmaDocument } from '../turmas/schema/turmas.schema';
import { UsuarioDocument } from '../usuarios/schema/usuarios.schema';
import { VinculoDocument } from '../vinculos/schema/vinculo.schema';

import { School_Periods } from '../periodos-letivos/entities/periodos-letivo.entity';
import { AcademicClasses } from '../disciplinas/entities/disciplina.entity';
import { Disciplines } from '../turmas/entities/turma.entity';
import { User } from '../usuarios/entities/usuario.entity';
import { DisciplineUser } from '../vinculos/entities/vinculo.entity';

import { DisciplinasEstadoEnum } from '../disciplinas/enum/disciplinasEstado.enum';
import { TurmasTurnoEnum } from '../turmas/enum/turmasTurno.enum';

// MIGRAR PERÍODOS
export async function migrarPeriodoLetivo(
  processoID: string,
  mongoModel: Model<PeriodosLetivosDocument>,
  sqlRepo: Repository<School_Periods>,
): Promise<Map<string, number>> {
  const periodos = await mongoModel.find({ processoID });
  const idMap = new Map<string, number>();

  for (const periodo of periodos) {
    const dto: DeepPartial<School_Periods> = {
      identificacao: periodo.identificacao,
      periodoLetivo: periodo.periodoLetivo,
      dataInicial: periodo.dataInicial,
      dataFim: periodo.dataFim,
    };

    const saved = await sqlRepo.save(dto);
    const mongoId = (periodo._id as Types.ObjectId).toString();
    idMap.set(mongoId, saved.id);
  }

  return idMap;
}

// MIGRAR DISCIPLINAS
export async function migrarDisciplinas(
  processoID: string,
  mongoModel: Model<DisciplinaDocument>,
  sqlRepo: Repository<AcademicClasses>,
  periodoLetivoIdMap: Map<string, number>,
): Promise<Map<string, number>> {
  const disciplinas = await mongoModel.find({ processoID });
  const idMapDisciplinas = new Map<string, number>();

  for (const doc of disciplinas) {
    const periodoLetivoMongoId = (doc.periodoLetivoID as Types.ObjectId).toString();
    const novoPeriodoLetivoId = periodoLetivoIdMap.get(periodoLetivoMongoId);

    if (!novoPeriodoLetivoId) {
      throw new Error(`ID de período letivo Mongo '${periodoLetivoMongoId}' não encontrado no mapa para a disciplina '${doc.nome}'.`);
    }

    const dto: DeepPartial<AcademicClasses> = {
      nome: doc.nome,
      codigo: doc.codigo,
      dataInicial: doc.dataInicial,
      dataFim: doc.dataFim,
      categoria: doc.categoria,
      periodoCurricular: doc.periodoCurricular,
      estado: doc.estado as DisciplinasEstadoEnum,
      campus: doc.campus !== undefined ? String(doc.campus) : undefined,
      periodoLetivo: { id: novoPeriodoLetivoId },
      isExceptional: 0,
      integration: undefined,
    };

    const saved = await sqlRepo.save(dto);
    idMapDisciplinas.set((doc._id as Types.ObjectId).toString(), saved.id);
  }

  return idMapDisciplinas;
}

// MIGRAR TURMAS
export async function migrarTurmas(
  processoID: string,
  mongoModel: Model<TurmaDocument>,
  sqlRepo: Repository<Disciplines>,
  disciplinaIdMap: Map<string, number>,
  periodoLetivoPrincipalId: number,
): Promise<Map<string, number>> {
  const turmas = await mongoModel.find({ processoID });
  const idMapTurmas = new Map<string, number>();

  for (const doc of turmas) {
    const disciplinaMongoId = (doc.disciplinaCodigo as Types.ObjectId).toString();
    const novoDisciplinaId = disciplinaIdMap.get(disciplinaMongoId);

    if (!novoDisciplinaId) {
      throw new Error(`Disciplina com ID Mongo '${disciplinaMongoId}' não encontrada no mapa para a turma '${doc.turma}'.`);
    }

    const dto: DeepPartial<Disciplines> = {
      academic_class_id: novoDisciplinaId,
      school_period_id: periodoLetivoPrincipalId,
      turma: doc.turma,
      codigo: doc.codigo,
      turno: doc.turno as TurmasTurnoEnum,
      estado: DisciplinasEstadoEnum.ATIVA,
      isExceptional: 0,
      integration: undefined,
    };

    const saved = await sqlRepo.save(dto);
    idMapTurmas.set((doc._id as Types.ObjectId).toString(), saved.id);
  }

  return idMapTurmas;
}

// MIGRAR USUÁRIOS 
export async function migrarUsuarios(
  processoID: string,
  mongoModel: Model<UsuarioDocument>,
  sqlRepo: Repository<User>,
): Promise<Map<string, number>> {
  const usuarios = await mongoModel.find({ processoID });
  const idMap = new Map<string, number>();

  for (const user of usuarios) {
    const dto: DeepPartial<User> = {
      perfil: user.perfil,
      subperfil: user.subperfil,
      nome: user.nome,
      matriculaIES: user.matriculaIES,
      email: user.email,
      telefone: user.telefone,
      senha: user.senha,
      cpf: user.cpf,
      numeroOAB: user.numeroOAB,
      seccionalOAB: user.seccionalOAB,
      observacoes: user.observacoes,
      periodoCurricular: user.periodoCurricular,
      ip: '8.8.8.8',
    };

    const saved = await sqlRepo.save(dto);
    idMap.set((user._id as Types.ObjectId).toString(), saved.id);
  }

 return idMap;
}


type VinculoNormalizado = {
  usuarioID: string;
  disciplinaID: string;
  turmaID: string;
};

export async function migrarVinculos(
  vinculoAlunoDocs: any[],
  vinculoProfessorDocs: any[],
  sqlRepo: Repository<DisciplineUser>,
  usuarioIdMap: Map<string, number>,
  disciplinaIdMap: Map<string, number>,
  turmaIdMap: Map<string, number>,
): Promise<Map<string, number>> {
  const idMapVinculos = new Map<string, number>();

  const todosOsVinculos: VinculoNormalizado[] = [
    ...vinculoAlunoDocs.map((v: any) => ({
      usuarioID: v.alunoID.toString(),
      disciplinaID: v.disciplinaID.toString(),
      turmaID: v.turmaID.toString(),
    })),
    ...vinculoProfessorDocs.map((v: any) => ({
      usuarioID: v.professorID.toString(),
      disciplinaID: v.disciplinaID.toString(),
      turmaID: v.turmaID.toString(),
    })),
  ];

  for (const vinculo of todosOsVinculos) {
    const { usuarioID: usuarioMongoID, disciplinaID: disciplinaMongoID, turmaID: turmaMongoID } = vinculo;

    const usuarioID = usuarioIdMap.get(usuarioMongoID);
    const disciplinaID = disciplinaIdMap.get(disciplinaMongoID);
    const turmaID = turmaIdMap.get(turmaMongoID);

    if (!usuarioID || !disciplinaID || !turmaID) {
      throw new Error([
        'Erro ao migrar vínculo: mapeamento ausente.',
        `  UsuarioID Mongo: ${usuarioMongoID} → SQL: ${usuarioID ?? 'NÃO ENCONTRADO'}`,
        `  DisciplinaID Mongo: ${disciplinaMongoID} → SQL: ${disciplinaID ?? 'NÃO ENCONTRADO'}`,
        `  TurmaID Mongo: ${turmaMongoID} → SQL: ${turmaID ?? 'NÃO ENCONTRADO'}`,
      ].join('\n'));
    }

    const dto: DeepPartial<DisciplineUser> = {
      user_id: usuarioID,
      discipline_id: disciplinaID,
      team_id: turmaID,
    };

    const saved = await sqlRepo.save(dto);
    idMapVinculos.set(`${usuarioMongoID}-${disciplinaMongoID}-${turmaMongoID}`, saved.id);
  }

  return idMapVinculos;
}



