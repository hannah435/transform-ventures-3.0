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
      `CREATE TABLE IF NOT EXISTS messages (
         id TEXT PRIMARY KEY, name TEXT, email TEXT, topic TEXT, message TEXT,
         read INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL )`,
    ],
    "write"
  );
}

// ---- messages (contact form) ----
async function addMessage({ name, email, topic, message }) {
  const id = crypto.randomBytes(12).toString("hex");
  await client.execute({
    sql: "INSERT INTO messages (id, name, email, topic, message, read, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)",
    args: [id, name, email, topic || "", message, nowISO()],
  });
  return id;
}

async function listMessages() {
  return (await client.execute("SELECT * FROM messages ORDER BY created_at DESC")).rows;
}

async function setMessageRead(id, read) {
  await client.execute({ sql: "UPDATE messages SET read = ? WHERE id = ?", args: [read ? 1 : 0, id] });
}

async function deleteMessage(id) {
  await client.execute({ sql: "DELETE FROM messages WHERE id = ?", args: [id] });
}

async function unreadMessageCount() {
  const r = one(await client.execute("SELECT COUNT(*) AS n FROM messages WHERE read = 0"));
  return Number(r ? r.n : 0);
}

// ---- content ----
// Merge saved content over the defaults so newly-added fields/sections always have a
// value, even on rows saved before the field existed. Arrays are taken from `stored`
// as-is (a saved list replaces the default list); objects merge key-by-key.
function mergeDefaults(def, stored) {
  if (stored === undefined) return def;
  if (def === undefined || def === null) return stored;
  if (Array.isArray(def) || Array.isArray(stored)) return stored;
  if (typeof def === "object" && typeof stored === "object") {
    const out = { ...def };
    for (const k of Object.keys(stored)) out[k] = mergeDefaults(def[k], stored[k]);
    return out;
  }
  return stored;
}

async function getContent(page) {
  const res = await client.execute({ sql: "SELECT data FROM content WHERE page = ?", args: [page] });
  const row = one(res);
  const def = DEFAULTS[page] || null;
  if (row) {
    const stored = JSON.parse(row.data);
    return def ? mergeDefaults(def, stored) : stored;
  }
  return def;
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
  addMessage,
  listMessages,
  setMessageRead,
  deleteMessage,
  unreadMessageCount,
};
