import type { EmployeeDto } from "./EmployeeDto";

export interface EmployeeFunction {
  employeeFunctionId: number;
  name: string;
  description: string;
  employeeDtoList?: EmployeeDto[];
}
