export const login = () => {
  return {
    type: "LOGIN",
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setData = (data) => ({
  type: "SET_DATA",
  payload: data,
});
