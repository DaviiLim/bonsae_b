import { Controller, Get, Post, Body } from "@nestjs/common";
import { VinculoProfessorTurmaService } from "./vinculo_professor_turma.service";

@Controller('vinculos-professor-turma')
export class VinculoProfessorTurmaController {
    constructor(
        private readonly vinculoProfessorTurmaService: VinculoProfessorTurmaService
    ) {}

    @Get()
    findAll() {
        return this.vinculoProfessorTurmaService.findAll();
    }
}