import React, { useState, useEffect } from "react";
import type { EmployeeDto, GroupedEmployees } from "../interfaces/EmployeeDto";
import { employeeService } from "../services/employeeService";

const GroupedEmployeesView: React.FC = () => {
  const [groupedEmployees, setGroupedEmployees] = useState<GroupedEmployees>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await employeeService.getEmployeesGroupedByFunction();
        setGroupedEmployees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Funcionários Agrupados por Função</h2>
        <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">{Object.keys(groupedEmployees).length} funções</span>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedEmployees).map(([functionName, employees]) => (
          <div key={functionName} className="card">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">{functionName}</h3>
              <span className="ml-3 bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">{employees.length} funcionário(s)</span>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="table-header">Nome</th>
                    <th className="table-header">Data de Nascimento</th>
                    <th className="table-header">Idade</th>
                    <th className="table-header">Salário</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((employee: EmployeeDto) => (
                    <tr key={employee.employeeId} className="hover:bg-gray-50 transition-colors">
                      <td className="table-cell font-medium">{employee.name}</td>
                      <td className="table-cell">{employee.birthDateFormatted || employee.birthDate}</td>
                      <td className="table-cell">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">{employee.age} anos</span>
                      </td>
                      <td className="table-cell font-medium text-green-700">{employee.salaryFormatted || `R$ ${employee.salary.toLocaleString("pt-BR")}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupedEmployeesView;
