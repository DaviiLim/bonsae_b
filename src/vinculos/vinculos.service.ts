import { Injectable } from '@nestjs/common';
import { CreateVinculoDto } from './dto/create-vinculo.dto';
import { UpdateVinculoDto } from './dto/update-vinculo.dto';

@Injectable()
export class VinculosService {
  create(createVinculoDto: CreateVinculoDto) {
    return 'This action adds a new vinculo';
  }

  findAll() {
    return `This action returns all vinculos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vinculo`;
  }

  update(id: number, updateVinculoDto: UpdateVinculoDto) {
    return `This action updates a #${id} vinculo`;
  }

  remove(id: number) {
    return `This action removes a #${id} vinculo`;
  }
}
