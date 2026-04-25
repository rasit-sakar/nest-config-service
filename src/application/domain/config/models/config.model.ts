export interface Config {
  id: string;
  name: string;
  value: string;
  description?: string;
  isSecret: boolean;
  createdAt: Date;
  updatedAt: Date;
}
