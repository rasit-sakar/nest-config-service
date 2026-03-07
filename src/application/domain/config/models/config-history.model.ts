export interface ConfigHistory {
  id: string;
  configId: string;
  updateReason: string;
  oldValue: string;
  newValue: string;
  enablementChange: boolean;
  changeDate: boolean;
}
