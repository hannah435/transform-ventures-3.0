// Image storage — Vercel Blob in production, local disk in dev.
// Production is detected by the presence of BLOB_READ_WRITE_TOKEN (set by Vercel Blob).
const fs = require("node:fs");
const path = require("path");
const crypto = require("crypto");

const UPLOADS = path.join(__dirname, "..", "uploads");
// Use Vercel Blob when either the classic RW token OR the newer store-id + OIDC
// connection is present (the SDK resolves OIDC auth automatically at runtime).
const useBlob = !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

function makeName(originalname) {
  const ext = (path.extname(originalname || "").toLowerCase().replace(/[^.a-z0-9]/g, "")) || ".img";
  return crypto.randomBytes(8).toString("hex") + ext;
}

// Returns { filename, url }
async function saveImage(buffer, originalname, mimetype) {
  const filename = makeName(originalname);
  if (useBlob) {
    const { put } = require("@vercel/blob");
    const blob = await put("uploads/" + filename, buffer, {
      access: "public",
      contentType: mimetype || "application/octet-stream",
    });
    return { filename, url: blob.url };
  }
  fs.mkdirSync(UPLOADS, { recursive: true });
  fs.writeFileSync(path.join(UPLOADS, filename), buffer);
  return { filename, url: "uploads/" + filename };
}

module.exports = { saveImage, UPLOADS, useBlob };
