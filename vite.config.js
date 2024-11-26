import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.md"],
    base: "./",
    root: "./",
    // publicDir: "public",
    build: {
        outDir: "dist",
    },
});
