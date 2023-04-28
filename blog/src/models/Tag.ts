export interface Tag {
  id: number;
  name: string;
  link: string;
  slug: string;
}

const res = await fetch("http://localhost:3001/tags");
export const tags: Tag[] = await res.json();
