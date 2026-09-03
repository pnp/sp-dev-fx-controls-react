export interface IGroup {
  id: string;
  displayName: string;
  description?: string;
  groupTypes?: string[];
  mailEnabled?: boolean;
  mail?: string;
  securityEnabled?: boolean;
  visibility?: string;
  resourceProvisioningOptions?: string[];
}
