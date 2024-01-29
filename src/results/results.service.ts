import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from 'src/schemas/session.entity';
import { Result } from 'src/schemas/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Result.name) private resultModel: Model<Result>,
  ) {}
  async create(createResultDto: CreateResultDto) {
    const session = await this.sessionModel.findById(createResultDto.id).exec();

    const createdResult = new this.resultModel({
      name: session.name,
      result: createResultDto.result,
      time: createResultDto.time,
    });

    await this.sessionModel.findByIdAndDelete(createResultDto.id).exec();

    return createdResult.save();
  }

  async findAll() {
    return this.resultModel.find().exec();
  }

  async findOne(id: Types.ObjectId) {
    return this.resultModel.findById(id).exec();
  }
}
