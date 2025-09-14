import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/cnbapi": {
                target: "https://api.cnb.cz",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cnbapi/, "/cnbapi"),
            },
        },
    },
});
