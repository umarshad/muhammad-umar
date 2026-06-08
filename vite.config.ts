import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Muhammad Umar - Flutter Developer",
        short_name: "M. Umar",
        theme_color: "#171717",
        background_color: "#0a0a0a",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,pdf}"],
        navigateFallback: "/index.html",
        // Never hand back index.html for the API or for direct file downloads
        // (the resume PDF, images). Without this the SW intercepts the navigation
        // to the PDF and serves the cached app shell instead of the actual file.
        navigateFallbackDenylist: [/^\/api\//, /\.pdf$/i, /\.(png|jpe?g|svg|ico|webp)$/i],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
