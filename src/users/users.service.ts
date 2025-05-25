import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({ deleted_at: null }).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /** 
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }
  */

  async remove(id: string): Promise<String> {
    
    const user = await this.userModel
    .findByIdAndDelete(id)
    .exec()

    if (!user) {
      throw new HttpException('Usuário não encontrado ou já deletado!', HttpStatus.NOT_FOUND);
    }

    return 'Usuário deletado com sucesso!';
  }
  async bulkCreate(rows: Record<string, any>[]): Promise<UserDocument[]> {
    // Opcional: mapear/validar DTOs antes de inserir
    const createdDocs = await this.userModel.insertMany(rows);
    return createdDocs as UserDocument[];
  }
}
