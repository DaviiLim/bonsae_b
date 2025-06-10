import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TurmasTurnoEnum } from '../enum/turmasTurno.enum';
import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { School_Periods } from 'src/periodos-letivos/entities/periodos-letivo.entity';
import { DisciplinasEstadoEnum } from 'src/disciplinas/enum/disciplinasEstado.enum';

@Entity('disciplines')
export class Disciplines {

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'academic_class_id', type: 'bigint', unsigned: true, nullable: true })
  academic_class_id?: number;

  @ManyToOne(() => AcademicClasses)
  @JoinColumn({ name: 'academic_class_id', referencedColumnName: 'id' })
  disciplina: AcademicClasses;

  @Column({ name: 'school_period_id', type: 'bigint', unsigned: true, nullable: true })
  school_period_id?: number;

  @ManyToOne(() => School_Periods, schoolPeriod => schoolPeriod.turmas)
  @JoinColumn({ name: 'school_period_id', referencedColumnName: 'id' })
  periodoLetivo: School_Periods

  @Column({ name:'shift', type: 'enum', enum: TurmasTurnoEnum, nullable: true })
  turno?: TurmasTurnoEnum;

  @Column({ name:'name', type: 'varchar', nullable: false })
  turma: string;

  @Column({  name:'code', type: 'int', nullable: false })
  codigo: number;

  @Column({
    name:'active',
    type: 'enum',
    enum: DisciplinasEstadoEnum,
    default: DisciplinasEstadoEnum.ATIVA,
  })
  estado: DisciplinasEstadoEnum;

  @Column({ name: 'is_exceptional', type: 'int', default: 0 })
  isExceptional?: number;

  @Column({ type: 'varchar', nullable: true })
  integration?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;
}
