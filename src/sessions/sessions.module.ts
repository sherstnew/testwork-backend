import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema, Session } from './entities/session.entity';
import { Result, ResultSchema } from './entities/result.entity';
import { Question, QuestionSchema } from './entities/question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: Result.name, schema: ResultSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
