import { useQuery } from "@tanstack/react-query";
import { Person } from "../../components/People/PeopleType";
import axiosInstance from "../axiosInstance";

const fetchPersonDetail = (personId: number) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  return axiosInstance
    .get<Person>(
      `person/${personId}?api_key=${apiKey}&language=en-US&append_to_response=combined_credits,external_ids`
    )
    .then((response) => response.data);
};

export const useCastProfile = (personId: number) => {
  return useQuery(["useCastProfile", personId], () =>
    fetchPersonDetail(personId)
  );
};
