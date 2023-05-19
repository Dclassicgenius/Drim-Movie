import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
interface Keyword {
  id: number;
  name: string;
}

export const fetchKeywords = async (query: string): Promise<Keyword[]> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return [];
  }
};
