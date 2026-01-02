<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import ChatMessage from '@/components/ChatMessage.vue'
import ChatInput from '@/components/ChatInput.vue'
import { Download } from 'lucide-vue-next'
import { usePwaInstall } from '@/composables/usePwaInstall'

const chatStore = useChatStore()
const messagesContainer = ref<HTMLElement>()
const { deferredPrompt, installPwa } = usePwaInstall()

// Load chat history on mount
onMounted(() => {
  chatStore.loadFromStorage()
  scrollToBottom()
})

// Scroll to bottom of messages
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Handle sending a message
const handleSendMessage = async (text: string) => {
  await chatStore.sendMessage(text)
  scrollToBottom()
}
</script>

<template>
  <div class="flex flex-col h-screen bg-[#F3F4F6]">
    <!-- Header -->
    <header class="bg-white shadow-sm p-4 shrink-0">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-black">Chat</h1>
        <button
          v-if="deferredPrompt"
          @click="installPwa"
          class="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Download class="w-4 h-4" />
          Install
        </button>
      </div>
    </header>

    <!-- Messages Container -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto px-4 py-6 pb-32">
      <div class="max-w-7xl mx-auto">
        <!-- Empty State -->
        <div v-if="chatStore.messages.length === 0" class="flex items-center justify-center h-full">
          <div class="text-center text-gray-500">
            <p class="text-lg">Start a conversation...</p>
            <p class="text-sm mt-2">Send a message to begin chatting!</p>
          </div>
        </div>

        <!-- Messages -->
        <div v-else>
          <ChatMessage v-for="message in chatStore.messages" :key="message.id" :message="message" />
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <ChatInput @send="handleSendMessage" />
  </div>
</template>
