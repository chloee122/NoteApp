import { useEffect } from "react";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { noteApiClient } from "../api/notes";
import useAppContext from "./useAppContext";
import showToastError from "../utils/showToastError";
import getTokens from "../utils/getTokens";

interface AccessTokenResponse {
  accessToken: string;
}

const useAxiosInterceptors = () => {
  const { logout } = useAppContext();

  useEffect(() => {
    const requestInterceptor = noteApiClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const { accessToken } = getTokens();

        config.headers["authorization"] = `Bearer ${accessToken}`;

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = noteApiClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { refreshToken } = getTokens();
            const response = await axios.post<AccessTokenResponse>(
              "/api/auth/refresh",
              { refreshToken }
            );

            const accessToken = response.data.accessToken;

            const updatedTokens = { refreshToken, accessToken };
            window.localStorage.setItem(
              "tokens",
              JSON.stringify(updatedTokens)
            );

            noteApiClient.defaults.headers.common[
              "authorization"
            ] = `Bearer ${accessToken}`;
            originalRequest.headers["authorization"] = `Bearer ${accessToken}`;
            return noteApiClient(originalRequest);
          } catch (err) {
            showToastError(err);
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      noteApiClient.interceptors.request.eject(requestInterceptor);
      noteApiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);
};

export default useAxiosInterceptors;
