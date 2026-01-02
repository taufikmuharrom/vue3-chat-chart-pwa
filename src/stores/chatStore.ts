import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Message } from '@/types'
import { getRandomBotResponse, delay } from '@/utils/randomData'

const STORAGE_KEY = 'chat-history'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])

  /**
   * Add a user message to the chat
   */
  const addUserMessage = (text: string) => {
    const message: Message = {
      id: crypto.randomUUID(),
      text,
      isUser: true,
      timestamp: new Date(),
    }
    messages.value.push(message)
    saveToStorage()
  }

  /**
   * Add a bot message to the chat
   */
  const addBotMessage = (text: string) => {
    const message: Message = {
      id: crypto.randomUUID(),
      text,
      isUser: false,
      timestamp: new Date(),
    }
    messages.value.push(message)
    saveToStorage()
  }

  /**
   * Send a user message and get a bot response
   */
  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    addUserMessage(text)

    // Simulate bot thinking time (100-300ms)
    await delay(100 + Math.random() * 200)

    const botResponse = getRandomBotResponse()
    addBotMessage(botResponse)
  }

  /**
   * Load messages from localStorage
   */
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Convert timestamp strings back to Date objects
        messages.value = parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
      }
    } catch (error) {
      console.error('Failed to load chat history:', error)
    }
  }

  /**
   * Save messages to localStorage
   */
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
    } catch (error) {
      console.error('Failed to save chat history:', error)
    }
  }

  /**
   * Clear all messages
   */
  const clearMessages = () => {
    messages.value = []
    saveToStorage()
  }

  return {
    messages,
    addUserMessage,
    addBotMessage,
    sendMessage,
    loadFromStorage,
    saveToStorage,
    clearMessages,
  }
})
