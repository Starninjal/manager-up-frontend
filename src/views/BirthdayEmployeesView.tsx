import React, { useState, useEffect } from "react";
import type { EmployeeDto } from "../interfaces/EmployeeDto";
import { employeeService } from "../services/employeeService";

const BirthdayEmployeesView: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [startMonth, setStartMonth] = useState<number>(10);
  const [endMonth, setEndMonth] = useState<number>(12);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await employeeService.getBirthdayEmployees(startMonth, endMonth);
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startMonth, endMonth]);

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Aniversariantes</h2>

      <div className="card mb-6">
        <div className="flex items-center mb-4 text-pink-600">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V5a2 2 0 012-2h14a2 2 0 012 2v10.546z"></path>
          </svg>
          <h3 className="text-lg font-semibold">Filtrar por Mês de Aniversário</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mês inicial</label>
            <select value={startMonth} onChange={(e) => setStartMonth(Number(e.target.value))} className="input-field">
              {monthNames.map((name, index) => (
                <option key={index + 1} value={index + 1}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Mês final</label>
            <select value={endMonth} onChange={(e) => setEndMonth(Number(e.target.value))} className="input-field">
              {monthNames.map((name, index) => (
                <option key={index + 1} value={index + 1}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={fetchData} className="btn-secondary flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Atualizar Filtro
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-red-700">{error}</p>
        </div>
      ) : employees.length > 0 ? (
        <div className="card">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">
              Aniversariantes de {monthNames[startMonth - 1]} a {monthNames[endMonth - 1]}
            </h3>
            <span className="ml-3 bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full">{employees.length} aniversariante(s)</span>
          </div>

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="table-header">Nome</th>
                  <th className="table-header">Data de Nascimento</th>
                  <th className="table-header">Idade</th>
                  <th className="table-header">Função</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.employeeId} className="hover:bg-gray-50 transition-colors">
                    <td className="table-cell font-medium">{employee.name}</td>
                    <td className="table-cell">{employee.birthDateFormatted || employee.birthDate}</td>
                    <td className="table-cell">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">{employee.age} anos</span>
                    </td>
                    <td className="table-cell">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">{employee.employeeFunctionDto.name}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum aniversariante encontrado</h3>
          <p className="text-gray-500">
            Não há funcionários fazendo aniversário entre {monthNames[startMonth - 1]} e {monthNames[endMonth - 1]}.
          </p>
        </div>
      )}
    </div>
  );
};

export default BirthdayEmployeesView;
