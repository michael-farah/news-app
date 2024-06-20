import Cookies from "js-cookie";

export const getUserFromCookie = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

export const setUserInCookie = (user) => {
  if (user) {
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
  } else {
    Cookies.remove("user");
  }
};