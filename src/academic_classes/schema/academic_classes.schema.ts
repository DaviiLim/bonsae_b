import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AcademicClassDocument = AcademicClasses & Document;

@Schema({ timestamps: true })
export class AcademicClasses {
  @Prop({ 
    type: Number,
    required: true
  })
  periodoLetivoIdentificacao: number;

  @Prop({
    type: String,
    required: true,
    trim: true 
  })
  disciplina: string;

  @Prop({ 
    type: Number,
    required: true
  })
  codigoDisciplina: number;

  @Prop({ 
    type: Date,
    required: true
  })
  dataInicial: Date;

  @Prop({ 
    type: Date,
    required: true
  })
  dataFinal: Date;

  @Prop({
    type: String,
    required: true,
    trim: true 
  })
  categoria: string;

  @Prop({
    type: String,
    trim: true
  })
  periodoCurricular?: string;

  @Prop({
    type: String,
    trim: true 
  })
  estado?: string;

  @Prop({
    type: String,
    trim: true
  })
  campus?: string;
}

export const AcademicClassSchema = SchemaFactory.createForClass(AcademicClasses);