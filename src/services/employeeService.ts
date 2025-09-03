import { api } from "./api";
import type { EmployeeDto, GroupedEmployees, MinimumWageGroup } from "../interfaces/EmployeeDto";

export const employeeService = {
  getAllEmployees: async (): Promise<EmployeeDto[]> => {
    try {
      return await api.getEmployees();
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      throw new Error("Falha ao carregar funcionários");
    }
  },

  deleteEmployee: async (id: number): Promise<void> => {
    try {
      await api.deleteEmployee(id);
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      throw new Error("Falha ao excluir funcionário");
    }
  },

  increaseSalary: async (percentage: number): Promise<EmployeeDto[]> => {
    try {
      return await api.increaseSalary(percentage);
    } catch (error) {
      console.error("Erro ao aumentar salários:", error);
      throw new Error("Falha ao aumentar salários");
    }
  },

  getEmployeesGroupedByFunction: async (): Promise<GroupedEmployees> => {
    try {
      return await api.getGroupedByFunction();
    } catch (error) {
      console.error("Erro ao buscar funcionários agrupados:", error);
      throw new Error("Falha ao carregar funcionários agrupados");
    }
  },

  getBirthdayEmployees: async (startMonth: number, endMonth: number): Promise<EmployeeDto[]> => {
    try {
      return await api.getBirthdayEmployees(startMonth, endMonth);
    } catch (error) {
      console.error("Erro ao buscar aniversariantes:", error);
      throw new Error("Falha ao carregar aniversariantes");
    }
  },

  getOldestEmployee: async (): Promise<EmployeeDto> => {
    try {
      return await api.getOldestEmployee();
    } catch (error) {
      console.error("Erro ao buscar funcionário mais velho:", error);
      throw new Error("Falha ao carregar funcionário mais velho");
    }
  },

  getSortedEmployees: async (): Promise<EmployeeDto[]> => {
    try {
      return await api.getSortedEmployees();
    } catch (error) {
      console.error("Erro ao buscar funcionários ordenados:", error);
      throw new Error("Falha ao carregar funcionários ordenados");
    }
  },

  getSalarySum: async (): Promise<string> => {
    try {
      return await api.getSalarySum();
    } catch (error) {
      console.error("Erro ao buscar soma de salários:", error);
      throw new Error("Falha ao carregar soma de salários");
    }
  },

  getMinimumWage: async (): Promise<MinimumWageGroup> => {
    try {
      return await api.getMinimumWage();
    } catch (error) {
      console.error("Erro ao buscar salários mínimos:", error);
      throw new Error("Falha ao carregar salários mínimos");
    }
  },
};
