import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from 'mongoose';

export type VinculoProfessorDocument = VinculoProfessor & Document & { _id: Types.ObjectId }

@Schema({ timestamps: true, collection: 'vinculo-professor' })
export class VinculoProfessor extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true })
  professorID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Processo', required: true })
  processoID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true })
  disciplinaID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true })
  turmaID: Types.ObjectId;
}

export const VinculoProfessorSchema = SchemaFactory.createForClass(VinculoProfessor);
