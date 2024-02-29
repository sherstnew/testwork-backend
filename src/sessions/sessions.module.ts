import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema, Session } from '../schemas/session.entity';
import { Result, ResultSchema } from '../schemas/result.entity';
import { Question, QuestionSchema } from '../schemas/question.entity';
import { Exam, ExamSchema } from 'src/schemas/exam.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: Result.name, schema: ResultSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Exam.name, schema: ExamSchema },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
