import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TurmasTurnoEnum } from "../enum/turmasTurno.enum";

export type TurmaDocument = Turma & Document;

@Schema({ collection: 'turmas' })
export class Turma {
  
  @Prop( {required: true} )
  disciplinaCodigo: string;

  @Prop( {enum: TurmasTurnoEnum} )
  turno?: TurmasTurnoEnum;

  @Prop( {required: true} )
  turma: string;

  @Prop( {required: true} )
  codigoTurma: number;

}
export const TurmaSchema = SchemaFactory.createForClass(Turma);