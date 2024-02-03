import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session } from '../schemas/session.entity';
import { Result } from '../schemas/result.entity';
import { Question } from '../schemas/question.entity';
import { Exam } from 'src/schemas/exam.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Result.name) private resultModel: Model<Result>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Exam.name) private examModel: Model<Exam>,
  ) {}

  async create(createSessionDto: CreateSessionDto, examId: Types.ObjectId) {
    const exam = await this.examModel.findById(examId);
    // добавить на клиент examId

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 3);
    createSessionDto.expiredAt = expiredAt;

    const questions = await this.questionModel
      .find()
      .limit(exam.questionsLimit)
      .skip(Math.floor(Math.random() * (await exam.questions.length)));

    createSessionDto.questions = questions;

    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findOne(id: Types.ObjectId) {
    const session = await this.sessionModel.findById(id).exec();
    const currentDate = new Date();
    // Проверка на срок действия сессии
    if (session) {
      if (session.expiredAt.getTime() > currentDate.getTime() && session) {
        return session;
      } else {
        await this.sessionModel.findByIdAndDelete(id).exec();
        return 'Session Expired';
      }
    } else {
      return 'Session Error';
    }
  }
}
