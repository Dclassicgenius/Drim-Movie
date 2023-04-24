import { ICountryRelease } from "../Detail/movieDetailType";

export interface IData {
  releases?: {
    countries?: ICountryRelease[];
  };
}

export const getMovieCertification = (data: IData): string => {
  const availableCertification = data?.releases?.countries?.find(
    (country) => country.certification !== ""
  );

  const usCertification = data?.releases?.countries?.find(
    (country) => country.iso_3166_1 === "US"
  )?.certification;

  return (
    usCertification || availableCertification?.certification || "Not available"
  );
};
