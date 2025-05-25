import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { VinculoProfessorTurma, VinculoProfessorTurmaDocument } from "./vinculo_professor_turma.schema";
import { Model } from "mongoose";

@Injectable()
export class VinculoProfessorTurmaService {
    constructor(
        @InjectModel(VinculoProfessorTurma.name) private vinculoProfessorTurmaModel: Model<VinculoProfessorTurmaDocument> 
    ) {}

    async findAll(): Promise<VinculoProfessorTurma[]> {
        return this.vinculoProfessorTurmaModel.find().exec();
    }

    async bulkCreate(rows: Record<string, any>[]): Promise<VinculoProfessorTurmaDocument[]> {
        const createdDocs = await this.vinculoProfessorTurmaModel.insertMany(rows);
        return createdDocs as VinculoProfessorTurmaDocument[];
    } 
}