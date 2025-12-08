import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg"],
      manifest: {
        name: "Prestige Automotive Gallery",
        short_name: "Prestige",
        description: "A curated collection of the world's most exceptional automobiles",
        theme_color: "#1A1A1A",
        icons: [
          { src: "favicon.ico", sizes: "64x64 32x32 24x24 16x16", type: "image/x-icon" },
          { src: "logo192.png", type: "image/png", sizes: "192x192" },
          { src: "logo512.png", type: "image/png", sizes: "512x512" }
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#FAF8F5",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              ["document", "script", "style", "image", "font"].includes(request.destination),
            handler: "NetworkFirst",
            options: {
              cacheName: "offline-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
          },
        ],
      },
      devOptions: { enabled: true },
    }),
  ],
});
