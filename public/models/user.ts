export interface User {
  _id: string;
  email: string;
  password: string;
}

export interface NewUser {
  email: string;
  password: string;
}