import { ICrew, Jobs } from "../Cast/castType";

export interface IUniqueCrew extends Omit<ICrew, "job"> {
  jobs: Jobs[];
}

export const getUniqueImportantCrew = (data: {
  crew?: ICrew[];
}): IUniqueCrew[] => {
  const importantJobs = [
    "Director",
    "Screenplay",
    "Writer",
    "Characters",
    "Novel",
    "Creator",
    "Story",
  ];

  function isJobs(value: any): value is Jobs {
    return (
      value !== undefined &&
      typeof value.credit_id === "string" &&
      typeof value.job === "string" &&
      typeof value.episode_count === "number"
    );
  }

  const importantCrew: ICrew[] = (data?.crew || []).filter((person: ICrew) => {
    return isJobs(person.job);
  });

  return importantCrew.reduce<IUniqueCrew[]>((acc, crew) => {
    const existingCrew = acc.find((item) => item.name === crew.name);
    if (existingCrew && isJobs(crew.job)) {
      existingCrew.jobs.push(crew.job);
    } else if (isJobs(crew.job)) {
      acc.push({ ...crew, jobs: [crew.job] });
    }
    return acc;
  }, []);
};
