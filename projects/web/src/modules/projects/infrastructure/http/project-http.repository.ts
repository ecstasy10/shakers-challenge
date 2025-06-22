"use strict";

import { IProjectRepository } from "@/modules/projects/domain/repositories/project.repository.interface";
import { GetAllProjectsDto } from "@/modules/projects/application/dto/get-all-projects.dto";
import {
  Project,
  ProjectStatus,
} from "@/modules/projects/domain/entities/project.entity";
import { apiRequest } from "@/shared/api/client";

interface RawPositionItem {
  _id: number;
  title: string;
  skills?: number[];
  specialties: number[];
  referralBonus: number;
}

interface RawProject {
  _id: number;
  title: string;
  organization: {
    _id: number;
    name: string;
    logo: string;
    industry: number;
  };
  projectLeader: {
    _id: number;
    name: string;
    lastName: string;
  };
  category: number;
  subcategory: number;
  startDate: string;
  budget: {
    hourFrom: number | null;
    hourTo: number | null;
    total: number | null;
  };
  totalHours: number;
  description: string;
  goals?: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  status: string;
  creationDate: Date;
  positions?: RawPositionItem[];
  totalApplicationsAmount?: number;
  publishedAt: Date;
}

export class ProjectHttpRepository implements IProjectRepository {
  async findAll(dto: GetAllProjectsDto): Promise<Project[]> {
    const data: RawProject[] = await apiRequest<Array<RawProject>>(
      "/projects",
      "GET",
      undefined,
      dto,
    );
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response from projects API");
    }
    if (data.length === 0) {
      return [];
    }

    return data.map((d) =>
      Project.fromRaw({
        _id: d._id,
        title: d.title,
        organization: d.organization,
        projectLeader: d.projectLeader,
        category: d.category,
        subcategory: d.subcategory,
        startDate: new Date(d.startDate),
        budget: d.budget,
        totalHours: d.totalHours,
        description: d.description,
        goals: d.goals || [],
        faqs: d.faqs,
        status: d.status as unknown as ProjectStatus,
        creationDate: d.creationDate,
        positions:
          d.positions?.map((position: RawPositionItem) => ({
            _id: position._id,
            title: position.title,
            skills: position.skills || [],
            specialties: position.specialties,
            referralBonus: position.referralBonus || null,
          })) || [],
        totalApplicationsAmount: d.totalApplicationsAmount || 0,
        publishedAt: d.publishedAt,
      }),
    );
  }
}
