import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ParseObjectIdPipe } from './../pipes/ParseObjectIdPipe';
import { Types } from 'mongoose';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post(':examId')
  create(
    @Param('examId', ParseObjectIdPipe) examId: Types.ObjectId,
    @Body() createResultDto: CreateResultDto,
  ) {
    return this.resultsService.create(createResultDto, examId);
  }

  @Get()
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.resultsService.findOne(id);
  }
}
