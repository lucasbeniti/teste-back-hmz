export interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}