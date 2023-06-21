import { IVideo } from "../../types";
import { getCertification } from "./getMovieCertification";
import { IUniqueCrew, getUniqueImportantCrew } from "./getUniqueImportantCrew";

function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return { hours, minutes: remainingMinutes };
}

export const processMedia = (data: any, detailType: "movie" | "tv") => {
  const { hours, minutes } = convertMinutesToHoursAndMinutes(
    detailType === "movie" ? data.runtime : data.episode_run_time[0] || 0
  );

  const title =
    detailType === "movie" ? data.title || data.original_title : data.name;
  const releaseDate =
    detailType === "movie" ? data.release_date : data.first_air_date;

  const certification = getCertification(data, detailType);
  const uniqueImportantCrew: IUniqueCrew[] = getUniqueImportantCrew(
    data.credits
  );
  let trailer: IVideo | undefined;

  if (data) {
    const videos: IVideo[] = data.videos.results || [];

    trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (!trailer) {
      trailer = videos.find(
        (video) =>
          video.type === "Teaser" ||
          video.type === "Clip" ||
          (video.type === "Opening Credits" && video.site === "YouTube")
      );
    }
  }

  return {
    hours,
    minutes,
    releaseDate,
    title,
    trailer,
    certification,
    uniqueImportantCrew,
  };
};
