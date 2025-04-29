import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AcademicClassDocument = AcademicClasses & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class AcademicClasses {

  @Prop()
  school_period_id: string;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  category: string;

  @Prop()
  course: string;

  @Prop({ default: true })
  active?: boolean;

  @Prop({ default: false })
  is_exceptional?: boolean;

  @Prop()
  period: string;

  @Prop()
  campus_id: string;

  @Prop()
  integration?: string;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;
}

export const AcademicClassSchema = SchemaFactory.createForClass(AcademicClasses);
