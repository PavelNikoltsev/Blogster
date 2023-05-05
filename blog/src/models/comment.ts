export interface NewComment {
  author: string;
  content: string;
  rating: "1" | "2" | "3" | "4" | "5";
}
export interface Comment extends NewComment {
  id: number;
}
