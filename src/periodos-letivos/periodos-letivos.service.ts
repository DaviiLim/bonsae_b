import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PeriodosLetivos, PeriodosLetivosDocument } from './schema/periodos-letivos.schema';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';
import { Processo, ProcessoDocument } from 'src/processos/schema/processos.schema';

@Injectable()
export class PeriodosLetivosService {
  constructor(
    @InjectModel(PeriodosLetivos.name)
    private readonly periodoLetivoModel: Model<PeriodosLetivosDocument>,

    @InjectModel(Processo.name)
    private readonly processoModel: Model<ProcessoDocument>,
  ) {}

  async create(dto: CreatePeriodosLetivoDto): Promise<PeriodosLetivos> {
    const identificacaoExistente = await this.periodoLetivoModel.findOne({
      identificacao: dto.identificacao,
    });
    
    if (identificacaoExistente) {
      throw new ConflictException(
        'Já existe um período letivo com essa identificação.',
      );
    }

    const processo = await this.processoModel.findById(dto.processoID);
    if (!processo) {
      throw new NotFoundException('Processo vinculado não encontrado.');
    }

    const periodoComMesmoProcesso =
      await this.periodoLetivoModel.findOne({ 
        processoID: dto.processoID
       });
    if (periodoComMesmoProcesso) {
      throw new ConflictException(
        'Já existe um período letivo vinculado a esse processo.',
      );
    }

    const novo = new this.periodoLetivoModel(dto);
    return novo.save();
  }

  async findAll(): Promise<PeriodosLetivos[]> {
    const periodos = await this.periodoLetivoModel.find();
    if (!periodos.length) {
      throw new NotFoundException('Nenhum período letivo encontrado.');
    }
    return periodos;
  }

  async findById(id: string): Promise<PeriodosLetivos> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const periodo = await this.periodoLetivoModel.findById(id);
    if (!periodo) {
      throw new NotFoundException('Período letivo não encontrado.');
    }
    return periodo;
  }

  async update(
    id: string,
    dto: UpdatePeriodosLetivoDto,
  ): Promise<PeriodosLetivos> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const atualizado = await this.periodoLetivoModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    if (!atualizado) {
      throw new NotFoundException(
        'Não foi possível atualizar: período letivo não encontrado.',
      );
    }

    return atualizado;
  }

  async delete(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID inválido.');
    }

    const deletado = await this.periodoLetivoModel.findByIdAndDelete(id);
    if (!deletado) {
      throw new NotFoundException(
        'Período letivo não encontrado para exclusão.',
      );
    }

    return { message: 'Período letivo excluído com sucesso.' };
  }

  async buscarProcesso(processoID: string): Promise<PeriodosLetivos[]> {
        const processoExiste = await this.periodoLetivoModel.find({processoID})
        if (!processoExiste){
          throw new BadRequestException('Processo não encontrado / não existe !')
        }
  
        return processoExiste;
      }

}
