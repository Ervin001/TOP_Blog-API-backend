#! /usr/bin/env node

require('dotenv').config();

const { Client } = require('pg');

const SQL = `

 CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      email VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      roles TEXT DEFAULT 'guest'
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      owner INTEGER REFERENCES users(id),
      author VARCHAR(255) NOT NULL,
      title VARCHAR(100) NOT NULL,
      subtitle VARCHAR(50),
      teaser VARCHAR(200),
      content TEXT,
      featured_img_media VARCHAR(150) NOT NULL,
      categories TEXT[],
      published BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

async function main() {
  try {
    const client = new Client({
      connectionString: process.env.DB_URI,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done');
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

main();
