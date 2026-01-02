<script setup lang="ts">
import { useRoute } from 'vue-router'
import { MessageCircle, BarChart3 } from 'lucide-vue-next'

const route = useRoute()
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1)] z-50">
    <div class="flex h-full max-w-screen-xl mx-auto">
      <router-link
        to="/chat"
        :class="[
          'flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200',
          route.path === '/chat' ? 'text-[#FF6B00]' : 'text-[#6B7280]',
        ]"
      >
        <MessageCircle :size="24" />
        <span class="text-xs font-medium">Chat</span>
      </router-link>

      <router-link
        to="/charts"
        :class="[
          'flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200',
          route.path === '/charts' ? 'text-[#FF6B00]' : 'text-[#6B7280]',
        ]"
      >
        <BarChart3 :size="24" />
        <span class="text-xs font-medium">Charts</span>
      </router-link>
    </div>
  </nav>
</template>
