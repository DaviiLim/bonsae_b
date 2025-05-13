import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PeriodosLetivosDocument = PeriodosLetivos & Document;

@Schema({ timestamps: true, collection: 'academic_classes' })
export class PeriodosLetivos {
  
  @Prop({
    type: Types.ObjectId,
    trim: true
  })
  identificacao: Types.ObjectId;

}

export const PeriodosLetivosSchema = SchemaFactory.createForClass(PeriodosLetivos);
