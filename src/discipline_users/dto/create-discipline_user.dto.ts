import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateDisciplineUserDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  disciplineId: string;
}












