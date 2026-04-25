export class CreateConfigInput {
  name: string;
  value: string;
  environment: string;
  space: string;
  description?: string;
  isSecret: boolean;
  isDisabled: boolean;
}
