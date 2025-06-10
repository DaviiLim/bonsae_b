import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'int', nullable: true })
  id_old_bonsae?: number;

  @Column({ type: 'int', nullable: true })
  id_audora?: number;

  @Column({ name:'profile_id', type: 'varchar', unsigned: true })
  perfil: string;

  @Column({ type: 'char', length: 1, nullable: true })
  active?: string;

  @Column({ type: 'int', nullable: true })
  subperfil?: string;

  @Column({ name:'name', type: 'varchar', length: 255 })
  nome: string;

  @Column({ name:'registration_number', type: 'varchar', length: 255, nullable: true })
  matriculaIES?: string;

  @Column({ name:'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  receive_emails?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gmail?: string;

  @Column({ type: 'varchar', nullable: true })
  gcalendar_credentials?: string;

  @Column({ type: 'char', length: 1, nullable: true })
  approve_api?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  approve_msg?: string;

  @Column({ name:'telephone', type: 'varchar', length: 20, nullable: true })
  telefone?: string;

  @Column( {name:'password', type: 'varchar', length: 255 })
  senha: string;

  @Column({ name:'cpf', type: 'varchar', length: 20 })
  cpf: string;

  @Column({ type: 'int', nullable: true })
  period_id?: number;

  @Column({ name:'oab', type: 'varchar', nullable: true })
  numeroOAB?: string;

  @Column({ name:'oab_uf', type: 'varchar', nullable: true })
  seccionalOAB?: string;

  @Column({ type: 'time', nullable: true })
  workload_real?: string;

  @Column({ type: 'time', nullable: true })
  workload_simulated?: string;

  @Column({ name:'observations', type: 'text', nullable: true })
  observacoes?: string;

  @Column({ type: 'varchar', nullable: true })
  profile_pic?: string;

  @Column({ name:'course', type: 'varchar', nullable: true })
  periodoCurricular?: string;

  @Column({ type: 'int', nullable: true })
  course_id?: number;

  @Column({ type: 'char',nullable: true })
  is_admin?: string;

  @Column({ type: 'varchar', nullable: true })
  remember_token?: string;

  @Column({ type: 'varchar', nullable: true })
  access_token?: string;

  @Column({ type: 'varchar', nullable: true })
  browser_agent?: string;

  @Column({ type: 'date', nullable: true })
  date_accept?: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login?: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_logout?: Date;

  @Column({ type: 'time', nullable: true })
  logged_time?: string;

  @Column({ type: 'time', nullable: true })
  all_time_logged?: string;

  @Column({ type: 'time', nullable: true })
  average_logged_time?: string;

  @Column({ type: 'int', nullable: true })
  times_active?: number;

  @Column({ type: 'varchar', nullable: true })
  ip?: string;

  @Column({ type: 'int', nullable: true })
  permission?: number;

  @Column({ type: 'varchar',nullable: true })
  integration?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
