import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  perfil: string;

  @Prop({
    type: String,
    trim: true,
  })
  subperfil?: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  nome: string;

  @Prop({
    type: String,
    trim: true,
  })
  nDaOab?: string;

  @Prop({
    type: String,
    trim: true,
  })
  seccionalUfOab?: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  eMail: string;

  @Prop({
    type: String,
    trim: true,
  })
  matriculaIes?: string;

  @Prop({
    type: String,
    trim: true,
  })
  telefone?: string;

  @Prop({
    type: String,
    trim: true,
  })
  cpf?: string;

  @Prop({
    type: String,
    required: true,
    trim: true
  })
  senha: string;

  @Prop({
    type: String,
    trim: true,
  })
  periodoCurricular?: string;

  @Prop({
    type: String,
    trim: true,
  })
  observacoes?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
