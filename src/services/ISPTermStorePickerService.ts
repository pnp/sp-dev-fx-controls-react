/**
 * Interfaces for Term store, groups and term sets
 */
export interface ITermStore {
  _ObjectType_: string; // SP.Taxonomy.TermStore
  _ObjectIdentity_: string;
  Id: string;
  Name: string;
  Groups: IGroups;
}

export interface IGroups {
  _ObjectType_: string; // SP.Taxonomy.TermGroupCollection
  _Child_Items_: IGroup[];
}

export interface IGroup {
  _ObjectType_: string; // SP.Taxonomy.TermGroup
  _ObjectIdentity_: string;
  TermSets: ITermSets;
  Id: string;
  Name: string;
  IsSystemGroup: boolean;
}

export interface ITermSets {
  _ObjectType_: string; // SP.Taxonomy.TermSetCollection
  _Child_Items_: ITermSet[];
}

export interface ITermSet {
  _ObjectType_: string; // SP.Taxonomy.TermSet
  _ObjectIdentity_: string;
  Id: string;
  CustomSortOrder?:string;
  Name: string;
  Description: string;
  Names: ITermSetNames;
  Terms?: ITerm[];
}

export interface ITermSetMinimal {
  _ObjectType_?: string; // SP.Taxonomy.TermSet
  _ObjectIdentity_?: string;
  Id: string;
  Name: string;
}

export interface ITermSetNames {
  [locale: string]: string;
}

/**
 * Interfaces for the terms
 */
export interface ITerms {
  _ObjectType_: string; // SP.Taxonomy.TermCollection
  _Child_Items_: ITerm[];
}

/**
 * Term
 */
export interface ITerm {
  _ObjectType_: string; // SP.Taxonomy.Term
  _ObjectIdentity_: string;
  Id: string;
  Name: string;
  Description: string;
  IsDeprecated: boolean;
  IsAvailableForTagging: boolean;
  IsRoot: boolean;
  PathOfTerm: string;
  TermSet: ITermSetMinimal;
  CustomSortOrderIndex?: number;
  PathDepth?: number;
  ParentId?: string;
}
