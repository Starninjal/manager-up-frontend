import React, { useState } from "react";

interface SalaryIncreaseViewProps {
  onIncreaseSalary: (percentage: number) => void;
}

const SalaryIncreaseView: React.FC<SalaryIncreaseViewProps> = ({ onIncreaseSalary }) => {
  const [increasePercentage, setIncreasePercentage] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onIncreaseSalary(increasePercentage);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Aumento de Salários</h2>

      <div className="card max-w-md mx-auto">
        <div className="flex items-center mb-6 text-yellow-600">
          <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-semibold">Aplicar Aumento Salarial</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Percentual de aumento (%)</label>
            <div className="relative">
              <input type="range" min="0" max="50" step="1" value={increasePercentage} onChange={(e) => setIncreasePercentage(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <output className="absolute top-6 right-0 bg-primary-600 text-white px-2 py-1 rounded text-sm font-medium">{increasePercentage}%</output>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Ou digite o valor manualmente:</label>
            <div className="relative">
              <input type="number" value={increasePercentage} onChange={(e) => setIncreasePercentage(Number(e.target.value))} className="input-field pr-12" min="0" max="100" step="0.1" />
              <span className="absolute right-3 top-2 text-gray-500">%</span>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center py-3">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Aplicar Aumento de {increasePercentage}%
          </button>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="text-yellow-700 text-sm">
              Esta ação aumentará o salário de <strong>todos os funcionários</strong> em {increasePercentage}%. A operação não pode ser desfeita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryIncreaseView;
