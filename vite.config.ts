import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import babel from "@rolldown/plugin-babel"

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": "/src/shared",
      "@features": "/src/features",
      "@pages": "/src/pages",
      "@entities": "/src/entities",
      "@widgets": "/src/widgets",
    },
  },

  optimizeDeps: {
    include: ["@/*"],
  },
})
