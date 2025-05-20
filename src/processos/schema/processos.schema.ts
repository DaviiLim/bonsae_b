import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProcessosStatusEnum } from '../enum/processosStatus.enum';

export type ProcessoDocument = Processo & Document;

@Schema({ timestamps: true, collection: 'processos' })
export class Processo {
  @Prop({ required: true, unique: true })
  processoID: string; 

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