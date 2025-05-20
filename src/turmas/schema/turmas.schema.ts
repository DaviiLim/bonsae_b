import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Disciplina } from 'src/disciplinas/schema/disciplinas.schema';
import { Processo } from 'src/processos/entities/processo.entity';

export type TurmaDocument = Turma & Document;

@Schema({ timestamps: true, collection: 'turmas' })
export class Turma {
  @Prop({ required: true })
  codigoTurma: string;

  @Prop({ required: true })
  turno: string;

  @Prop({ type: Types.ObjectId, ref: Disciplina.name, required: true })
  disciplina: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Processo.name, required: true })
  processo: Types.ObjectId;
}

export const TurmaSchema = SchemaFactory.createForClass(Turma);