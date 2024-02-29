import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exam } from 'src/schemas/exam.entity';
import { Model, Types } from 'mongoose';
import { Question } from 'src/schemas/question.entity';
import { Result } from 'src/schemas/result.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(Exam.name) private readonly examModel: Model<Exam>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    @InjectModel(Result.name) private readonly resultModel: Model<Result>,
  ) {}

  async create(createExamDto: CreateExamDto) {
    // const allQuestions = await this.questionModel.find();
    // createExamDto.questions = allQuestions.map((question) => question._id);
    // const allResults = await this.resultModel.find();
    // createExamDto.results = allResults.map((result) => result._id);

    // Создать со всеми текущими результатами и вопросами

    const createdExam = new this.examModel(createExamDto);
    return createdExam.save();
  }

  async findAll() {
    return this.examModel
      .find()
      .populate({ path: 'questions', model: this.questionModel })
      .populate({
        path: 'results',
        model: this.resultModel,
        options: { sort: { createdAt: -1 } },
      })
      .exec();
  }

  async findOne(id: Types.ObjectId) {
    return this.examModel
      .findById(id)
      .populate({ path: 'questions', model: this.questionModel })
      .populate({
        path: 'results',
        model: this.resultModel,
        options: { sort: { createdAt: -1 } },
      })
      .exec();
  }

  async update(id: Types.ObjectId, updateExamDto: UpdateExamDto) {
    return this.examModel.findByIdAndUpdate(id, updateExamDto).exec();
  }

  async remove(id: Types.ObjectId) {
    return this.examModel.findByIdAndDelete(id).exec();
  }
}
