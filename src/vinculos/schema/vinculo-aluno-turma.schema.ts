import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type VinculoAlunoDocument = VinculoAluno & Document;

@Schema({ timestamps: true })
export class VinculoAluno extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true })
  alunoID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Processo', required: true })
  processoID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true })
  disciplinaID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true })
  turmaID: Types.ObjectId;
}

export const VinculoAlunoSchema = SchemaFactory.createForClass(VinculoAluno);
