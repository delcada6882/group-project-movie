export interface User {
  email: `${string}@${string}.${string}`;
  username: string;
  password: string;
}

export type UserList = User[];
