import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schema/disciplinas.schema';
import { CreateDisciplinasArrayDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Processo, ProcessoDocument } from 'src/processos/schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosDocument } from 'src/periodos-letivos/schema/periodos-letivos.schema';


function validarObjectId(id: string, nomeCampo = 'ID'): void {
  if (!Types.ObjectId.isValid(id)) {
    throw new NotFoundException(`${nomeCampo} inválido.`);
  }
}

@Injectable()
export class DisciplinasService {
  constructor(
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
    @InjectModel(PeriodosLetivos.name) private readonly periodoLetivoModel: Model<PeriodosLetivosDocument>,
    @InjectModel(Processo.name) private readonly processoModel: Model<ProcessoDocument>,
  ) {}

  async create(dto: CreateDisciplinasArrayDto): Promise<Disciplina[]> {
  const { disciplinas } = dto;

  const processoID = disciplinas[0].processoID;
  const periodoLetivoID = disciplinas[0].periodoLetivoID;

  const processoExiste = await this.processoModel.exists({ _id: processoID });
  if (!processoExiste) {
    throw new BadRequestException(`Processo ${processoID} não encontrado`);
  }

  const periodoExiste = await this.periodoLetivoModel.exists({ _id: periodoLetivoID });
  if (!periodoExiste) {
    throw new BadRequestException(`Período Letivo ${periodoLetivoID} não encontrado`);
  }

  const codigos = disciplinas.map((d) => d.codigo);
  const codigosDuplicados = await this.disciplinaModel.find({
    codigo: { $in: codigos },
  });

  if (codigosDuplicados.length > 0) {
    const codigosExistentes = codigosDuplicados.map((d) => d.codigo).join(' | ');
    throw new BadRequestException(`Os seguintes códigos já existem: ${codigosExistentes}`);
  }

  return await this.disciplinaModel.insertMany(disciplinas, { ordered: true });
}
  async findAll(): Promise<Disciplina[]> {
    const disciplinas = await this.disciplinaModel.find();
    if (!disciplinas.length) {
      throw new NotFoundException('Nenhuma disciplina encontrada.');
    }
    return disciplinas;
  }

  async findById(id: string): Promise<Disciplina> {
    validarObjectId(id, 'Disciplina');

    const disciplina = await this.disciplinaModel.findById(id);
    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada.');
    }
    return disciplina;
  }

  async update(id: string, dto: UpdateDisciplinaDto): Promise<Disciplina> {
    validarObjectId(id, 'Disciplina');

    const atualizada = await this.disciplinaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!atualizada) {
      throw new NotFoundException('Não foi possível atualizar: disciplina não encontrada.');
    }
    return atualizada;
  }

  async delete(id: string): Promise<{ message: string }> {
    validarObjectId(id, 'Disciplina');

    const deletada = await this.disciplinaModel.findByIdAndDelete(id);
    if (!deletada) {
      throw new NotFoundException('Disciplina não encontrada para exclusão.');
    }

    return { message: 'Disciplina excluída com sucesso.' };
  }

  async buscarProcesso(processoID: string): Promise<Disciplina[]> {
    return await this.disciplinaModel.find({ processoID })
  }
}
