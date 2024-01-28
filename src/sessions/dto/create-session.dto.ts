import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Question } from '../entities/question.entity';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  expiredAt: Date;

  @IsOptional()
  questions: Question[];
}
