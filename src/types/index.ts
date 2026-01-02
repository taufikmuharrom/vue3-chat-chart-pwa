import type { EChartsOption } from 'echarts'

export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export interface PieSegment {
  value: number
  name: string
}

export interface ChartData {
  lineData: number[]
  barData: number[]
  pieData: PieSegment[]
  scatterData: [number, number][]
  radarData: number[]
  gaugeData: number
}

export type { EChartsOption }
