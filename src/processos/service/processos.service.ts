import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProcessoRepository } from '../repository/processo.repository';
import { Processo } from '../entities/processo.entity';

@Injectable()
export class ProcessosService {
  constructor(private readonly processoRepository: ProcessoRepository) {}

  async findAll(): Promise<Processo[]> {
    return this.processoRepository.find();
  }

  async findOne(id: number): Promise<Processo> {
    const processo = await this.processoRepository.findOneBy({ processoID: id });
    if (!processo) {
      throw new NotFoundException(`Processo #${id} não encontrado`);
    }
    return processo;
  }

  async create(processoData: Partial<Processo>): Promise<Processo> {
    const processo = this.processoRepository.create(processoData);
    return this.processoRepository.save(processo);
  }

  async update(id: number, processoData: Partial<Processo>): Promise<Processo> {
    await this.processoRepository.update(id, processoData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.processoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Processo #${id} não encontrado para exclusão`);
    }
  }

  async findByStatus(status: string): Promise<Processo[]> {
    return this.processoRepository.findByStatus(status);
  }
}
