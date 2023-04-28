import type { Comment } from "./Comment";
import type { Post } from "./Post";

type userRoles = "client" | "admin";
const defaultRole: userRoles = "client";
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

const res = await fetch("http://localhost:3001/users");
export const users: User[] = await res.json();
