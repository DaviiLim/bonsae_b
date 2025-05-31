import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateVinculoDto, CreateVinculosArrayDto } from './dto/create-vinculo.dto';
import { UpdateVinculoDto } from './dto/update-vinculo.dto';
import { Usuario } from 'src/usuarios/schema/usuarios.schema';
import { VinculoAluno, VinculoAlunoDocument } from './schema/vinculo-aluno-turma.schema';
import { VinculoProfessor, VinculoProfessorDocument } from './schema/vinculo-professor-turma.schema';
import { UsuariosPerfilEnum } from 'src/usuarios/enum/usuariosPerfil.enum';

@Injectable()
export class VinculosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
    @InjectModel(VinculoAluno.name) private readonly vinculoAlunoModel: Model<VinculoAlunoDocument>,
    @InjectModel(VinculoProfessor.name) private readonly vinculoProfessorModel: Model<VinculoProfessorDocument>,
  ) {}

  async create(dto: CreateVinculosArrayDto): Promise<(VinculoAlunoDocument | VinculoProfessorDocument)[]> {
  const { usuarios } = dto;

  if (!usuarios || usuarios.length === 0) {
    throw new BadRequestException('Nenhum vínculo foi informado.');
  }

  const resultados: (VinculoAlunoDocument | VinculoProfessorDocument)[] = [];

  for (const userDto of usuarios) {
    const { email, matriculaIES, disciplinaID, turmaID } = userDto;

    if (!email && !matriculaIES) {
      throw new BadRequestException('Informe pelo menos email ou matrículaIES.');
    }

    let usuario;

    if (matriculaIES) {
      usuario = await this.usuarioModel.findOne({ matriculaIES });
    }

    if (!usuario && email) {
      usuario = await this.usuarioModel.findOne({ email });
    }

    if (!usuario) {
      throw new NotFoundException(`Usuário com email ${email || ''} ou matrícula ${matriculaIES || ''} não encontrado.`);
    }

    if (!usuario.processoID) {
      throw new BadRequestException(`Usuário ${usuario.nome} não possui processo associado.`);
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

      const vinculo = await this.vinculoAlunoModel.create({
        alunoID: usuario._id,
        processoID: usuario.processoID,
        disciplinaID: disciplinaObjectId,
        turmaID: turmaObjectId,
      });

      resultados.push(vinculo);
    } else if (usuario.perfil === UsuariosPerfilEnum.PROFESSOR) {
      const vinculoExistente = await this.vinculoProfessorModel.findOne({
        professorID: usuario._id,
        disciplinaID: disciplinaObjectId,
        turmaID: turmaObjectId,
      });

      if (vinculoExistente) {
        throw new ConflictException(`O professor ${usuario.nome} já está vinculado à turma.`);
      }

      const vinculo = await this.vinculoProfessorModel.create({
        professorID: usuario._id,
        processoID: usuario.processoID,
        disciplinaID: disciplinaObjectId,
        turmaID: turmaObjectId,
      });

      resultados.push(vinculo);
    } else {
      throw new BadRequestException(`Perfil inválido para o usuário ${usuario.nome}`);
    }
  }

  return resultados;
}


  async findAll() {
  const alunos = await this.vinculoAlunoModel
    .find()
    .populate('alunoID') 
    .exec();

  const professores = await this.vinculoProfessorModel
    .find()
    .populate('professorID') 
    .exec();

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

  async buscarProcesso(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('ID inválido.');
  }

  const vinculoAluno = await this.vinculoAlunoModel
    .findById(id)
    .populate('processoID')
    .lean();

  if (vinculoAluno) {
    return vinculoAluno;
  }

  const vinculoProfessor = await this.vinculoProfessorModel
    .findById(id)
    .populate('processoID')
    .lean();

  if (vinculoProfessor) {
    return vinculoProfessor;
  }

  throw new NotFoundException('Vínculo não encontrado.');
}

  
}
