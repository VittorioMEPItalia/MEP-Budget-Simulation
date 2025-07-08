export enum Committee {
  AFET_DROI = "AFET-DROI",
  SEDE = "SEDE",
  INTA = "INTA",
  HOUS = "HOUS",
  EUDS = "EUDS",
  ITRE = "ITRE",
  JURI = "JURI"
}

export interface Proposal {
  id: string;
  name: string;
  cost: number;
  committee: Committee;
  headingId: number;
}

export interface NewResource {
  id: string;
  amount: number;
  committee: Committee;
  headingId: number;
}

export interface Heading {
  id: number;
  name: string;
  totalBudget: number;
  initialNegotiable: number;
  negotiableBudget: number;
  proposals: Proposal[];
}