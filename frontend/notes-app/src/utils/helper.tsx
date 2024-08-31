export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getInitials = (name: string): string => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[nameParts.length - 1] ? nameParts[nameParts.length - 1][0] : "";
  return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
};