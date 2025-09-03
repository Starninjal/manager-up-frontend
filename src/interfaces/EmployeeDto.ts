import type { EmployeeFunction } from "./EmployeeFunction";
import type { PersonData } from "./PersonData";

export interface EmployeeDto extends PersonData {
  employeeId: number;
  salary: number;
  employeeFunctionDto: EmployeeFunction;
  salaryFormatted?: string;
  birthDateFormatted?: string;
}

export interface GroupedEmployees {
  [key: string]: EmployeeDto[];
}

export interface MinimumWageGroup {
  [key: number]: EmployeeDto[];
}
