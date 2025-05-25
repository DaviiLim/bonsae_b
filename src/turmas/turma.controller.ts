import { Controller, Get, Post, Body } from "@nestjs/common";
import { TurmasService } from "./turma.service";


@Controller('turmas')
export class TurmasController {
    constructor(private readonly turmasService: TurmasService) {}

    @Get()
    findAll() {
        return this.turmasService.findAll();
    }
}