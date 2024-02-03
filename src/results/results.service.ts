import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from 'src/schemas/session.entity';
import { Result } from 'src/schemas/result.entity';
import { Exam } from 'src/schemas/exam.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Result.name) private resultModel: Model<Result>,
    @InjectModel(Exam.name) private examModel: Model<Exam>,
  ) {}
  async create(createResultDto: CreateResultDto, examId: Types.ObjectId) {
    const session = await this.sessionModel.findById(createResultDto.id).exec();

    const createdResult = new this.resultModel({
      name: session.name,
      result: createResultDto.result,
      time: createResultDto.time,
    });

    const savedResult = await createdResult.save();

    await this.sessionModel.findByIdAndDelete(createResultDto.id).exec();

    const exam = await this.examModel.findById(examId);
    exam.results.push(savedResult._id);
    await exam.save();

    return savedResult;
  }

  async findAll() {
    return this.resultModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: Types.ObjectId) {
    return this.resultModel.findById(id).exec();
  }
}
