export const checkAdmin = (roles) => {
  return roles.map((role) => role.title).includes("Admin");
};
