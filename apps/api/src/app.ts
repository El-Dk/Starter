import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { env } from "./config/env.js";

export const app = express();
app.use(cors({ origin: env.WEB_ORIGIN }));
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", routes);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error && typeof error === "object" && "issues" in error) {
    return res.status(400).json({ message: "Datos inválidos", details: error });
  }
  console.error(error);
  return res.status(500).json({ message: "Error interno del servidor" });
});
