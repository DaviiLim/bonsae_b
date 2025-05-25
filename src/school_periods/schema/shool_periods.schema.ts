import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolPeriodDocument = SchoolPeriod & Document;

@Schema({ 
  timestamps: true,
  collection: 'school_periods'
})
export class SchoolPeriod {
  @Prop({
    type: Number, 
    required: true,
    unique: true
  })
  identificacao: number;

  @Prop({ 
    type: String,
    required: true,
    trim: true,  
    enum: [
      '1º Semestre',
      '2º Semestre', 
      '1º Semestre - 1º Bimestre',
      '1º Semestre - 2º Bimestre',
      '2º Semestre - 1º Bimestre',
      '2º Semestre - 2º Bimestre'
    ]
  })
  periodoLetivo: string;

  @Prop({ 
    type: Date,  
    required: true
  })
  start_date: Date;

  @Prop({ 
    type: Date,  
    required: true
  })
  final_date: Date;
}

export const SchoolPeriodSchema = SchemaFactory.createForClass(SchoolPeriod);