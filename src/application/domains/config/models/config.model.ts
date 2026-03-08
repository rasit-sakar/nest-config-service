import { ConfigHistory } from './config-history.model';

export interface Config {
  id: string;
  name: string;
  value: string;
  environment: string;
  space: string;
  description?: string;
  isSecret: boolean;
  createdAt: Date;
  updatedAt: Date;
  history: ConfigHistory[];
}
