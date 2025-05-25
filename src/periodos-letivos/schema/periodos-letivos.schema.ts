import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PeriodoLetivoDocument = PeriodoLetivo & Document;

@Schema({timestamps: true})
export class PeriodoLetivo {
  @Prop({required: true})
  periodoLetivo: string;

  @Prop({required: true})
  dataInicial: Date;

  @Prop({required: true})
  dataFinal: Date;
}

export const PeriodoLetivoSchema = SchemaFactory.createForClass(PeriodoLetivo);