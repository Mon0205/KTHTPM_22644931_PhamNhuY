import { pool } from "../../core/db.js";

export async function getThemes() {
  const [rows] = await pool.query("SELECT * FROM themes");
  return rows;
}

export async function activateTheme(themeId) {
  await pool.query("UPDATE themes SET is_active = false");
  await pool.query("UPDATE themes SET is_active = true WHERE id = ?", [
    themeId,
  ]);
}
