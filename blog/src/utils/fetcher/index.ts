export class Fetcher {
  url: string;
  constructor() {
    this.url = "http://localhost:3001";
  }
  async get(target: string) {
    const res = await fetch(`${this.url}${target}`);
    const result = await res.json();
    return result.rows;
  }
  async post<Type>(target: string, body: Type, user?: number) {
    const res = await fetch(`${this.url}${target}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: `${user}`,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
  async delete(target: string, user?: number) {
    const res = await fetch(`${this.url}${target}`, {
      method: "DELETE",
      headers: {
        user: `${user}`,
      },
    });
    return await res.json();
  }
  async put<Type>(target: string, body: Type, user?: number) {
    const res = await fetch(`${this.url}${target}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        user: `${user}`,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
}

export const fetcher = new Fetcher();
