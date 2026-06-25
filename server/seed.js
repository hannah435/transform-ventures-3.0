// Creates the initial admin user. Run: npm run seed
// Override credentials with env vars: ADMIN_USER, ADMIN_PASS
const { initDb, createUser, getUser } = require("./db");

const username = process.env.ADMIN_USER || "admin";
const password = process.env.ADMIN_PASS || "transform2026";

(async () => {
  await initDb();
  const existed = !!(await getUser(username));
  await createUser(username, password);

  console.log("");
  console.log("  ✔ Admin account ready");
  console.log("  ──────────────────────────────");
  console.log("  Username: " + username);
  console.log("  Password: " + password + (existed ? "  (updated)" : ""));
  console.log("  ──────────────────────────────");
  console.log("  Log in at: /admin");
  console.log("");
  process.exit(0);
})().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
