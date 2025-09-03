import React from "react";

interface EmployeeMenuProps {
  selectedMenu: string;
  onMenuSelect: (menu: string) => void;
}

const EmployeeMenu: React.FC<EmployeeMenuProps> = ({ selectedMenu, onMenuSelect }) => {
  const menuItems = [
    { id: "list", label: "Listar Funcionários", icon: "👥" },
    { id: "increase", label: "Aumentar Salários", icon: "💰" },
    { id: "grouped", label: "Agrupar por Função", icon: "📊" },
    { id: "birthdays", label: "Aniversariantes", icon: "🎂" },
    { id: "oldest", label: "Funcionário Mais Velho", icon: "👴" },
    { id: "sorted", label: "Ordenar por Nome", icon: "🔤" },
    { id: "salarySum", label: "Soma de Salários", icon: "🧮" },
    { id: "minimumWage", label: "Salários Mínimos", icon: "📉" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
        Menu de Funcionalidades
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => onMenuSelect(item.id)} className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${selectedMenu === item.id ? "bg-primary-600 text-white shadow-md transform -translate-y-1" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeMenu;
