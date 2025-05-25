import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Usuario, UsuarioDocument } from './schema/usuarios.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Processo, ProcessoDocument } from 'src/processos/schema/processos.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>,
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    if (!dto.processoID) {
      throw new ConflictException('processoID é obrigatório.');
    }

    const usuarioExistente = await this.usuarioModel.findOne({ email: dto.email });
    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este e-mail.');
    }

    const processoExiste = await this.processoModel.findById(dto.processoID);
    if (!processoExiste) {
      throw new NotFoundException('Processo informado não existe.');
    }

    const novoUsuario = new this.usuarioModel(dto);
    return novoUsuario.save();
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

  async buscarProcesso(id: string): Promise<Usuario> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const usuario = await this.usuarioModel
      .findById(id)
      .populate('processoID')
      .lean();

    if (!usuario) {
      throw new NotFoundException('Processo vinculado não encontrado.');
    }

    return usuario;
  }
}
