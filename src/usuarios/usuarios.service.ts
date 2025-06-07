import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Usuario, UsuarioDocument } from './schema/usuarios.schema';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Processo, ProcessoDocument } from 'src/processos/schema/processos.schema';
import { CreateUsuariosArrayDto } from './dto/create-usuario.dto';
import { PeriodosLetivos } from 'src/periodos-letivos/schema/periodos-letivos.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>,
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
  ) {}

  async createMany(dto: CreateUsuariosArrayDto): Promise<Usuario[]> {
  const { usuarios } = dto;

  const processoID = usuarios[0].processoID;

  const processoExiste = await this.processoModel.exists({ _id: processoID });
  if (!processoExiste) {
    throw new BadRequestException(`Processo ${processoID} não encontrado`);
  }

  const emails = usuarios.map((u) => u.email);
  const emailsDuplicados = await this.usuarioModel.find({
    email: { $in: emails },
  });

  if (emailsDuplicados.length > 0) {
    const emailsExistentes = emailsDuplicados.map((u) => u.email).join(' | ');
    throw new BadRequestException(`Os seguintes e-mails já estão em uso: ${emailsExistentes}`);
  }

  const usuariosParaInserir = usuarios.map((u) => ({
    ...u,
    email: u.email,
    cpf: u.cpf,
    senha: u.senha
  }));

  return await this.usuarioModel.insertMany(usuariosParaInserir, { ordered: true });
}

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.usuarioModel.find().lean();
    if (!usuarios.length) {
      throw new NotFoundException('Nenhum usuário encontrado.');
    }
    return usuarios;
  }

  async findById(id: string): Promise<Usuario> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const usuario = await this.usuarioModel.findById(id).lean();
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return usuario;
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const atualizado = await this.usuarioModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!atualizado) {
      throw new NotFoundException('Não foi possível atualizar: usuário não encontrado.');
    }
    return atualizado;
  }

  async delete(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const deletado = await this.usuarioModel.findByIdAndDelete(id);
    if (!deletado) {
      throw new NotFoundException('Usuário não encontrado para exclusão.');
    }

    return { message: 'Usuário excluído com sucesso.' };
  }

    async buscarProcesso(processoID: string): Promise<Usuario[]> {
      const processoExiste = await this.usuarioModel.find({processoID})
      if (!processoExiste){
        throw new BadRequestException('Processo não encontrado / não existe !')
      }

      return processoExiste;
    }
}
