<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from '@/types'

const props = defineProps<{
  title: string
  chartOption: EChartsOption
}>()

const chartRef = ref()

// Watch for option changes and update chart
watch(
  () => props.chartOption,
  () => {
    if (chartRef.value) {
      chartRef.value.setOption(props.chartOption, true)
    }
  },
  { deep: true },
)

onMounted(() => {
  // Handle window resize for responsive charts
  window.addEventListener('resize', () => {
    if (chartRef.value) {
      chartRef.value.resize()
    }
  })
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <div class="bg-gradient-to-r from-[#FF6B00] to-[#FF8C3A] px-5 py-3">
      <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
    </div>
    <div class="p-5">
      <VChart
        ref="chartRef"
        :option="chartOption"
        :autoresize="true"
        class="w-full"
        style="height: 300px"
      />
    </div>
  </div>
</template>
