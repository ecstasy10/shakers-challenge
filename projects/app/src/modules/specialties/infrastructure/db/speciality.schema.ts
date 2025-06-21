'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'specialties' })
export class SpecialityModel {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: String, required: true })
  name: string;
}

export type SpecialityDocument = SpecialityModel & Document;
export const SpecialitySchema = SchemaFactory.createForClass(SpecialityModel);
