# Product Requirements Document: Vue3 Chat & Chart PWA

## Project Overview
A Progressive Web App built with Vue 3 for exploring chat interfaces and data visualization. Mobile-first design with offline capability.

**Package Manager**: pnpm

## Technical Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS 4
- **UI Components**: Reka UI, Lucide Vue Next (icons)
- **Charts**: vue-echarts + echarts
- **PWA**: vite-plugin-pwa
- **TypeScript**: Full type safety

## Project Structure
```
src/
├── assets/           # Static assets
├── components/       # Reusable components
│   ├── ChatMessage.vue
│   ├── ChatInput.vue
│   ├── ChartCard.vue
│   └── BottomNav.vue
├── views/            # Page components
│   ├── ChatView.vue
│   └── ChartsView.vue
├── stores/           # Pinia stores
│   ├── chatStore.ts
│   └── chartStore.ts
├── router/           # Vue Router config
│   └── index.ts
├── types/            # TypeScript types
│   └── index.ts
├── utils/            # Utility functions
│   └── randomData.ts
├── App.vue
└── main.ts
```

## Core Features

### 1. Chat Interface (`/chat`)

#### UI Components
- **ChatMessage.vue**: Individual message bubble
  - Props: `message` (text), `isUser` (boolean), `timestamp`
  - User messages: right-aligned, orange background (#FF6B00)
  - Bot messages: left-aligned, gray background (#F3F4F6)
  - Rounded corners, padding, shadows

- **ChatInput.vue**: Message input area
  - Text input field (expandable)
  - Send button (Lucide Send icon)
  - Fixed at bottom above navigation
  - Orange accent (#FF6B00)

#### Functionality
- Display chat conversation history
- Store messages in Pinia store
- Generate random bot responses (100-300ms delay)
- Auto-scroll to latest message
- Persist chat history in localStorage
- Empty state: "Start a conversation..."

**Random Bot Responses** (8 options):
1. "That's interesting! Tell me more."
2. "I see what you mean."
3. "Great question! Let me think about that."
4. "Absolutely! I agree with you."
5. "Hmm, I'm not sure about that one."
6. "That's a good point to consider."
7. "Thanks for sharing that!"
8. "Could you elaborate on that?"

### 2. Charts Interface (`/charts`)

#### Chart Components
- **ChartCard.vue**: Wrapper for each chart
  - Props: `title`, `chartOption`
  - White card with shadow
  - Orange header accent
  - Responsive sizing

#### Chart Types (ALL must be displayed)

**1. Line Chart - "Weekly Traffic"**
```javascript
{
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{
    data: [random(20-100) for each day],
    type: 'line',
    smooth: true,
    itemStyle: { color: '#FF6B00' }
  }]
}
```

**2. Bar Chart - "Category Performance"**
```javascript
{
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
  yAxis: { type: 'value' },
  series: [{
    data: [random(10-80) for each category],
    type: 'bar',
    itemStyle: { color: '#FF6B00' }
  }]
}
```

**3. Pie Chart - "Distribution"**
```javascript
{
  series: [{
    type: 'pie',
    data: [
      { value: random(10-40), name: 'Segment A' },
      { value: random(10-40), name: 'Segment B' },
      { value: random(10-40), name: 'Segment C' },
      { value: random(10-40), name: 'Segment D' }
    ],
    radius: '60%'
  }],
  color: ['#FF6B00', '#FF8C3A', '#FFB074', '#FFD4AE']
}
```

**4. Scatter Chart - "Data Points"**
```javascript
{
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  series: [{
    data: [[random(0-100), random(0-100)] x 20 points],
    type: 'scatter',
    symbolSize: 10,
    itemStyle: { color: '#FF6B00' }
  }]
}
```

**5. Radar Chart - "Skills Assessment"**
```javascript
{
  radar: {
    indicator: [
      { name: 'Speed', max: 100 },
      { name: 'Quality', max: 100 },
      { name: 'Efficiency', max: 100 },
      { name: 'Innovation', max: 100 },
      { name: 'Teamwork', max: 100 }
    ]
  },
  series: [{
    type: 'radar',
    data: [{
      value: [random(40-100) for each metric],
      name: 'Performance'
    }],
    areaStyle: { color: 'rgba(255, 107, 0, 0.3)' },
    itemStyle: { color: '#FF6B00' }
  }]
}
```

**6. Gauge Chart - "Progress Meter"**
```javascript
{
  series: [{
    type: 'gauge',
    progress: { show: true },
    detail: { valueAnimation: true },
    data: [{ value: random(0-100), name: 'Score' }],
    axisLine: {
      lineStyle: {
        color: [[1, '#FF6B00']]
      }
    }
  }]
}
```

**NOTE**: All 6 chart types MUST be rendered on the Charts page. Display them vertically stacked on mobile, 2-column grid on tablet, and 3-column grid on desktop.

#### Functionality
- Generate random data on mount
- "Refresh Data" button (orange) to regenerate all charts
- Responsive charts (use ECharts auto-resize)
- Smooth animations

### 3. Bottom Navigation

#### Component: BottomNav.vue
- Fixed position at bottom
- Height: 64px
- White background with top shadow
- Two navigation items (50% width each)

**Navigation Items**:
1. **Chat** 
   - Icon: MessageCircle (Lucide)
   - Route: `/chat`
   - Active state: Orange (#FF6B00)

2. **Charts**
   - Icon: BarChart3 (Lucide)
   - Route: `/charts`
   - Active state: Orange (#FF6B00)

- Inactive state: Gray (#6B7280)
- Smooth color transition (200ms)
- Label below icon (12px font)

## Design System

### Color Palette
```css
--color-primary: #FF6B00;      /* Orange - primary actions */
--color-primary-light: #FF8C3A; /* Light orange - hover states */
--color-black: #000000;         /* Black - text */
--color-gray-dark: #374151;     /* Dark gray - secondary text */
--color-gray: #6B7280;          /* Gray - inactive states */
--color-gray-light: #F3F4F6;    /* Light gray - backgrounds */
--color-white: #FFFFFF;         /* White - cards, nav */
```

### Typography
- Font Family: System fonts (Tailwind default)
- Headings: 20-24px, bold, black
- Body: 16px, regular, black
- Labels: 12px, medium, gray
- Message text: 15px

### Spacing
- Container padding: 16px
- Card padding: 20px
- Element spacing: 12px
- Bottom nav height: 64px
- Safe area: 80px bottom padding (nav + buffer)

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
```

## PWA Configuration

### vite-plugin-pwa Setup
```typescript
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Chat & Chart Explorer',
    short_name: 'ChatChart',
    description: 'Explore chat and data visualization',
    theme_color: '#FF6B00',
    background_color: '#FFFFFF',
    display: 'standalone',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'echarts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
          }
        }
      }
    ]
  }
})
```

### Required Icons
- `/public/icon-192.png` (192x192px) - Orange background, white chart icon
- `/public/icon-512.png` (512x512px) - Orange background, white chart icon

## Responsive Design

### Mobile First (375px - 767px)
- Single column layout
- Full width charts
- Bottom navigation
- Touch-friendly (44px minimum tap targets)
- Chat input fixed above nav

### Tablet (768px - 1023px)
- 2-column chart grid
- Increased padding
- Bottom navigation remains

### Desktop (1024px+)
- Max width: 1200px, centered
- 3-column chart grid (if space allows)
- Bottom navigation (don't switch to sidebar)
- Larger text and spacing

## Data Management

### Pinia Stores

**chatStore.ts**
```typescript
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

state: {
  messages: Message[];
}

actions: {
  addUserMessage(text: string)
  addBotMessage(text: string)
  loadFromStorage()
  saveToStorage()
}
```

**chartStore.ts**
```typescript
state: {
  lineChartData: number[];
  barChartData: number[];
  pieChartData: {value: number, name: string}[];
  scatterChartData: [number, number][];
  radarChartData: number[];
  gaugeChartData: number;
}

actions: {
  generateRandomData()
  regenerateAllCharts()
}
```

### LocalStorage
- Key: `chat-history` - Store messages array
- Key: `chart-data` - Store last generated chart data (optional)
- Implement try-catch for localStorage access

## Utility Functions

### utils/randomData.ts
```typescript
export const randomInt = (min: number, max: number): number
export const generateLineData = (points: number): number[]
export const generateBarData = (categories: number): number[]
export const generatePieData = (segments: number): PieData[]
export const generateScatterData = (points: number): [number, number][]
export const generateRadarData = (metrics: number): number[]
export const generateGaugeData = (): number
export const getRandomBotResponse = (): string
export const delay = (ms: number): Promise<void>
```

## Router Configuration

```typescript
routes: [
  { path: '/', redirect: '/chat' },
  { path: '/chat', component: ChatView },
  { path: '/charts', component: ChartsView }
]
```

## TypeScript Types

```typescript
// types/index.ts
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChartData {
  lineData: number[];
  barData: number[];
  pieData: PieSegment[];
}

export interface PieSegment {
  value: number;
  name: string;
}

export interface EChartsOption {
  // Use echarts types
}
```

## Implementation Steps

### Phase 1: Project Setup
1. ✅ Initialize Vue 3 + Vite project (Already done)
2. Configure Tailwind CSS 4
3. Set up Vue Router with 2 routes
4. Set up Pinia stores
5. Configure vite-plugin-pwa

### Phase 2: Bottom Navigation
1. Create BottomNav.vue component
2. Implement route highlighting
3. Add Lucide icons
4. Style with orange/black/white theme
5. Add to App.vue layout

### Phase 3: Chat Interface
1. Create chatStore (Pinia)
2. Build ChatMessage.vue component
3. Build ChatInput.vue component
4. Create ChatView.vue page
5. Implement random bot responses
6. Add localStorage persistence
7. Style with orange theme

### Phase 4: Charts Interface
1. Install and configure vue-echarts
2. Create chartStore (Pinia)
3. Build ChartCard.vue component
4. Create randomData utilities
5. Build ChartsView.vue with ALL 6 charts (Line, Bar, Pie, Scatter, Radar, Gauge)
6. Implement refresh functionality
7. Make charts responsive (1 column mobile, 2 columns tablet, 3 columns desktop)

### Phase 5: PWA Features
1. Configure manifest.json
2. Create app icons (192x192, 512x512)
3. Test service worker
4. Test offline functionality
5. Test "Add to Home Screen"

### Phase 6: Polish
1. Add loading states
2. Add error handling
3. Optimize animations
4. Test on real mobile devices
5. Performance optimization

## Testing Checklist

### Functionality
- [ ] Chat messages send and display correctly
- [ ] Bot responds with random messages
- [ ] All 6 chart types display correctly (Line, Bar, Pie, Scatter, Radar, Gauge)
- [ ] Charts display with random data
- [ ] Refresh button regenerates all chart data
- [ ] Navigation switches between pages
- [ ] LocalStorage persists chat history
- [ ] PWA installs on mobile
- [ ] Works offline after first load

### Responsive Design
- [ ] Mobile (375px): All 6 charts stacked vertically, all elements visible and usable
- [ ] Tablet (768px): 2-column grid with 6 charts (3 rows x 2 columns)
- [ ] Desktop (1024px+): 3-column grid with 6 charts (2 rows x 3 columns)
- [ ] Touch targets minimum 44x44px
- [ ] Text readable at all sizes

### Visual Design
- [ ] Orange (#FF6B00) used consistently for primary actions
- [ ] Black text is readable
- [ ] White backgrounds are clean
- [ ] Shadows add depth appropriately
- [ ] Active navigation state is clear