import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      includeAssets: [
        'favicon.ico',
        'icon-192.png',
        'icon-512.png',
        'screenshot-mobile-chat.jpg',
        'screenshot-mobile-chart.jpg',
        'chat-desktop.png',
        'chart-desktop.png',
      ],
      manifest: {
        name: 'Chat & Chart Explorer',
        short_name: 'ChatChart',
        description: 'Explore chat and data visualization',
        theme_color: '#FF6B00',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        orientation: 'any',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-mobile-chat.jpg',
            sizes: '576x1280',
            type: 'image/jpeg',
            form_factor: 'narrow',
            label: 'Chat View - Mobile',
          },
          {
            src: 'screenshot-mobile-chart.jpg',
            sizes: '576x1280',
            type: 'image/jpeg',
            form_factor: 'narrow',
            label: 'Chart View - Mobile',
          },
          {
            src: 'chat-desktop.png',
            sizes: '2880x1518',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Chat View - Desktop',
          },
          {
            src: 'chart-desktop.png',
            sizes: '2880x1518',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Chart View - Desktop',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: null, // Important for proper routing
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'echarts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
