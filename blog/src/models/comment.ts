export interface NewComment {
  author: number;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  parent: number | null;
  post: number;
}
export interface Comment extends NewComment {
  id: number;
}
