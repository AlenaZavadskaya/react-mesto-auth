export const BASE_URL =
  "https://api.alenazavadskaya.students.nomoredomains.monster";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    return getResponse(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return getResponse(res);
  });
};
