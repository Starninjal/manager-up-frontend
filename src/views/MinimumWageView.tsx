import React, { useState, useEffect } from "react";
import type { EmployeeDto, MinimumWageGroup } from "../interfaces/EmployeeDto";
import { employeeService } from "../services/employeeService";

const MinimumWageView: React.FC = () => {
  const [minimumWageData, setMinimumWageData] = useState<MinimumWageGroup>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await employeeService.getMinimumWage();
        setMinimumWageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Carregando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Salários Mínimos</h2>
      <div className="space-y-6">
        {Object.entries(minimumWageData).map(([wageCount, employees]) => (
          <div key={wageCount} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">{wageCount} salário(s) mínimo(s)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Nome</th>
                    <th className="py-2 px-4 text-left">Salário</th>
                    <th className="py-2 px-4 text-left">Salários Mínimos</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee: EmployeeDto) => (
                    <tr key={employee.employeeId} className="border-b">
                      <td className="py-2 px-4">{employee.name}</td>
                      <td className="py-2 px-4">{employee.salaryFormatted || `R$ ${employee.salary.toLocaleString("pt-BR")}`}</td>
                      <td className="py-2 px-4">{wageCount}</td>
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

export default MinimumWageView;
