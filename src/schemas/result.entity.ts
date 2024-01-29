import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResultDocument = HydratedDocument<Result>;

@Schema({ timestamps: true })
export class Result {
  @Prop()
  name: string;

  @Prop()
  result: number;

  @Prop()
  time: number;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
