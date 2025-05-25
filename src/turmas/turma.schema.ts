import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TurmaDocument = Turma & Document

@Schema({timestamps: true})
export class Turma {
    @Prop({required: true})
    disciplinaCodigo: string;

    @Prop()
    turno?: string;

    @Prop({required: true})
    turma: string;

    @Prop({required: true})
    codigoDaTurma: string;
}

export const TurmaSchema = SchemaFactory.createForClass(Turma);