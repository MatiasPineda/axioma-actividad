import axios from 'axios';
import jwt_decode from "jwt-decode";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_ID = 'user_id';
const BASE_URL = 'http://localhost:8000';

const tokenRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const loginUser = (dni, password) => {
  const loginBody = { dni, password };

  return tokenRequest.post('/api/token/', loginBody)
    .then((response) => {
      const access_token = response.data.access;
      window.localStorage.setItem(ACCESS_TOKEN, access_token);
      window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      window.localStorage.setItem(USER_ID, jwt_decode(access_token).user_id);
      return Promise.resolve(response.data);
    }).catch((error) => Promise.reject(error));
};

const isSessionKept = () => (
  ACCESS_TOKEN in window.localStorage && REFRESH_TOKEN in window.localStorage
);

const refreshToken = () => {
  const refreshBody = { refresh: window.localStorage.getItem(REFRESH_TOKEN) };

  return tokenRequest.post('/api/token/refresh/', refreshBody)
    .then((response) => {
      window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
      return Promise.resolve(response.data);
    }).catch((error) => Promise.reject(error));
};

const isCorrectRefreshError = (status) => status === 401;

const authRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
    'Content-Type': 'application/json',
  },
});

const logoutUser = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
  window.localStorage.removeItem(USER_ID);

  authRequest.defaults.headers.Authorization = '';
};

const errorInterceptor = (error) => {
  const originalRequest = error.config;
  const { status } = error.response;

  if (isCorrectRefreshError(status)) {
    return refreshToken().then(() => {
      const headerAuthorization = `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`;
      authRequest.defaults.headers.Authorization = headerAuthorization;
      originalRequest.headers.Authorization = headerAuthorization;
      return authRequest(originalRequest);
    }).catch(() => {
      // if token refresh fails, logout the user to avoid potential security risks.
      logoutUser();
      return Promise.reject(error);
    });
  }

  return Promise.reject(error);
};


authRequest.interceptors.response.use(
  (response) => response,
  (error) => errorInterceptor(error),

);

export {
  isSessionKept,
  tokenRequest,
  loginUser,
  logoutUser,
  refreshToken,
  authRequest,
  errorInterceptor,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_ID,
};