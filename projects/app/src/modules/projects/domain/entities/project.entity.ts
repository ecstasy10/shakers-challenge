'use strict';

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

class Organization {
  constructor(
    public _id: number,
    public name: string,
    public logo: string,
    public industry: number,
  ) {}
}

class ProjectLeader {
  constructor(
    public _id: number,
    public name: string,
    public lastName: string,
  ) {}
}

class Budget {
  constructor(
    public hourFrom: number | null,
    public hourTo: number | null,
    public total: number | null,
  ) {}
}

class FAQ {
  constructor(
    public question: string,
    public answer: string,
  ) {}
}

class Position {
  constructor(
    public _id: number,
    public title: string,
    public skills: number[],
    public specialties: number[],
    public referralBonus: number | null,
  ) {}
}

interface FAQItem {
  question: string;
  answer: string;
}

export interface PositionItem {
  _id: number;
  title: string;
  skills: number[];
  specialties: number[];
  referralBonus?: number | null;
}

export class Project {
  constructor(
    public _id: number,
    public title: string,
    public organization: Organization | null,
    public projectLeader: ProjectLeader | null,
    public category: number,
    public subcategory: number,
    public startDate: Date,
    public budget: Budget | null,
    public totalHours: number,
    public description: string,
    public goals: string[],
    public faqs: FAQ[],
    public status: ProjectStatus | null,
    public creationDate: Date,
    public positions: Position[] = [],
    public totalApplicationsAmount: number = 0,
    public publishedAt: Date | null = null,
  ) {}

  static fromRaw(raw: {
    _id: number;
    title: string;
    organization?: {
      _id: number;
      name: string;
      logo: string;
      industry: number;
    };
    projectLeader?: {
      _id: number;
      name: string;
      lastName: string;
    };
    category: number;
    subcategory: number;
    startDate: Date;
    budget?: {
      hourFrom: number | null;
      hourTo: number | null;
      total: number | null;
    };
    totalHours: number;
    description: string;
    goals?: string[];
    faqs?: FAQItem[];
    status: ProjectStatus;
    creationDate: Date;
    positions?: PositionItem[];
    totalApplicationsAmount?: number;
    publishedAt?: Date | null;
  }): Project {
    let organization: Organization | null = null;
    let projectLeader: ProjectLeader | null = null;
    let budget: Budget | null = null;
    let faqs: FAQ[] = [];
    let positions: Position[] = [];

    if (raw.organization) {
      organization = new Organization(
        raw.organization._id,
        raw.organization.name,
        raw.organization.logo,
        raw.organization.industry,
      );
    }

    if (raw.projectLeader) {
      projectLeader = new ProjectLeader(
        raw.projectLeader._id,
        raw.projectLeader.name,
        raw.projectLeader.lastName,
      );
    }

    if (raw.budget) {
      budget = new Budget(
        raw.budget.hourFrom || null,
        raw.budget.hourTo || null,
        raw.budget.total || null,
      );
    }

    if (raw.faqs) {
      faqs = raw.faqs.map((faq: FAQItem) => new FAQ(faq.question, faq.answer));
    }

    if (raw.positions) {
      positions = raw.positions.map(
        (pos: PositionItem) =>
          new Position(
            pos._id,
            pos.title,
            pos.skills || [],
            pos.specialties || [],
            pos.referralBonus || null,
          ),
      );
    }

    return new Project(
      raw._id,
      raw.title,
      organization,
      projectLeader,
      raw.category,
      raw.subcategory,
      raw.startDate,
      budget,
      raw.totalHours,
      raw.description,
      raw.goals || [],
      faqs,
      raw.status,
      raw.creationDate,
      positions,
      raw.totalApplicationsAmount || 0,
      raw.publishedAt || null,
    );
  }
}
