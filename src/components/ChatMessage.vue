<script setup lang="ts">
import type { Message } from '@/types'

defineProps<{
  message: Message
}>()

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div :class="['flex mb-4', message.isUser ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'max-w-[75%] rounded-2xl px-4 py-3 shadow-md',
        message.isUser
          ? 'bg-[#FF6B00] text-white rounded-br-sm'
          : 'bg-[#F3F4F6] text-black rounded-bl-sm',
      ]"
    >
      <p class="text-[15px] leading-relaxed">{{ message.text }}</p>
      <p :class="['text-xs mt-1', message.isUser ? 'text-orange-100' : 'text-gray-500']">
        {{ formatTime(message.timestamp) }}
      </p>
    </div>
  </div>
</template>
