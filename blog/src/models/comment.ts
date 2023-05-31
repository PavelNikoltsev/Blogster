export interface NewComment {
  author?: number;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  parent: number | null | undefined;
  post: number;
  reply: boolean | undefined;
}
export interface Comment extends NewComment {
  id: number;
}
