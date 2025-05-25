import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisciplinaDocument = Disciplina & Document;


@Schema({ timestamps: true })
export class Disciplina {
  @Prop({required: true})
  periodoLetivoIdentificacao: string;
  
  @Prop()
  disciplina?: string;

  @Prop({required: true })
  codigoDaDisciplina: string;

  @Prop({required: true})
  dataInicial: Date;

  @Prop({required: true})
  dataFinal: Date;

  @Prop({required: true})
  categoria: String

  @Prop()
  periodoCurricular?: string

  @Prop()
  estado?: string;

  @Prop()
  campus?: string;
}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);
