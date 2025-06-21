'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'industries' })
export class IndustryModel {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: String, required: true })
  name: string;
}

export type IndustryDocument = IndustryModel & Document;
export const IndustrySchema = SchemaFactory.createForClass(IndustryModel);
