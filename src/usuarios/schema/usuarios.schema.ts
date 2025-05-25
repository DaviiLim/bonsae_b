import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UsuariosPerfilEnum } from '../enum/usuariosPerfil.enum';

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuarios' })
export class Usuario {

  @Prop({ required: true, enum: UsuariosPerfilEnum })
  perfil: UsuariosPerfilEnum;

  @Prop({ type: Types.ObjectId, ref: 'Processo', required: true })
  processoID: Types.ObjectId;

  @Prop()
  subperfil?: string;

  @Prop({ required: true })
  nome: string;

  @Prop()
  numeroOAB?: string;

  @Prop()
  seccionalOAB?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  matriculaIES?: string;

  @Prop()
  telefone?: string;

  @Prop({ unique: true })
  cpf?: string;

  @Prop({ required: true })
  senha: string;

  @Prop()
  periodoCurricular?: string;

  @Prop()
  observacoes?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);