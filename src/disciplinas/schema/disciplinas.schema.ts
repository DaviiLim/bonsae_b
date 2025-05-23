import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DisciplinasCategoriaEnum } from '../enum/disciplinasCategoria.enum';
import { DisciplinasEstadoEnum } from '../enum/disciplinasEstado.enum';
import mongoose, { Types } from 'mongoose';

export type DisciplinaDocument = Disciplina & Document;

@Schema({ collection: 'disciplinas' })
export class Disciplina {

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PeriodosLetivos' }] })
  periodosLetivosID: Types.ObjectId[];


  @Prop({ type: Types.ObjectId, ref: 'Processo', required: true })
  processoID: Types.ObjectId;

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

  @Prop({ 
    enum: DisciplinasEstadoEnum,
    default: DisciplinasEstadoEnum.ATIVA
   })
  estado?: string;

  @Prop()
  campus?: string;
}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);
