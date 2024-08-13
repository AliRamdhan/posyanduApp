export const validateNomorKKNIK = (number) => {
  const regex = /^\d{16}$/;
  if (regex.test(number)) {
    return true;
  } else {
    return false;
  }
};

export const validateNomorHp = (number) => {
  const regex = /^\d{10,13}$/;
  if (regex.test(number)) {
    return true;
  } else {
    return false;
  }
};

export const handleNumericInput = (event, field) => {
  event.target.value = event.target.value.replace(/\D/g, "");
};

export const handleNumericInputDecimal = (event, field) => {
  event.target.value = event.target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
};

export const isBalita = (dob) => {
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
  if (age < 2) {
    return true;
  } else {
    return false;
  }
};
