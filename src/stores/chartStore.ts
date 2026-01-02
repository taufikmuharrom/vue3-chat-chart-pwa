import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PieSegment } from '@/types'
import {
  generateLineData,
  generateBarData,
  generatePieData,
  generateScatterData,
  generateRadarData,
  generateGaugeData,
} from '@/utils/randomData'

export const useChartStore = defineStore('chart', () => {
  const lineChartData = ref<number[]>([])
  const barChartData = ref<number[]>([])
  const pieChartData = ref<PieSegment[]>([])
  const scatterChartData = ref<[number, number][]>([])
  const radarChartData = ref<number[]>([])
  const gaugeChartData = ref<number>(0)

  /**
   * Generate random data for all charts
   */
  const generateRandomData = () => {
    lineChartData.value = generateLineData(7) // 7 days
    barChartData.value = generateBarData(5) // 5 categories
    pieChartData.value = generatePieData(4) // 4 segments
    scatterChartData.value = generateScatterData(20) // 20 points
    radarChartData.value = generateRadarData(5) // 5 metrics
    gaugeChartData.value = generateGaugeData()
  }

  /**
   * Regenerate all chart data
   */
  const regenerateAllCharts = () => {
    generateRandomData()
  }

  return {
    lineChartData,
    barChartData,
    pieChartData,
    scatterChartData,
    radarChartData,
    gaugeChartData,
    generateRandomData,
    regenerateAllCharts,
  }
})
