'use strict';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'projects' })
export class ProjectModel {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Object, required: true })
  organization: {
    _id: number;
    name: string;
    logo: string;
    industry: number;
  };

  @Prop({ type: Object, required: true })
  projectLeader: {
    _id: number;
    name: string;
    lastName: string;
  };

  @Prop({ type: Number, required: true })
  category: number;

  @Prop({ type: Number, required: true })
  subcategory: number;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Object, required: true })
  budget: {
    hourFrom: number | null;
    hourTo: number | null;
    total: number | null;
  };

  @Prop({ type: Number, default: 0 })
  totalHours: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  goals?: string[];

  @Prop({ type: [Object], default: [] })
  faqs?: { question: string; answer: string }[];

  @Prop({ required: true })
  status: string;

  @Prop({ type: Date, default: Date.now })
  creationDate: Date;

  @Prop({ type: [Object], default: [] })
  positions?: {
    _id: number;
    title: string;
    skills?: number[];
    specialties?: number[];
    referralBonus?: number | null;
  }[];

  @Prop({ type: Number, default: 0 })
  totalApplicationsAmount?: number;

  @Prop({ type: Date, default: null })
  publishedAt?: Date | null;
}

export type ProjectDocument = ProjectModel & Document;
export const ProjectSchema = SchemaFactory.createForClass(ProjectModel);
