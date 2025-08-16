import dotenv from "dotenv";
// Load environment variables first
dotenv.config();

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
  console.log("✅ Database connected successfully");
} else {
  console.log("⚠️  DATABASE_URL not set. Please provision a database in Replit.");
  console.log("   The application will start but database features will be unavailable.");
}

export { pool, db };