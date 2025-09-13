import api from "../../services/axios";

export const createTab = async ({ tabName, date }) => {
  try {
    const response = await api.post("/tabs", {
      name: tabName,
      date,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
