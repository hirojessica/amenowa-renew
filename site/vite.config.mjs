import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {generate} from './scripts/content.mjs';

export default defineConfig({
  base: process.env.SITE_BASE || '/amenowa-renew/',
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(),{name:'news-content',buildStart(){generate();},configureServer(server){server.watcher.add(['content/news','content/cases']);server.watcher.on('all',(_,file)=>{if((file.includes('content/news')||file.includes('content/cases')||file.includes('content\\news')||file.includes('content\\cases'))&&file.endsWith('.md'))generate();});}}],
});
