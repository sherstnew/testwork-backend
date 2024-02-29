import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExamDocument = HydratedDocument<Exam>;

@Schema()
export class Exam {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Result' }] })
  results: Types.ObjectId[];

  @Prop()
  questionsLimit: number;

  @Prop()
  availableTime: number;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
