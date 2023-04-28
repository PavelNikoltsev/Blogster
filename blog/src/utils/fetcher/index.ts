export class Fetcher {
  url: string;
  constructor() {
    this.url = "http://localhost:3001";
  }
  async get(target: string) {
    const res = await fetch(`${this.url}${target}`);
    return await res.json();
  }
  async post<Type>(target: string, body: Type) {
    const res = await fetch(`${this.url}${target}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
  async delete(target: string) {
    const res = await fetch(`${this.url}${target}`, {
      method: "DELETE",
    });
    return await res.json();
  }
  async put<Type>(target: string, body: Type) {
    const res = await fetch(`${this.url}${target}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
  async patch<Type>(target: string, body: Type) {
    const res = await fetch(`${this.url}${target}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
}

export const fetcher = new Fetcher();
