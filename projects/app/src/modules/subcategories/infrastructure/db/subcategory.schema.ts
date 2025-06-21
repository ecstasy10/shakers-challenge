'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'subcategories' })
export class SubcategoryModel {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  categoryId: number;
}

export type SubcategoryDocument = SubcategoryModel & Document;
export const SubcategorySchema = SchemaFactory.createForClass(SubcategoryModel);
