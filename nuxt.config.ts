import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'
import { ClientBase, PublicRoutes } from './app/enum'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/ui',
  ],

  components: false, // 不使用自動引入

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1, maximum-scale=1, user-scalable=no',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        // { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        // { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  css: ['./app/assets/css/main.css'],

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
  },

  runtimeConfig: {
    public: {
      ENVIRONMENT: process.env.NUXT_PUBLIC_ENVIRONMENT,
      API_URL: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  alias: {
    '@': './app',
  },

  routeRules: {
    [PublicRoutes.Login]: { ssr: false },
    [`${ClientBase}/**`]: { ssr: false },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  // vite: {
  //   server: {
  //     allowedHosts: [
  //       // 測試 LineOA 的 ngrok
  //       String(process.env.NUXT_PUBLIC_WHITELIST_NGROK),
  //     ],
  //   },
  // },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  pwa,

  vueuse: { ssrHandlers: true },
})
