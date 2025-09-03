import React, { useState, useEffect } from "react";
import type { EmployeeDto } from "../interfaces/EmployeeDto";
import { employeeService } from "../services/employeeService";
import EmployeeMenu from "./EmployeeMenu";
import EmployeeListView from "../views/EmployeeListView";
import SalaryIncreaseView from "../views/SalaryIncreaseView";
import GroupedEmployeesView from "../views/GroupedEmployeesView";
import BirthdayEmployeesView from "../views/BirthdayEmployeesView";
import OldestEmployeeView from "../views/OldestEmployeeView";
import SortedEmployeesView from "../views/SortedEmployeesView";
import SalarySumView from "../views/SalarySumView";
import MinimumWageView from "../views/MinimumWageView";

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("list");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (selectedMenu === "list") {
      fetchEmployees();
    }
  }, [selectedMenu]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    setError("");
    try {
      await employeeService.deleteEmployee(id);

      fetchEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  const increaseSalary = async (percentage: number) => {
    setError("");
    try {
      const data = await employeeService.increaseSalary(percentage);
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "list":
        return <EmployeeListView employees={employees} loading={loading} onDeleteEmployee={deleteEmployee} />;

      case "increase":
        return <SalaryIncreaseView onIncreaseSalary={increaseSalary} />;

      case "grouped":
        return <GroupedEmployeesView />;

      case "birthdays":
        return <BirthdayEmployeesView />;

      case "oldest":
        return <OldestEmployeeView />;

      case "sorted":
        return <SortedEmployeesView />;

      case "salarySum":
        return <SalarySumView />;

      case "minimumWage":
        return <MinimumWageView />;

      default:
        return <div className="text-center text-gray-500">Selecione uma opção do menu</div>;
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Sistema de Gerenciamento de Funcionários</h1>
        <p className="text-center text-gray-600 mt-2">Gerencie todos os funcionários da empresa em um só lugar</p>
      </header>

      <EmployeeMenu selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {error}
        </div>
      )}

      <main className="bg-white rounded-lg shadow-md p-6">{renderContent()}</main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2023 Sistema de Gerenciamento de Funcionários. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default EmployeeManagement;
