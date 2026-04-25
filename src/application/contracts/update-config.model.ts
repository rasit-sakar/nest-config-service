export class UpdateConfigInput {
  name?: string;
  value?: string;
  environment?: string;
  space?: string;
  description?: string;
  isSecret?: boolean;
  isDisabled?: boolean;
  updateReason: string;
}
