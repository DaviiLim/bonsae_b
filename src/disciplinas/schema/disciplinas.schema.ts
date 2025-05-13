import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DisciplinasCategoriaEnum } from '../enum/disciplinasCategoria.enum';
import { DisciplinasEstadoEnum } from '../enum/disciplinasEstado.enum';
import mongoose, { Types } from 'mongoose';
import { PeriodosLetivos } from 'src/periodos-letivos/schema/periodos-letivos.schema';

export type DisciplinaDocument = Disciplina & Document;

@Schema({ timestamps: true, collection: 'disciplinas' })
export class Disciplina {

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PeriodosLetivos' }] })
  periodosLetivos: PeriodosLetivos[];


  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  codigo: string;

  @Prop({ required: true })
  dataInicial: Date;

  @Prop({
  required: true,
  validate: {
    validator: 
    function (value) {
    return value > this.dataInicial;
    },
    message: 'Data final deve ser após a data inicial.',
  },
})
dataFim: Date;

  @Prop({ 
    required: true,
    enum: DisciplinasCategoriaEnum
  })
  categoria: string;

  @Prop()
  periodoCurricular?: string;

  @Prop( { 
    enum: DisciplinasEstadoEnum,
    default: DisciplinasEstadoEnum.INATIVA
   } )
  estado?: string;

  @Prop()
  campus?: string;
}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);
