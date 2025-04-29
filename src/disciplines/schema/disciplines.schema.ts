import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisciplineDocument = Discipline & Document;

@Schema({ timestamps: true })
export class Discipline {
  @Prop({ required: true })
  school_period_id: string;

  @Prop({ required: true })
  academic_class_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  shift: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  is_exceptional: boolean;

  @Prop()
  integration?: string;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);
