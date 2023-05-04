export interface NewTag {
  name?: string;
  link?: string;
  slug?: string;
}
export interface Tag extends NewTag {
  id: number;
}

const res = await fetch("http://localhost:3001/tags");
export const tags: Tag[] = await res.json();
