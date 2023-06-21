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
  detailType: "movie" | "tv",
  countryCode?: string
): string => {
  if (detailType === "movie") {
    const availableCertification = data?.releases?.countries?.find(
      (country) =>
        country.certification !== "" &&
        (!countryCode || country.iso_3166_1 === countryCode)
    );

    const usCertification = data?.releases?.countries?.find(
      (country) => country.iso_3166_1 === "US"
    )?.certification;

    return (
      usCertification ||
      availableCertification?.certification ||
      "Not available"
    );
  } else {
    const usCertification = data?.content_ratings?.results?.find(
      (country) => country.iso_3166_1 === "US"
    )?.rating;

    const availableRating = data?.content_ratings?.results?.find(
      (country) => !countryCode || country.iso_3166_1 === countryCode
    )?.rating;

    return usCertification || availableRating || "Not available";
  }

  return "Not available";
};
