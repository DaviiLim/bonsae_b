import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type VinculoProfessorTurmaDocument = VinculoProfessorTurma & Document

@Schema({timestamps: true})
export class VinculoProfessorTurma {
    @Prop({required: true})
    disciplinaCodigo: string;

    @Prop({required: true})
    codigoDaTurma: string;

    @Prop({required: true})
    professoresAsResponsavelEisMatriculaOuEMail: string;
}

export const VinculoProfessorTurmaSchema = SchemaFactory.createForClass(VinculoProfessorTurma);