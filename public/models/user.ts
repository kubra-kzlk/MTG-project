// src/interfaces/user.ts
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
  }
  export interface NewUser {
  username: string;
  email: string;
  password: string;
}