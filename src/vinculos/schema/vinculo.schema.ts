import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose'; 

export type VinculoDocument = HydratedDocument<Vinculo>;

@Schema({ timestamps: true })
export class Vinculo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true })
  disciplinaID: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true })
  turmaID: Types.ObjectId;

}

export const VinculoSchema = SchemaFactory.createForClass(Vinculo);