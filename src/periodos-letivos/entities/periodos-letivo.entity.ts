import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PeriodoLetivoEnum } from '../enum/periodo-letivo.enum';
import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { Disciplines } from 'src/turmas/entities/turma.entity';

@Entity('school_periods')
export class School_Periods {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', unique: true, name:'name' })
  identificacao: string;

  @Column({ type: 'varchar', name:'school_period' })
  periodoLetivo: PeriodoLetivoEnum;

  @Column({ type: 'date', name:'start_date' })
  dataInicial: Date;

  @Column({ type: 'date', name:'final_date' })
  dataFim: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;

  @OneToMany(() => AcademicClasses, (disciplina) => disciplina.periodoLetivo)
  disciplinas: AcademicClasses[];

  @OneToMany(() => Disciplines, (turma) => turma.periodoLetivo)
  turmas: Disciplines[];

  @BeforeInsert()
  @BeforeUpdate()
  validateDates() {
    if (this.dataFim <= this.dataInicial) {
      throw new Error('Data final deve ser após a data inicial');
    }
  }
}