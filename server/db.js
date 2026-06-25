// Data layer — libSQL (@libsql/client).
// Local dev: a local SQLite file (file:content.db).
// Production (Vercel): Turso, via TURSO_DATABASE_URL + TURSO_AUTH_TOKEN env vars.
// Same code path either way.
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { createClient } = require("@libsql/client");
const { DEFAULTS } = require("./content-schema");

const url = process.env.TURSO_DATABASE_URL || "file:" + path.join(__dirname, "..", "content.db");
const authToken = process.env.TURSO_AUTH_TOKEN; // undefined for local file (fine)
const client = createClient({ url, authToken });

const nowISO = () => new Date().toISOString();
const one = (res) => res.rows[0];

async function initDb() {
  await client.batch(
    [
      `CREATE TABLE IF NOT EXISTS content (
         page TEXT PRIMARY KEY, data TEXT NOT NULL, updated_at TEXT NOT NULL )`,
      `CREATE TABLE IF NOT EXISTS users (
         username TEXT PRIMARY KEY, password_hash TEXT NOT NULL )`,
      `CREATE TABLE IF NOT EXISTS sessions (
         token TEXT PRIMARY KEY, username TEXT NOT NULL, created_at TEXT NOT NULL )`,
      `CREATE TABLE IF NOT EXISTS media (
         filename TEXT PRIMARY KEY, original TEXT, url TEXT, created_at TEXT NOT NULL )`,
    ],
    "write"
  );
}

// ---- content ----
async function getContent(page) {
  const res = await client.execute({ sql: "SELECT data FROM content WHERE page = ?", args: [page] });
  const row = one(res);
  if (row) return JSON.parse(row.data);
  return DEFAULTS[page] || null;
}

async function saveContent(page, data) {
  await client.execute({
    sql: `INSERT INTO content (page, data, updated_at) VALUES (?, ?, ?)
          ON CONFLICT(page) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
    args: [page, JSON.stringify(data), nowISO()],
  });
}

// ---- users / auth ----
async function getUser(username) {
  return one(await client.execute({ sql: "SELECT * FROM users WHERE username = ?", args: [username] }));
}

async function createUser(username, password) {
  const hash = bcrypt.hashSync(password, 10);
  await client.execute({
    sql: `INSERT INTO users (username, password_hash) VALUES (?, ?)
          ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash`,
    args: [username, hash],
  });
}

async function verifyUser(username, password) {
  const u = await getUser(username);
  if (!u) return false;
  return bcrypt.compareSync(password, u.password_hash);
}

// ---- sessions ----
async function createSession(username) {
  const token = crypto.randomBytes(32).toString("hex");
  await client.execute({
    sql: "INSERT INTO sessions (token, username, created_at) VALUES (?, ?, ?)",
    args: [token, username, nowISO()],
  });
  return token;
}

async function getSession(token) {
  if (!token) return null;
  return one(await client.execute({ sql: "SELECT * FROM sessions WHERE token = ?", args: [token] })) || null;
}

async function deleteSession(token) {
  if (!token) return;
  await client.execute({ sql: "DELETE FROM sessions WHERE token = ?", args: [token] });
}

// ---- media ----
async function recordMedia(filename, original, url) {
  await client.execute({
    sql: "INSERT OR REPLACE INTO media (filename, original, url, created_at) VALUES (?, ?, ?, ?)",
    args: [filename, original || "", url, nowISO()],
  });
}

async function listMedia() {
  return (await client.execute("SELECT * FROM media ORDER BY created_at DESC")).rows;
}

module.exports = {
  initDb,
  getContent,
  saveContent,
  getUser,
  createUser,
  verifyUser,
  createSession,
  getSession,
  deleteSession,
  recordMedia,
  listMedia,
};
