export const getToken = () =>
  localStorage.getItem("user-token")
    ? localStorage.getItem("user-token")
    : null;
export const getAuthHeader = () => `Bearer ${getToken()}`;
