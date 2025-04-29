import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop()
  id_old_bonsae: string;

  @Prop()
  id_audora: string;

  @Prop()
  profile_id: string;

  @Prop({ default: true })
  active?: boolean;

  /**
   * Coordenador(a)
   * Professor(a)
   * Aluno(a)
   * etc
   */
  @Prop()
  name: string; 

  @Prop()
  registration_number: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  receive_emails?: boolean;

  @Prop()
  gmail: string;

  @Prop()
  gcalendar_credentials?: string;

  @Prop({ default: false })
  approve_api?: boolean;

  @Prop()
  approve_msg?: string;

  @Prop()
  telephone?: string;

  @Prop({select: false})
  password: string;

  @Prop({unique: true})
  cpf: string;

  @Prop()
  period_id: string;

  @Prop()
  oab?: string;

  @Prop()
  oab_uf?: string;

  @Prop()
  workload_real?: string;

  @Prop()
  workload_simulated?: string;

  @Prop()
  observations?: string;

  @Prop()
  profile_pic?: string;

  @Prop()
  course?: string;

  @Prop()
  course_id?: string;

  @Prop({ default: false })
  is_admin?: boolean;

  @Prop()
  remember_token?: string;
  //Como vai funcionar esses dois? Armazenar? 
  @Prop()
  access_token?: string;

  @Prop()
  browser_agent?: string;

  @Prop()
  date_accept?: Date;

  @Prop()
  last_login?: Date;

  @Prop()
  last_logout?: Date;

  @Prop()
  logged_time?: string;

  @Prop()
  all_time_logged?: string;

  @Prop()
  average_logged_time?: string;

  @Prop()
  times_active?: number;

  @Prop()
  ip: string;

  @Prop({ default: false })
  permission?: boolean;

  @Prop()
  integration?: string;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);