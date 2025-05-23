import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schema/usuarios.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(

    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>,

  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.usuarioModel.findOne({ email: dto.email });
    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este e-mail.');
    }

    const novoUsuario = new this.usuarioModel(dto);
    return novoUsuario.save();
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.usuarioModel.find();
    if (!usuarios.length) {
      throw new NotFoundException('Nenhum usuário encontrado.');
    }
    return usuarios;
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return usuario;
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    const atualizado = await this.usuarioModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!atualizado) {
      throw new NotFoundException('Não foi possível atualizar: usuário não encontrado.');
    }
    return atualizado;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletado = await this.usuarioModel.findByIdAndDelete(id);
    if (!deletado) {
      throw new NotFoundException('Usuário não encontrado para exclusão.');
    }

    return { message: 'Usuário excluído com sucesso.' };
  }

  async buscarProcesso(id: string): Promise<Usuario> {
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
