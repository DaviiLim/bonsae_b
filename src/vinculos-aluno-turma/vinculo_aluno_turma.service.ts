import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { VinculoAlunoTurma, VinculoAlunoTurmaDocument } from "./vinculo_aluno_turma.schema";
import { Model } from "mongoose";

@Injectable()
export class VinculoAlunoTurmaService {
    constructor(
        @InjectModel(VinculoAlunoTurma.name) private vinculoAlunoTurmaModel: Model<VinculoAlunoTurmaDocument> 
    ) {}

    async findAll(): Promise<VinculoAlunoTurma[]> {
        return this.vinculoAlunoTurmaModel.find().exec();
    }

    async bulkCreate(rows: Record<string, any>[]): Promise<VinculoAlunoTurmaDocument[]> {
        const createdDocs = await this.vinculoAlunoTurmaModel.insertMany(rows);
        return createdDocs as VinculoAlunoTurmaDocument[];
    } 
}