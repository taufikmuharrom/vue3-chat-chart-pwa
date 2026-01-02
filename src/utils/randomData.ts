import type { PieSegment } from '@/types'

/**
 * Generate a random integer between min and max (inclusive)
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate random data for line chart
 */
export const generateLineData = (points: number): number[] => {
  return Array.from({ length: points }, () => randomInt(20, 100))
}

/**
 * Generate random data for bar chart
 */
export const generateBarData = (categories: number): number[] => {
  return Array.from({ length: categories }, () => randomInt(10, 80))
}

/**
 * Generate random data for pie chart
 */
export const generatePieData = (segments: number): PieSegment[] => {
  const labels = ['Segment A', 'Segment B', 'Segment C', 'Segment D']
  return Array.from({ length: segments }, (_, i) => ({
    value: randomInt(10, 40),
    name: labels[i] || `Segment ${i + 1}`,
  }))
}

/**
 * Generate random data for scatter chart
 */
export const generateScatterData = (points: number): [number, number][] => {
  return Array.from({ length: points }, () => [randomInt(0, 100), randomInt(0, 100)])
}

/**
 * Generate random data for radar chart
 */
export const generateRadarData = (metrics: number): number[] => {
  return Array.from({ length: metrics }, () => randomInt(40, 100))
}

/**
 * Generate random data for gauge chart
 */
export const generateGaugeData = (): number => {
  return randomInt(0, 100)
}

/**
 * Get a random bot response from predefined messages
 */
export const getRandomBotResponse = (): string => {
  const responses = [
    "That's interesting! Tell me more.",
    'I see what you mean.',
    'Great question! Let me think about that.',
    'Absolutely! I agree with you.',
    "Hmm, I'm not sure about that one.",
    "That's a good point to consider.",
    'Thanks for sharing that!',
    'Could you elaborate on that?',
  ]
  return responses[randomInt(0, responses.length - 1)]!
}

/**
 * Delay execution for specified milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
