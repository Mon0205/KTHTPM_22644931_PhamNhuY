import express from "express";
import { getPlugins, togglePlugin } from "./service.js";

export default function registerPluginManagerPlugin(app) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const plugins = await getPlugins();
      res.json(plugins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { is_enabled } = req.body;

      await togglePlugin(req.params.id, is_enabled);
      res.json({ message: "Plugin status updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.use("/api/plugins", router);
}
