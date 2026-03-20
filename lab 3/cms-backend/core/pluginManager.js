import { pool } from "./db.js";
import postsPlugin from "../plugins/posts/routes.js";
import themesPlugin from "../plugins/themes/routes.js";
import pluginManagerPlugin from "../plugins/plugin-manager/routes.js";

const pluginRegistry = {
  posts: postsPlugin,
  themes: themesPlugin,
  "plugin-manager": pluginManagerPlugin,
};

export async function loadPlugins(app) {
  try {
    const [rows] = await pool.query("SELECT name, is_enabled FROM plugins");

    rows.forEach((plugin) => {
      if (plugin.is_enabled && pluginRegistry[plugin.name]) {
        pluginRegistry[plugin.name](app);
        console.log(`Loaded plugin: ${plugin.name}`);
      }
    });
  } catch (error) {
    console.error("Error loading plugins:", error.message);
  }
}
