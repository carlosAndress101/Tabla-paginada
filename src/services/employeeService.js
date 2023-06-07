import api from '../utils/api';

const employeeService = {
  getEmployees: async () => {
    try {
      const response = await api.get('/empleados/listar');
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },
};

export default employeeService;
