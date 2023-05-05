export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: "client" | "admin";
}
export interface User extends NewUser {
  id: number;
  posts?: number[] | [];
  comments?: number[] | [];
}
