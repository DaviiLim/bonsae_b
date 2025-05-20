import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema({ timestamps: true, collection: 'usuarios' })
export class Usuario {

  @Prop({ required: true })
  perfil: string;

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

  @Prop()
  cpf?: string;

  @Prop({ required: true })
  senha: string;

  @Prop()
  periodoCurricular?: string;

  @Prop()
  observacoes?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
