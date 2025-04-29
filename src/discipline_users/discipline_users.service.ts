import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { CreateDisciplineUserDto } from 'src/discipline_users/dto/create-discipline_user.dto';

@Injectable()
export class DisciplineUsersService {
  constructor(
    @InjectModel(CreateUserDto.name) private userModel: Model<CreateUserDto>,
    @InjectModel(Discipline.name) private disciplineModel: Model<Discipline>,
  ) {}

  async vincularUsuario(data: CreateDisciplineUserDto) {
    const { userId, disciplineId } = data;

    await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { disciplines: disciplineId } }, // Adiciona ao array sem duplicar
      { new: true },
    );

    await this.disciplineModel.findByIdAndUpdate(
      disciplineId,
      { $addToSet: { users: userId } },
      { new: true },
    );

    return { message: 'Usuário vinculado à disciplina com sucesso!' };
  }

  async desvincularUsuario(data: CreateDisciplineUserDto) {
    const { userId, disciplineId } = data;

    await this.userModel.findByIdAndUpdate(userId, { $pull: { disciplines: disciplineId } });
    await this.disciplineModel.findByIdAndUpdate(disciplineId, { $pull: { users: userId } });

    return { message: 'Usuário desvinculado da disciplina!' };
  }
}
