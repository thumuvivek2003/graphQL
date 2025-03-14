export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Error {
  message: string;
}

export type UserResult = User | Error;
