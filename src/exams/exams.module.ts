import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from 'src/schemas/exam.entity';
import { Result, ResultSchema } from 'src/schemas/result.entity';
import { Question, QuestionSchema } from 'src/schemas/question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: Result.name, schema: ResultSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
