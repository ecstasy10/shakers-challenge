'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'categories' })
export class CategoryModel {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: String, required: true })
  name: string;
}

export type CategoryDocument = CategoryModel & Document;
export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
