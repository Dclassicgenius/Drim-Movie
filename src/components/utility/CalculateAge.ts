export function calculateAge(birthday: string, deathday?: string) {
  const birthDate = new Date(birthday);
  const currentDate = deathday ? new Date(deathday) : new Date();
  const currentYear = currentDate.getFullYear();
  const birthYear = birthDate.getFullYear();
  const age = currentYear - birthYear;

  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  if (deathday) {
    // Calculate age at death
    const deathYear = currentDate.getFullYear();
    const deathMonth = currentDate.getMonth();
    const deathDay = currentDate.getDate();

    if (
      birthMonth > deathMonth ||
      (birthMonth === deathMonth && birthDate.getDate() > deathDay)
    ) {
      return deathYear - birthYear - 1;
    } else {
      return deathYear - birthYear;
    }
  }

  return age;
}
