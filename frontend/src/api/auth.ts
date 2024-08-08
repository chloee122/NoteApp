import axios from "axios";
import type { LoginInFormData, SignUpFormData } from "../common/api.types";
import type { AuthResponse } from "../common/internal";

const baseUrl = "api/auth";

export const login = async (logInFormData: LoginInFormData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${baseUrl}/log-in`, logInFormData);
  return response.data;
};

export const createUser = async (signUpFormData: SignUpFormData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${baseUrl}/sign-up`, signUpFormData);
  return response.data;
};
