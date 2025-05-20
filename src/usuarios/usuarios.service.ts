import { ConflictException,Injectable,NotFoundException } from '@nestjs/common';
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
    const jaExiste = await this.usuarioModel.findOne({ email: dto.email });
    if (jaExiste) {
      throw new ConflictException('ERROR - Já existe um usuário com esse e-mail');
    }

    const novoUsuario = new this.usuarioModel(dto);
    return novoUsuario.save();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find();
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) {
      throw new NotFoundException('ERROR - Usuário não encontrado!');
    }
    return usuario;
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    const atualizado = await this.usuarioModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!atualizado) {
      throw new NotFoundException('ERROR - Usuário não foi atualizado/encontrado!');
    }
    return atualizado;
  }

  async delete(id: string): Promise<{ message: string }> {
    const resultado = await this.usuarioModel.findByIdAndDelete(id);
    if (!resultado) {
      throw new NotFoundException('ERROR - Usuário não encontrado!');
    }

    return { message: 'Usuário excluído com sucesso.' };
  }
}
