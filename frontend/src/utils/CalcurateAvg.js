export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }

  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  return { years, months };
};

const calculateAgeInYears = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }

  return years + months / 12;
};

export const averageAge = (filteredChildren) => {
  if (filteredChildren.length === 0) return 0;
  const totalAge = filteredChildren.reduce(
    (sum, child) => sum + calculateAgeInYears(child.dob),
    0
  );
  return (totalAge / filteredChildren.length).toFixed(1);
};

export const averageWeightBody = (filteredChildren) => {
  if (filteredChildren.length === 0) return 0;
  const totalWeight = filteredChildren.reduce(
    (sum, child) => sum + child.weightBody,
    0
  );
  return (totalWeight / filteredChildren.length).toFixed(1);
};

export const averageHeigtBody = (filteredChildren) => {
  if (filteredChildren.length === 0) return 0;
  const totalWeight = filteredChildren.reduce(
    (sum, child) => sum + child.heightBody,
    0
  );
  return (totalWeight / filteredChildren.length).toFixed(1);
};
