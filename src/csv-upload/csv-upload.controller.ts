import { Body, Controller, Post } from '@nestjs/common';
import { CsvUploadService } from './csv-upload.service';
import { CsvUploadDto } from './csv-upload.dto';

@Controller('csv-upload')
export class CsvUploadController {
    constructor(private readonly csvUploadService: CsvUploadService) {}

    @Post()
    async uploadCsv(@Body() csvUploadDto: CsvUploadDto) {
        const { type, data } = csvUploadDto;
        return this.csvUploadService.handleUpload(type, data)
    }
}