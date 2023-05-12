import { fetcher } from "../utils/fetcher";
import type { Category } from "./category";
import type { Comment } from "./comment";
import type { Page } from "./page";
import type { Post } from "./post";
import type { Tag } from "./tag";
import type { User } from "./user";

async function load() {
  let postRecords: Post[] = [];
  let categoryRecords: Category[] = [];
  let userRecords: User[] = [];
  let tagRecords: Tag[] = [];
  let pageRecords: Page[] = [];
  let commentRecords: Comment[] = [];
  const requests = [
    fetcher.get("/posts").then((resp) => (postRecords = resp)),
    fetcher.get("/categories").then((resp) => (categoryRecords = resp)),
    fetcher.get("/users").then((resp) => (userRecords = resp)),
    fetcher.get("/tags").then((resp) => (tagRecords = resp)),
    fetcher.get("/pages").then((resp) => (pageRecords = resp)),
    fetcher.get("/comments").then((resp) => (commentRecords = resp)),
  ];

  await Promise.all(requests);
  return {
    posts: postRecords,
    categories: categoryRecords,
    users: userRecords,
    tags: tagRecords,
    pages: pageRecords,
    comments: commentRecords,
  };
}

export const store = await load();
