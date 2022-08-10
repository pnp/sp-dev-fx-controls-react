export interface ITeamMenber  {
  '@odata.type': string;
  id: string;
  roles: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  displayName: string;
  userId: string;
  email: string;
}
