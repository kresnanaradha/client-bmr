import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "components/**/*.test.ts"],
    coverage: {
      include: ["lib/**/*.ts"],
      exclude: ["lib/ga4.ts", "lib/ga4-sample.ts", "lib/activities.ts"],
    },
  },
});
