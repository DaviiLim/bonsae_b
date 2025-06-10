import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProcessosStatusEnum } from '../enum/processosStatus.enum';

export type ProcessoDocument = Processo & Document & { _id: Types.ObjectId }

@Schema({collection: 'processos' })
export class Processo {
  @Prop({ required: true, unique: true })
  identificacao: string; 

  @Prop({
    type: String,
    enum: ProcessosStatusEnum,
    default: ProcessosStatusEnum.EM_ANDAMENTO,
  })
  status: string;

  @Prop({ default: Date.now })
  dataInicio: Date;

  @Prop()
  dataFim?: Date;
}

export const ProcessoSchema = SchemaFactory.createForClass(Processo);