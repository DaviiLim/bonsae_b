import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolPeriodDocument = SchoolPeriod & Document;

@Schema({ timestamps: true }) // createdA - updatedAt 
export class SchoolPeriod {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  school_period: string;

  @Prop({ type: Date, required: true })
  start_date: Date;

  @Prop({ type: Date, required: true })
  final_date: Date;

  @Prop({ type: Date, default: null }) // deleted_at
  deleted_at?: Date;
}

export const SchoolPeriodSchema = SchemaFactory.createForClass(SchoolPeriod);
