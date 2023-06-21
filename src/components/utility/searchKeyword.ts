import axios from "axios";
import axiosInstance from "../../hooks/axiosInstance";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
interface Keyword {
  id: number;
  name: string;
}

export const fetchKeywords = async (query: string): Promise<Keyword[]> => {
  try {
    const response = await axiosInstance.get(
      `search/keyword?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return [];
  }
};
