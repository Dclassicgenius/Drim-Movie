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

  const importantCrew: ICrew[] = (data?.crew || []).filter((person: ICrew) => {
    return person.job && importantJobs.includes(person.job);
  });

  return importantCrew.reduce<IUniqueCrew[]>((acc, crew) => {
    const existingCrew = acc.find((item) => item.name === crew.name);
    if (existingCrew && crew.job) {
      const job: Jobs = {
        credit_id: crew.credit_id,
        job: crew.job,
        // episode_count: crew.episode_count,
      };
      existingCrew.jobs.push(job);
    } else if (crew.job) {
      const job: Jobs = {
        credit_id: crew.credit_id,
        job: crew.job,
        // episode_count: crew.episode_count,
      };
      acc.push({ ...crew, jobs: [job] });
    }
    return acc;
  }, []);
};
