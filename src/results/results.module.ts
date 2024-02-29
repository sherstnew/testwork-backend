import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from 'src/schemas/result.entity';
import { Session, SessionSchema } from 'src/schemas/session.entity';
import { Exam, ExamSchema } from 'src/schemas/exam.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Result.name, schema: ResultSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Exam.name, schema: ExamSchema },
    ]),
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
