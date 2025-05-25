import { Injectable, BadRequestException } from '@nestjs/common';
import { DisciplinasService } from 'src/disciplinas/service/disciplinas.service';
import { UsersService } from 'src/users/users.service';
import { TurmasService } from 'src/turmas/turma.service';
import { VinculoAlunoTurmaService } from 'src/vinculos-aluno-turma/vinculo_aluno_turma.service';
import { VinculoProfessorTurmaService } from 'src/vinculos-professor-turma/vinculo_professor_turma.service';

@Injectable()
export class CsvUploadService {
  constructor(
    private readonly userService: UsersService,
    private readonly disciplinaService: DisciplinasService,
    private readonly turmaService: TurmasService,
    private readonly vinculoAlunoTurmaService: VinculoAlunoTurmaService,
    private readonly vinculoProfessorTurmaService: VinculoProfessorTurmaService
    // private readonly periodoService: PeriodoService,
    // private readonly vinculoService: VinculoService,
  ) {}

  /**
   * Processa upload de CSV de acordo com o tipo informado
   * @param type string - tipo da planilha ("usuario", "disciplina", ...)
   * @param rows any[] - dados a serem inseridos
   */
  async handleUpload(type: string, rows: Record<string, any>[]) {
    switch (type) {
      case 'usuario':
        return this.userService.bulkCreate(rows);

      case 'disciplina':
        return this.disciplinaService.bulkCreate(rows);

      case 'turma':
        return this.turmaService.bulkCreate(rows);

      case 'vinculo_professor_turma':
        return this.vinculoProfessorTurmaService.bulkCreate(rows);

      case 'vinculo_aluno_turma':
        return this.vinculoAlunoTurmaService.bulkCreate(rows);

      default:
        throw new BadRequestException(`Tipo inválido: ${type}`);
    }
  }
}
