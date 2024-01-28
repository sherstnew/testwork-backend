import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipes/ParseObjectIdPipe';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.sessionsService.findOne(id);
  }

  @Post(':id/result')
  finishTest(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() createResultDto: CreateResultDto,
  ) {
    return this.sessionsService.finishTest(id, createResultDto);
  }
}
