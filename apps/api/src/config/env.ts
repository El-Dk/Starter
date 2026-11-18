import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(24).default("development-secret-change-this-now"),
  JWT_EXPIRES_IN: z.string().default("1h"),
  WEB_ORIGIN: z.string().default("http://localhost:5173")
});

export const env = schema.parse(process.env);
