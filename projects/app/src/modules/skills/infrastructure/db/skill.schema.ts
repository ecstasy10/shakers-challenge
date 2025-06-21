'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'skills' })
export class SkillModel {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: String, required: true })
  name: string;
}

export type SkillDocument = SkillModel & Document;
export const SkillSchema = SchemaFactory.createForClass(SkillModel);
