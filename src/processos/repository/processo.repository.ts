import { DataSource, Repository } from 'typeorm';
import { Processo } from '../entities/processo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessoRepository extends Repository<Processo> {
  constructor(private dataSource: DataSource) {
    super(Processo, dataSource.createEntityManager());
  }

  async findByStatus(status: string): Promise<Processo[]> {
    return this.find({ where: { status } });
  }
}
