import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { PeriodoLetivoEnum } from '../enum/periodo-letivo.enum';

@Entity('school_periods')
export class School_Periods {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', unique: true })
  identificacao: string;

  @Column({ type: 'varchar' })
  periodoLetivo: PeriodoLetivoEnum;

  @Column({ type: 'date' })
  dataInicial: Date;

  @Column({ type: 'date' })
  dataFim: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  validateDates() {
    if (this.dataFim <= this.dataInicial) {
      throw new Error('Data final deve ser após a data inicial');
    }
  }
}