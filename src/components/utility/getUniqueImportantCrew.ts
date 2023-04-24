import { ICrew } from "../Cast/castType";

export interface IUniqueCrew extends Omit<ICrew, "job"> {
  jobs: string[];
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

  const importantCrew: ICrew[] = (data?.crew || []).filter((person: ICrew) =>
    importantJobs.includes(person.job)
  );

  return importantCrew.reduce<IUniqueCrew[]>((acc, crew) => {
    const existingCrew = acc.find((item) => item.name === crew.name);
    if (existingCrew) {
      existingCrew.jobs.push(crew.job);
    } else {
      acc.push({ ...crew, jobs: [crew.job] });
    }
    return acc;
  }, []);
};
