import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@nuxtjs/supabase",
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  css: ["primeicons/primeicons.css"],
});
