export interface NewTag {
  name?: string;
  link?: string;
  slug?: string;
}
export interface Tag extends NewTag {
  id: number;
}
