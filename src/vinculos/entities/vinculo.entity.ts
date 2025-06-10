import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { Disciplines } from 'src/turmas/entities/turma.entity';
import { User } from 'src/usuarios/entities/usuario.entity';
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

@Entity('discipline_users')
export class DisciplineUser {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'int' })
  discipline_id: number;

  @ManyToOne(() => Disciplines)
  @JoinColumn({ name: 'discipline_id' })
  disciplina: Disciplines;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  usuario: User;

  @Column({ type: 'int' })
  team_id: number;

  @ManyToOne(() => AcademicClasses)
  @JoinColumn({ name: 'team_id' })
  turma: AcademicClasses;

  @Column({ type: 'int', default: 0 })
  temporary: number;

  @Column({ type: 'int', default: 0 })
  professor: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
