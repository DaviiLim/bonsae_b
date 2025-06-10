import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './schema/usuarios.schema';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School_Periods } from 'src/periodos-letivos/entities/periodos-letivo.entity';
import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { Disciplines } from 'src/turmas/entities/turma.entity';
import { User } from './entities/usuario.entity';
import { DisciplineUser } from 'src/vinculos/entities/vinculo.entity';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: Usuario.name, schema: UsuarioSchema },
          { name: Processo.name, schema: ProcessoSchema },
        ]),
            TypeOrmModule.forFeature([
              School_Periods,
              AcademicClasses,
              Disciplines,
              User,
              DisciplineUser
            ]),
      ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
