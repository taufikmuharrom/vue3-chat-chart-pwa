import { ref, onMounted } from 'vue'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

// Global state to persist across views
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
let isListenerAdded = false

export function usePwaInstall() {
  onMounted(() => {
    if (typeof window !== 'undefined' && !isListenerAdded) {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt.value = e as BeforeInstallPromptEvent
      })

      isListenerAdded = true
    }
  })

  // Optional: Handle cleanup if needed, but for PWA install prompt we usually want to keep it.

  const installPwa = async () => {
    if (!deferredPrompt.value) return
    deferredPrompt.value.prompt()
    await deferredPrompt.value.userChoice
    // Always nullify after use - the prompt can only be shown once
    deferredPrompt.value = null
  }

  return {
    deferredPrompt,
    installPwa,
  }
}
