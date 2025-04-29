import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Disciplina extends Document {
  @Prop({ required: true })
  codigo: string;

  @Prop({ required: true })
  nome: string;

  @Prop()
  cargaHoraria: number;

  @Prop()
  ementa: string;

  @Prop()
  curso: string;
}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);
