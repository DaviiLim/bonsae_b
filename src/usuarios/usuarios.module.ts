import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './schema/usuarios.schema';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: Usuario.name, schema: UsuarioSchema },
          { name: Processo.name, schema: ProcessoSchema },
        ]),
      ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
