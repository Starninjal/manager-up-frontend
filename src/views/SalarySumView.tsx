import React, { useState, useEffect } from "react";
import { employeeService } from "../services/employeeService";

const SalarySumView: React.FC = () => {
  const [salarySum, setSalarySum] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await employeeService.getSalarySum();
        setSalarySum(data);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Soma Total dos Salários</h2>

      <div className="card max-w-md mx-auto text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Total da Folha de Pagamento</h3>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-3xl font-bold text-green-700">{salarySum}</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Informações
          </h4>
          <p className="text-blue-700 text-sm">Este valor representa a soma total de todos os salários dos funcionários da empresa, incluindo possíveis bônus e benefícios.</p>
        </div>
      </div>
    </div>
  );
};

export default SalarySumView;
