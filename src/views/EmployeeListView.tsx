import React from "react";
import type { EmployeeDto } from "../interfaces/EmployeeDto";

interface EmployeeListViewProps {
  employees: EmployeeDto[];
  loading: boolean;
  onDeleteEmployee: (id: number) => void;
}

const EmployeeListView: React.FC<EmployeeListViewProps> = ({ employees, loading, onDeleteEmployee }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Funcionários</h2>
        <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">{employees.length} funcionário(s)</span>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <p className="mt-4 text-gray-500">Nenhum funcionário encontrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="table-header">ID</th>
                <th className="table-header">Nome</th>
                <th className="table-header">Data de Nascimento</th>
                <th className="table-header">Idade</th>
                <th className="table-header">Função</th>
                <th className="table-header">Salário</th>
                <th className="table-header">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.employeeId} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-mono text-sm">{employee.employeeId}</td>
                  <td className="table-cell font-medium">{employee.name}</td>
                  <td className="table-cell">{employee.birthDateFormatted || employee.birthDate}</td>
                  <td className="table-cell">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">{employee.age} anos</span>
                  </td>
                  <td className="table-cell">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">{employee.employeeFunctionDto.name}</span>
                  </td>
                  <td className="table-cell font-medium text-green-700">{employee.salaryFormatted || `R$ ${employee.salary.toLocaleString("pt-BR")}`}</td>
                  <td className="table-cell">
                    <button onClick={() => onDeleteEmployee(employee.employeeId)} className="btn-danger text-sm py-1 px-3 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeListView;
