<script setup lang="ts">
import { ref } from 'vue'
import { Send } from 'lucide-vue-next'

const emit = defineEmits<{
  send: [text: string]
}>()

const inputText = ref('')

const handleSend = () => {
  if (inputText.value.trim()) {
    emit('send', inputText.value)
    inputText.value = ''
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
    <div class="max-w-screen-xl mx-auto flex items-end gap-2">
      <textarea
        v-model="inputText"
        @keydown="handleKeydown"
        placeholder="Type a message..."
        rows="1"
        class="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
      />
      <button
        @click="handleSend"
        :disabled="!inputText.trim()"
        class="flex items-center justify-center w-12 h-12 rounded-full bg-[#FF6B00] text-white hover:bg-[#FF8C3A] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
      >
        <Send :size="20" />
      </button>
    </div>
  </div>
</template>
