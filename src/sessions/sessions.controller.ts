import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipes/ParseObjectIdPipe';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':examId')
  create(
    @Param('examId', ParseObjectIdPipe) examId: Types.ObjectId,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.create(createSessionDto, examId);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.sessionsService.findOne(id);
  }
}
