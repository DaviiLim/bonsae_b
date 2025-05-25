import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Turma, TurmaDocument } from "./turma.schema";
import { Model } from "mongoose";

@Injectable()
export class TurmasService {
    constructor(
        @InjectModel(Turma.name) private turmaModel: Model<TurmaDocument>
    ) {}

    async findAll(): Promise<Turma[]> {
    return this.turmaModel.find().exec();
    }

    async bulkCreate(rows: Record<string, any>[]): Promise<TurmaDocument[]> {
        const createdDocs = await this.turmaModel.insertMany(rows);
        return createdDocs as TurmaDocument[];
    } 
}