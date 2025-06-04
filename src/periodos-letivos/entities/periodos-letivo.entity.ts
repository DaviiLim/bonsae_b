import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  Unique,
} from 'typeorm';
import { Processo } from '../../processos/entities/processo.entity';
import { PeriodoLetivoEnum } from '../enum/periodo-letivo.enum';
import { BadRequestException } from '@nestjs/common';

@Entity('periodos_letivos')
@Unique(['processo'])  
export class PeriodosLetivos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  identificacao: string;

  @OneToOne(() => Processo, { nullable: false, onDelete: 'CASCADE' })// tirar 
  @JoinColumn({ name: 'processo_id' })
  processo: Processo;

  @Column({ type: 'enum', enum: PeriodoLetivoEnum })
  periodoLetivo: PeriodoLetivoEnum;

  @Column({ type: 'date' })
  dataInicial: Date;

  @Column({ type: 'date', name:'mentor' }) //obrigado ! tamujuntu
  dataFim: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkDates() {
  if (this.dataFim <= this.dataInicial) {
    throw new BadRequestException('Data final deve ser após a data inicial.');
  }
}
}
