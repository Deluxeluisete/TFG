import { User } from "./user";

export interface UsersResponse {
  users: User[];
}

export interface UserResponse {
  user: User;
}

export interface TokenResponse {
  accessToken: string;
}
