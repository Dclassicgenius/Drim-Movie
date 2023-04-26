export interface ICountryRelease {
  iso_3166_1: string;
  certification: string;
}

export interface ICountryContentRating {
  iso_3166_1: string;
  rating: string;
}

export interface IData {
  releases?: {
    countries?: ICountryRelease[];
  };
  content_ratings?: {
    results?: ICountryContentRating[];
  };
}

export const getCertification = (
  data: IData,
  detailType: "movie" | "tv"
): string => {
  if (detailType === "movie") {
    const availableCertification = data?.releases?.countries?.find(
      (country) => country.certification !== ""
    );

    const usCertification = data?.releases?.countries?.find(
      (country) => country.iso_3166_1 === "US"
    )?.certification;

    return (
      usCertification ||
      availableCertification?.certification ||
      "Not available"
    );
  } else if (detailType === "tv") {
    const usCertification = data?.content_ratings?.results?.find(
      (country) => country.iso_3166_1 === "US"
    )?.rating;

    return usCertification || "Not available";
  }

  return "Not available";
};
