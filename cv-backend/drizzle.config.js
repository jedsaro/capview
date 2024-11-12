import { defineConfig } from "drizzle-kit";

export default defineConfig({
   dialect: "mysql",
   schema: "./src/api/schemas/*.js",
   out: "./drizzle",
   verbose: true,
   strict: true,
});