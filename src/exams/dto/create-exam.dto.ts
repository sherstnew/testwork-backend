import { IsNotEmpty, IsArray, IsString, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  questions: Types.ObjectId[];

  @IsNotEmpty()
  @IsArray()
  results: Types.ObjectId[];

  @IsNotEmpty()
  @IsNumber()
  questionsLimit: number;

  @IsNotEmpty()
  @IsNumber()
  availableTime: number;
}
