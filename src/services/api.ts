const isDev = import.meta.env.DEV;

const API_BASE_URL = isDev ? "http://localhost:8080/employee" : "/employee";

export const api = {
  getEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/list`);
    if (!response.ok) throw new Error("Erro ao buscar funcionários");
    return response.json();
  },

  deleteEmployee: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar funcionário");
    return response;
  },

  increaseSalary: async (percentage: number) => {
    const response = await fetch(`${API_BASE_URL}?increaseSalaryPercentage=${percentage}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Erro ao aumentar salários");
    return response.json();
  },

  getGroupedByFunction: async () => {
    const response = await fetch(`${API_BASE_URL}/group-by-function-name`);
    if (!response.ok) throw new Error("Erro ao buscar funcionários agrupados");
    return response.json();
  },

  getBirthdayEmployees: async (startMonth: number, endMonth: number) => {
    const response = await fetch(`${API_BASE_URL}/birthdays?startMonthValue=${startMonth}&endMonthValue=${endMonth}`);
    if (!response.ok) throw new Error("Erro ao buscar aniversariantes");
    return response.json();
  },

  getOldestEmployee: async () => {
    const response = await fetch(`${API_BASE_URL}/max-age`);
    if (!response.ok) throw new Error("Erro ao buscar funcionário mais velho");
    return response.json();
  },

  getSortedEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/list/sorted`);
    if (!response.ok) throw new Error("Erro ao buscar funcionários ordenados");
    return response.json();
  },

  getSalarySum: async () => {
    const response = await fetch(`${API_BASE_URL}/salary-sum`);
    if (!response.ok) throw new Error("Erro ao buscar soma de salários");
    return response.text();
  },

  getMinimumWage: async () => {
    const response = await fetch(`${API_BASE_URL}/minimum-wage`);
    if (!response.ok) throw new Error("Erro ao buscar salários mínimos");
    return response.json();
  },
};
