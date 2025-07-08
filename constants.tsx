import React from 'react';
import { Heading, Committee } from './types';

export const COMMITTEES: Committee[] = [
  Committee.AFET_DROI,
  Committee.SEDE,
  Committee.INTA,
  Committee.HOUS,
  Committee.EUDS,
  Committee.ITRE,
  Committee.JURI,
];

export const INITIAL_HEADINGS: Heading[] = [
  {
    id: 1,
    name: "Single Market, Innovation, Digital",
    totalBudget: 260,
    initialNegotiable: 70,
    negotiableBudget: 70,
    proposals: [],
  },
  {
    id: 2,
    name: "Cohesion, Resilience, Values",
    totalBudget: 700,
    initialNegotiable: 50,
    negotiableBudget: 50,
    proposals: [],
  },
  {
    id: 3,
    name: "Natural Resources, Environment",
    totalBudget: 500,
    initialNegotiable: 25,
    negotiableBudget: 25,
    proposals: [],
  },
  {
    id: 4,
    name: "Migration and Border Management",
    totalBudget: 60,
    initialNegotiable: 10,
    negotiableBudget: 10,
    proposals: [],
  },
  {
    id: 5,
    name: "Security and Defence",
    totalBudget: 100,
    initialNegotiable: 100,
    negotiableBudget: 100,
    proposals: [],
  },
  {
    id: 6,
    name: "Neighbourhood and the World",
    totalBudget: 180,
    initialNegotiable: 45,
    negotiableBudget: 45,
    proposals: [],
  },
  {
    id: 7,
    name: "European Public Administration",
    totalBudget: 160,
    initialNegotiable: 0,
    negotiableBudget: 0,
    proposals: [],
  },
];

export const Logo: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-20 h-20 text-eu-yellow fill-current">
        <g transform="translate(50,50)">
            <g transform="scale(1.2)">
                <path d="M0-18L3.52-6.87l10.58-6.17-8.54 8.54L18 0l-12.25 3.52 6.17 10.58-8.54-8.54L0 18l-3.52-12.25-10.58 6.17 8.54-8.54L-18 0l12.25-3.52-6.17-10.58 8.54 8.54L0-18z" fill="#003399"/>
                <path d="M0-15l2.93-9.06 8.82-5.14-7.12 7.12L15 0l-10.21 2.93 5.14 8.82-7.12-7.12L0 15l-2.93-10.21-8.82 5.14 7.12-7.12L-15 0l10.21-2.93-5.14-8.82 7.12 7.12L0-15z" />
                <circle r="6" fill="#003399"/>
                <circle r="4" />
            </g>
        </g>
        <path d="M20,75 C25,65 35,60 50,60 C65,60 75,65 80,75" stroke="#003399" strokeWidth="3" fill="none"/>
        <path d="M25,85 C30,75 40,70 50,70 C60,70 70,75 75,85" stroke="#003399" strokeWidth="3" fill="none"/>
    </svg>
);
