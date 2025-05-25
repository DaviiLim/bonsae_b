import { Controller, Get, Post, Body } from "@nestjs/common";
import { VinculoAlunoTurmaService } from "./vinculo_aluno_turma.service";

@Controller('vinculos-aluno-turma')
export class VinculoAlunoTurmaController {
    constructor(
        private readonly vinculoAlunoTurmaService: VinculoAlunoTurmaService
    ) {}

    @Get()
    findAll() {
        return this.vinculoAlunoTurmaService.findAll();
    }
}