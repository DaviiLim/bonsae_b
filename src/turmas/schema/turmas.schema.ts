import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TurmasTurnoEnum } from "../enum/turmasTurno.enum";
import { Types } from "mongoose";

export type TurmaDocument = Turma & Document;

@Schema({ collection: 'turmas' })
export class Turma {
  
  @Prop({ type: Types.ObjectId, ref: 'Disciplina', required: true })
  disciplinaCodigo: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Processo', required: true })
  processoID: Types.ObjectId;

  @Prop( {enum: TurmasTurnoEnum} )
  turno?: TurmasTurnoEnum;

  @Prop( {required: true} )
  turma: string;

  @Prop( {required: true} )
  codigo: number;

}
export const TurmaSchema = SchemaFactory.createForClass(Turma);