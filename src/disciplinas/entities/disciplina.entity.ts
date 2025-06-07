import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { PeriodoLetivo } from '../../periodos-letivos/entities/periodos-letivo.entity';
import { DisciplinasEstadoEnum } from '../enum/disciplinasEstado.enum';
import { DisciplinasCategoriaEnum } from '../enum/disciplinasCategoria.enum';

@Entity('disciplinas')
export class Disciplina {
  @PrimaryGeneratedColumn({ unsigned: true, type: 'bigint' })
  id: number;

  @ManyToOne(() => PeriodoLetivo)
  @JoinColumn({ name: 'periodo_letivo_id' })
  periodoLetivo: PeriodoLetivo;

  @Column({ name: 'processo_id', type: 'int' })
  processoId: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 20, unique: true, nullable: false })
  codigo: string;

  @Column({ name: 'data_inicial', type: 'date', nullable: false })
  dataInicial: Date;

  @Column({ name: 'data_fim', type: 'date', nullable: false })
  dataFim: Date;

  @Column({ 
    type: 'enum', 
    enum: DisciplinasCategoriaEnum, 
    nullable: false 
  })
  categoria: DisciplinasCategoriaEnum;

  @Column({ name: 'periodo_curricular', length: 50, nullable: true })
  periodoCurricular?: string;

  @Column({ 
    type: 'enum', 
    enum: DisciplinasEstadoEnum
  })
  estado?: DisciplinasEstadoEnum;

  @Column({ length: 50, nullable: true })
  campus?: string;
}