import { defineConfig } from 'drizzle-kit'
export default defineConfig({
 schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:P4sVkcXI9DHe@ep-white-band-a1j2saxg.ap-southeast-1.aws.neon.tech/AI-mock-interview?sslmode=require',
  },
  verbose: true,
  strict: true,
})
