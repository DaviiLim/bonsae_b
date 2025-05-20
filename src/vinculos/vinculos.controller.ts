import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VinculosService } from './vinculos.service';
import { CreateVinculoDto } from './dto/create-vinculo.dto';
import { UpdateVinculoDto } from './dto/update-vinculo.dto';

@Controller('vinculos')
export class VinculosController {
  constructor(private readonly vinculosService: VinculosService) {}

  @Post()
  create(@Body() createVinculoDto: CreateVinculoDto) {
    return this.vinculosService.create(createVinculoDto);
  }

  @Get()
  findAll() {
    return this.vinculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vinculosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVinculoDto: UpdateVinculoDto) {
    return this.vinculosService.update(+id, updateVinculoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vinculosService.remove(+id);
  }
}
