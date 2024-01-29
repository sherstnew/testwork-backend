import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  text: string;

  @Prop()
  options: string[];

  @Prop()
  answer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
