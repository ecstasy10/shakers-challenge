"use strict";

export class Subcategory {
  constructor(
    public readonly _id: number,
    public readonly name: string,
    public readonly categoryId: number,
  ) {}
}
