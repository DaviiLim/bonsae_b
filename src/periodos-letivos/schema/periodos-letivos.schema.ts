import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PeriodosLetivosDocument = PeriodosLetivos & Document;

@Schema({ timestamps: true, collection: 'periodos-letivos' })
export class PeriodosLetivos {
  
  @Prop({ required: true, unique: true })
  identificacao: string;

  @Prop({ type: Types.ObjectId, ref: 'Processo', required: true })
  processoID: Types.ObjectId;

  @Prop({ required: true })
  periodoLetivo: string;

  @Prop({ required: true })
  dataInicial: Date;

@Prop({
  required: true,
  validate: {
    validator: function (value) {
      return value > this.dataInicial;
    },
    message: 'Data final deve ser após a data inicial.',
  },
  })
  dataFim: Date;
}

export const PeriodosLetivosSchema = SchemaFactory.createForClass(PeriodosLetivos);
