import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Person } from "../../components/People/PeopleType";

const fetchPersonDetail = async (personId: number): Promise<Person> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get<Person>(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US&append_to_response=combined_credits,external_ids`
  );

  return response.data;
};

export const useCastProfile = (
  personId: number
): UseQueryResult<Person, Error> => {
  return useQuery(["useCastProfile", personId], () =>
    fetchPersonDetail(personId)
  );
};
