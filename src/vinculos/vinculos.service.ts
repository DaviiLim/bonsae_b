  import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, Types } from 'mongoose';
  import { CreateVinculoDto, CreateVinculosArrayDto } from './dto/create-vinculo.dto';
  import { UpdateVinculoDto } from './dto/update-vinculo.dto';
  import { Usuario } from 'src/usuarios/schema/usuarios.schema';
  import { VinculoAluno, VinculoAlunoDocument } from './schema/vinculo-aluno-turma.schema';
  import { VinculoProfessor, VinculoProfessorDocument } from './schema/vinculo-professor-turma.schema';
  import { UsuariosPerfilEnum } from 'src/usuarios/enum/usuariosPerfil.enum';
import { Processo, ProcessoDocument } from 'src/processos/schema/processos.schema';
import { Turma, TurmaDocument } from 'src/turmas/schema/turmas.schema';
import { Disciplina, DisciplinaDocument } from 'src/disciplinas/schema/disciplinas.schema';

  @Injectable()
  export class VinculosService {
    constructor(
      @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
      @InjectModel(VinculoAluno.name) private readonly vinculoAlunoModel: Model<VinculoAlunoDocument>,
      @InjectModel(VinculoProfessor.name) private readonly vinculoProfessorModel: Model<VinculoProfessorDocument>,
      @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
      @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
      @InjectModel(Turma.name) private readonly turmaModel: Model<TurmaDocument>,
    ) {}

  async create(dto: CreateVinculosArrayDto) {
  const { processoID, vinculos } = dto;

  if (!vinculos || vinculos.length === 0) {
    throw new BadRequestException('Nenhum vínculo foi informado.');
  }

 
  const processo = await this.processoModel.findById(processoID);
  if (!processo) {
    throw new NotFoundException(`Processo com ID ${processoID} não encontrado.`);
  }

  const resultados: (VinculoAlunoDocument | VinculoProfessorDocument)[] = [];

  for (const vinculoDTO of vinculos) {
    const { email, matriculaIES, disciplinaID, turmaID } = vinculoDTO;

    if (!email && !matriculaIES) {
      throw new BadRequestException('Informe pelo menos o email ou a matrícula IES.');
    }

    let usuario;

    if (email) {
      usuario = await this.usuarioModel.findOne({ email });
    }

    if (!usuario && matriculaIES) {
      usuario = await this.usuarioModel.findOne({ matriculaIES });
    }

    if (!usuario) {
      throw new NotFoundException(`Usuário com email "${email || ''}" ou matrícula "${matriculaIES || ''}" não encontrado.`);
    }

    if (!Types.ObjectId.isValid(disciplinaID)) {
      throw new BadRequestException(`ID de disciplina inválido: ${disciplinaID}`);
    }

    if (!Types.ObjectId.isValid(turmaID)) {
      throw new BadRequestException(`ID de turma inválido: ${turmaID}`);
    }

    const disciplina = await this.disciplinaModel.findById(disciplinaID);
    if (!disciplina) {
      throw new NotFoundException(`Disciplina com ID ${disciplinaID} não encontrada.`);
    }

    const turma = await this.turmaModel.findById(turmaID);
    if (!turma) {
      throw new NotFoundException(`Turma com ID ${turmaID} não encontrada.`);
    }

    const disciplinaObjectId = new Types.ObjectId(disciplinaID);
    const turmaObjectId = new Types.ObjectId(turmaID);

    if (usuario.perfil === UsuariosPerfilEnum.ALUNO) {
      const vinculoExistente = await this.vinculoAlunoModel.findOne({
        alunoID: usuario._id,
        disciplinaID: disciplinaObjectId,
        turmaID: turmaObjectId,
      });

      if (vinculoExistente) {
        throw new ConflictException(`O aluno ${usuario.nome} já está vinculado à turma.`);
      }

      const novoVinculo = await this.vinculoAlunoModel.create({
        alunoID: usuario._id,
        processoID: new Types.ObjectId(processoID),
        disciplinaID: disciplinaObjectId,
        turmaID: turmaObjectId,
      });

      resultados.push(novoVinculo);
    } else if (usuario.perfil === UsuariosPerfilEnum.PROFESSOR) {
      const vinculoExistente = await this.vinculoProfessorModel.findOne({
        professorID: usuario._id,
        disciplinaID: disciplinaObjectId,
        turmaID: turmaObjectId,
      });

      if (vinculoExistente) {
        throw new ConflictException(`O professor ${usuario.nome} já está vinculado à turma.`);
      }

      const novoVinculo = await this.vinculoProfessorModel.create({
        professorID: usuario._id,
        processoID: new Types.ObjectId(processoID),
        disciplinaID: disciplinaObjectId,
        turmaID: turmaObjectId,
      });

      resultados.push(novoVinculo);
    } else {
      throw new BadRequestException(`Perfil inválido para o usuário ${usuario.nome}.`);
    }
  }

  return resultados;
  }

    async findAll() {
    const alunos = await this.vinculoAlunoModel
      .find()

    const professores = await this.vinculoProfessorModel
      .find()

    if (!alunos.length && !professores.length) {
      throw new NotFoundException('Nenhum vínculo encontrado.');
    }

    return { alunos, professores };
  }


    async findById(id: string) {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID inválido.');
      }

      let vinculo = await this.vinculoAlunoModel.findById(id);
      if (vinculo) return { tipo: 'aluno', vinculo };

      vinculo = await this.vinculoProfessorModel.findById(id);
      if (vinculo) return { tipo: 'professor', vinculo };

      throw new NotFoundException('Vínculo não encontrado.');
    }

  async update(id: string, dto: UpdateVinculoDto) {

      if (!Types.ObjectId.isValid(id)) {
          throw new BadRequestException('ID inválido');
      }

      const alunoAtualizado = await this.vinculoAlunoModel.findByIdAndUpdate(
          id,
          { $set: dto },
          { new: true }
      );

      if (alunoAtualizado) {
          return alunoAtualizado;
      }


      const professorAtualizado = await this.vinculoProfessorModel.findByIdAndUpdate(
          id,
          { $set: dto },
          { new: true }
      );

      if (professorAtualizado) {
          return professorAtualizado;
      }

      throw new NotFoundException('Vínculo não encontrado');
  }

    async delete(id: string) {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID inválido.');
      }

      let excluido = await this.vinculoAlunoModel.findByIdAndDelete(id);
      if (excluido) {
        return { message: 'Vínculo de aluno excluído com sucesso.' };
      }

      excluido = await this.vinculoProfessorModel.findByIdAndDelete(id);
      if (excluido) {
        return { message: 'Vínculo de professor excluído com sucesso.' };
      }

      throw new NotFoundException('Vínculo não encontrado para exclusão.');
    }

    async buscarProcessoAluno(processoID: string): Promise<VinculoAluno[]> {
      const processoExiste = await this.vinculoAlunoModel.find({processoID})
      if (!processoExiste){
        throw new BadRequestException('Processo não encontrado / não existe !')
      }

      return processoExiste;
    }

    async buscarProcessoProfessor(processoID: string): Promise<VinculoProfessor[]> {
      const processoExiste = await this.vinculoProfessorModel.find({processoID})
      if (!processoExiste){
        throw new BadRequestException('Processo não encontrado / não existe !')
      }

      return processoExiste;
    }

  async buscarProcesso(processoID: string) {
  const [alunos, professores] = await Promise.all([
    this.vinculoAlunoModel.find({ processoID: processoID }).exec(), // Note processoID aqui
    this.vinculoProfessorModel.find({ processoID: processoID }).exec() // E aqui
  ]);

  const resultado = [...alunos, ...professores];

  if (resultado.length === 0) {
    throw new NotFoundException(`Nenhum vínculo encontrado para o processo ${processoID}.`);
  }

  return resultado;
}
    
  }
