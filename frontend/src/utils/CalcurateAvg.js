function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  
export const averageAge = (filteredChildren) => {
  if (filteredChildren.length === 0) return 0;
  const totalAge = filteredChildren.reduce(
    (sum, child) => sum + calculateAge(child.dob),
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
