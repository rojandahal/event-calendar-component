import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CustomEventCalendar",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name;
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts({
      include: [path.resolve(__dirname, "src")],
      exclude: [path.resolve(__dirname, "vite.config.ts")],
      tsconfigPath: path.resolve(__dirname, "tsconfig.node.json"),
      outDir: "dist",
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
