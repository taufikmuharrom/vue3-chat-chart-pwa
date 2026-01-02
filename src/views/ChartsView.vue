<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useChartStore } from '@/stores/chartStore'
import ChartCard from '@/components/ChartCard.vue'
import { RefreshCw, Download } from 'lucide-vue-next'
import type { EChartsOption } from '@/types'
import { usePwaInstall } from '@/composables/usePwaInstall'

const chartStore = useChartStore()
const { deferredPrompt, installPwa } = usePwaInstall()

// Generate data on mount
onMounted(() => {
  chartStore.generateRandomData()
})

// Line Chart Option
const lineChartOption = computed<EChartsOption>(() => ({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: chartStore.lineChartData,
      type: 'line',
      smooth: true,
      itemStyle: { color: '#FF6B00' },
      lineStyle: { width: 3 },
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
}))

// Bar Chart Option
const barChartOption = computed<EChartsOption>(() => ({
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: chartStore.barChartData,
      type: 'bar',
      itemStyle: { color: '#FF6B00' },
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
}))

// Pie Chart Option
const pieChartOption = computed<EChartsOption>(() => ({
  series: [
    {
      type: 'pie',
      data: chartStore.pieChartData,
      radius: '60%',
      label: {
        show: true,
      },
    },
  ],
  color: ['#FF6B00', '#FF8C3A', '#FFB074', '#FFD4AE'],
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
}))

// Scatter Chart Option
const scatterChartOption = computed<EChartsOption>(() => ({
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: chartStore.scatterChartData,
      type: 'scatter',
      symbolSize: 10,
      itemStyle: { color: '#FF6B00' },
    },
  ],
  tooltip: {
    trigger: 'item',
    formatter: '({c0}, {c1})',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
}))

// Radar Chart Option
const radarChartOption = computed<EChartsOption>(() => ({
  radar: {
    indicator: [
      { name: 'Speed', max: 100 },
      { name: 'Quality', max: 100 },
      { name: 'Efficiency', max: 100 },
      { name: 'Innovation', max: 100 },
      { name: 'Teamwork', max: 100 },
    ],
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: chartStore.radarChartData,
          name: 'Performance',
        },
      ],
      areaStyle: { color: 'rgba(255, 107, 0, 0.3)' },
      itemStyle: { color: '#FF6B00' },
      lineStyle: { color: '#FF6B00', width: 2 },
    },
  ],
  tooltip: {
    trigger: 'item',
  },
}))

// Gauge Chart Option
const gaugeChartOption = computed<EChartsOption>(() => ({
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18,
      },
      axisLine: {
        lineStyle: {
          width: 18,
          color: [[1, '#FF6B00']],
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 2,
          color: '#999',
        },
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 12,
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 18,
        itemStyle: {
          borderWidth: 10,
          borderColor: '#FF6B00',
        },
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        fontSize: 40,
        offsetCenter: [0, '70%'],
        formatter: '{value}',
        color: '#FF6B00',
      },
      data: [
        {
          value: chartStore.gaugeChartData,
          name: 'Score',
        },
      ],
    },
  ],
}))

// Refresh all charts
const handleRefresh = () => {
  chartStore.regenerateAllCharts()
}
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6] pb-20">
    <!-- Header -->
    <header class="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black">Charts</h1>
        <div class="flex items-center gap-2">
          <button
            v-if="deferredPrompt"
            @click="installPwa"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            <Download :size="18" />
            <span class="font-medium">Install</span>
          </button>
          <button
            @click="handleRefresh"
            class="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF8C3A] transition-colors duration-200 shadow-md"
          >
            <RefreshCw :size="18" />
            <span class="font-medium">Refresh Data</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Charts Grid -->
    <div class="px-4 py-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Weekly Traffic" :chart-option="lineChartOption" />
        <ChartCard title="Category Performance" :chart-option="barChartOption" />
        <ChartCard title="Distribution" :chart-option="pieChartOption" />
        <ChartCard title="Data Points" :chart-option="scatterChartOption" />
        <ChartCard title="Skills Assessment" :chart-option="radarChartOption" />
        <ChartCard title="Progress Meter" :chart-option="gaugeChartOption" />
      </div>
    </div>
  </div>
</template>
