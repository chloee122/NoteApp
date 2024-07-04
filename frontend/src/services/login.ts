import axios from "axios";
import { User } from "../common/internal";
const baseUrl = "/api/login";

interface CredentialsType {
  username: string;
  password: string;
}

interface LoginResponse {
  data: {
    name: string;
    token: string;
    username: string;
  };
}

const login = async (credentials: CredentialsType): Promise<User> => {
  const response: LoginResponse = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
