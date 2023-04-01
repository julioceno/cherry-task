export interface ITask {
  id?: string;
  indice: number;
  label: Nullable<string>;
  checked: boolean;
  focus: boolean;
}
