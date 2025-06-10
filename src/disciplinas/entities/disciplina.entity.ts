import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  BeforeUpdate,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DisciplinasCategoriaEnum } from '../enum/disciplinasCategoria.enum';
import { DisciplinasEstadoEnum } from '../enum/disciplinasEstado.enum';
import { School_Periods } from 'src/periodos-letivos/entities/periodos-letivo.entity';

@Entity('academic_classes')
export class AcademicClasses {

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'school_period_id', type: 'bigint', unsigned: true, nullable: true })
  school_period_id?: number; 
  
  @ManyToOne(() => School_Periods, schoolPeriod => schoolPeriod.disciplinas)
  @JoinColumn({ name: 'school_period_id', referencedColumnName: 'id' })
  periodoLetivo: School_Periods;

  @Column({name:'name', type: 'varchar', length: 255 })
  nome: string;

  @Column({name:'code', type: 'varchar', length: 100, unique: true })
  codigo: string;

  @Column({name:'start_date', type: 'date' })
  dataInicial: Date;

  @Column({
    name:'end_date',
    type: 'date',
  })
  dataFim: Date;

  @Column({
    name:'category',
    type: 'enum',
    enum: DisciplinasCategoriaEnum,
  })
  categoria: DisciplinasCategoriaEnum;

  @Column({ type: 'varchar', nullable: true })
  course?: string;

  @Column({name:'period', type: 'varchar',nullable: true })
  periodoCurricular?: string;

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

  @Column({ name:'campus_id', type: 'varchar', nullable: true })
  campus?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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
