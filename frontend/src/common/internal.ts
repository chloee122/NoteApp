export interface Note {
  id: string;
  content: string;
  important: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  name: string;
  username: string;
}

export type User = Omit<AuthResponse, "accessToken" | "refreshToken">;
