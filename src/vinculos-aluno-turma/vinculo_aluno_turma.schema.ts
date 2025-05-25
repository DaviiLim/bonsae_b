import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type VinculoAlunoTurmaDocument = VinculoAlunoTurma & Document

@Schema({timestamps: true})
export class VinculoAlunoTurma {
    @Prop({required: true})
    disciplinaCodigo: string;

    @Prop({required: true})
    codigoDaTurma: string;

    @Prop({required: true})
    matriculaIesOuEMailDoAluno: string;
}

export const VinculoAlunoTurmaSchema = SchemaFactory.createForClass(VinculoAlunoTurma);