import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Question } from './question.entity';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop()
  name: string;

  @Prop()
  expiredAt: Date;

  @Prop()
  questions: Question[];
}

const schema = SchemaFactory.createForClass(Session);

export const SessionSchema = schema;
