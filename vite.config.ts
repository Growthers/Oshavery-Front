import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vitest/config";

const PRODUCTION = "production";
const DEVELOPMENT = "development";

const environment =
  process.env.NODE_ENV === PRODUCTION ? PRODUCTION : DEVELOPMENT;
const is_production = environment === PRODUCTION;

const root = `${process.cwd()}/src`;
const dist = `${process.cwd()}/dist`;

export default defineConfig({
  build: {
    assetsDir: "assets",
    chunkSizeWarningLimit: 500,
    emptyOutDir: true,
    minify: is_production ? "terser" : undefined,
    outDir: dist,
    rollupOptions: {
      input: {
        index: `${path.resolve(root, "index.html")}/`,
      },
      output: {
        assetFileNames: is_production
          ? "assets/[hash][extname]"
          : "assets/[name]-[hash][extname]",
        chunkFileNames: is_production
          ? "assets/[hash].js"
          : "assets/[name]-[hash].js",
        entryFileNames: "assets/[name].[hash].js",
        manualChunks: {
          vendor: ["react", "react-dom", "wouter"],
        },
      },
    },
    terserOptions: is_production
      ? {
          compress: {
            drop_console: true,
          },
        }
      : undefined,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "~/": `${root}/`,
    },
  },
  root,
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
  css: {
    postcss: {
      plugins: [require("autoprefixer")],
    },
  },
});
