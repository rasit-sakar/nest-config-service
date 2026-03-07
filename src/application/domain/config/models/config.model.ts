import { ConfigHistory } from './config-history.model';

export interface Config {
  id: string;
  name: string;
  value: string;
  environment: ConfigEnvironment;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  history: ConfigHistory[];
}

export enum ConfigEnvironment {
  TEST = 'TEST',
  UAT = 'UAT',
  PROD = 'PROD',
  ALL = 'ALL',
}
