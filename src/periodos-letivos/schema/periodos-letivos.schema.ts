import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PeriodosLetivosDocument = PeriodosLetivos & Document;

@Schema({ timestamps: true, collection: 'academic_classes' })
export class PeriodosLetivos {
  
  @Prop({ 
    required: true,
    
  })
  identificacao: string; 

  @Prop({ required: true })
  periodoLetivo: string;

  @Prop({ required: true })
  dataInicio: Date;

  @Prop({ required: true })
  dataFim: Date;

}

export const PeriodosLetivosSchema = SchemaFactory.createForClass(PeriodosLetivos);
