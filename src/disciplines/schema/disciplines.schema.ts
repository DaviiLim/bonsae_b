import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisciplineDocument = Discipline & Document;

@Schema({ timestamps: true })
export class Discipline {
  @Prop({ 
    type: Number,
    required: true
  })
  codigoDisciplina: number;

  @Prop({
    type: Number,
    required: true,
    unique: true
  })
  codigoTurma: number;

  @Prop({
    type: String,
    trim: true 
  })
  turno?: string;

  @Prop({
    type: String,
    trim: true, 
    lowercase: true
  })
  turma: string;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);