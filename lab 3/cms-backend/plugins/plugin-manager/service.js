import { pool } from "../../core/db.js";

export async function getPlugins() {
  const [rows] = await pool.query("SELECT * FROM plugins");
  return rows;
}

export async function togglePlugin(id, isEnabled) {
  await pool.query("UPDATE plugins SET is_enabled = ? WHERE id = ?", [
    isEnabled,
    id,
  ]);
}
