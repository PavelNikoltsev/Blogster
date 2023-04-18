export interface Comment {
  id: number;
  author: string;
  content: string;
  created: string;
  parent: number;
  rating: 1 | 2 | 3 | 4 | 5;
}
