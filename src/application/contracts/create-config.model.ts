export class CreateConfigInput {
  name: string;
  value: string;
  space: string;
  description?: string;
  isSecret: boolean;
  isDisabled: boolean;
}
