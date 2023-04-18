// import { db } from "./index.js";

// interface Table {
//   query: string;
// }
// const tables: Table[] = [
//   {
//     query: `CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         email TEXT NOT NULL,
//         password TEXT NOT NULL,
//         role TEXT NOT NULL,
//         posts TEXT NOT NULL,
//         comments TEXT NOT NULL,
//         created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
//       )`,
//   },
//   {
//     query: `CREATE TABLE IF NOT EXISTS tags (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         slug TEXT NOT NULL,
//         link TEXT NOT NULL,
//       )`,
//   },
//   {
//     query: `CREATE TABLE IF NOT EXISTS posts (
//         id SERIAL PRIMARY KEY,
//         title TEXT NOT NULL,
//         description TEXT NOT NULL,
//         slug TEXT NOT NULL,
//         content TEXT NOT NULL,
//         status TEXT NOT NULL,
//         link TEXT NOT NULL,
//         tags TEXT NOT NULL,
//         category TEXT NOT NULL,
//         comments TEXT NOT NULL,
//         author TEXT NOT NULL,
//         created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
//       )`,
//   },
//   {
//     query: `CREATE TABLE IF NOT EXISTS comments (
//         id SERIAL PRIMARY KEY,
//         content TEXT NOT NULL,
//         author TEXT NOT NULL,
//         created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
//         parent TEXT NOT NULL,
//         rating SERIAL
//       )`,
//   },
// ];
