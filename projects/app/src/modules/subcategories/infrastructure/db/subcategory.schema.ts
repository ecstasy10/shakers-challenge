'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'subcategories' })
export class SubcategoryModel {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: String, required: true })
  name: string;
}

export type SubcategoryDocument = SubcategoryModel & Document;
export const SubcategorySchema = SchemaFactory.createForClass(SubcategoryModel);
