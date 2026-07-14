// @ts-check
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      name: "Oswald",
      cssVariable: "--font-oswald",
      provider: fontProviders.google(),
    },
    {
      name: "Lato",
      cssVariable: "--font-lato",
      provider: fontProviders.google(),
    },
    {
      name: "Cutive Mono",
      cssVariable: "--font-cutive-mono",
      provider: fontProviders.google(),
    },
  ],

  integrations: [icon()],
  adapter: netlify(),
});
