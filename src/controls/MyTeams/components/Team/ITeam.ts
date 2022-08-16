export interface ITeam {
  id: string;
  createdDateTime?: string;
  displayName: string;
  description: string;
  internalId?: string;
  classification?: string;
  specialization?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  visibility?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  webUrl?: string;
  isArchived: boolean;
  isMembershipLimitedToOwners?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  memberSettings?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  guestSettings?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  messagingSettings?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  funSettings?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  discoverySettings?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

