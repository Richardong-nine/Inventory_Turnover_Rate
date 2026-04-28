export type AlertLevel = 'red' | 'yellow'

export type AlertItem = {
  id: string
  sku: string
  name: string
  warehouse: string
  turnoverDays: number
  deltaPct: number
  level: AlertLevel
  type: '阈值预警' | '趋势预警' | '同比环比' | '智能预警'
}

export const kpis = {
  totalSkus: 12840,
  avgTurnoverDays: 29.6,
  alerts: 5,
  pendingTasks: 12,
}

export const turnoverTrend30d = Array.from({ length: 30 }).map((_, i) => {
  const day = i + 1
  const base = 26 + Math.sin(i / 4) * 2.8 + (i > 18 ? 1.6 : 0)
  return {
    day: `04-${String(day).padStart(2, '0')}`,
    turnoverDays: Number((base + (i % 7) * 0.2).toFixed(1)),
  }
})

export const alertDistribution = [
  { name: '阈值预警', value: 42 },
  { name: '趋势预警', value: 24 },
  { name: '同比环比', value: 18 },
  { name: '智能预警', value: 16 },
]

export const alerts: AlertItem[] = [
  {
    id: 'A-1001',
    sku: 'SKU-884211',
    name: '商品A（无线鼠标）',
    warehouse: '华东-1',
    turnoverDays: 45,
    deltaPct: 30,
    level: 'red',
    type: '阈值预警',
  },
  {
    id: 'A-1002',
    sku: 'SKU-771204',
    name: '商品B（便携电源）',
    warehouse: '华南-2',
    turnoverDays: 38,
    deltaPct: 25,
    level: 'red',
    type: '趋势预警',
  },
  {
    id: 'A-1003',
    sku: 'SKU-550099',
    name: '商品C（运动水壶）',
    warehouse: '华北-1',
    turnoverDays: 32,
    deltaPct: 15,
    level: 'yellow',
    type: '同比环比',
  },
  {
    id: 'A-1004',
    sku: 'SKU-220018',
    name: '商品D（车载支架）',
    warehouse: '华东-2',
    turnoverDays: 31,
    deltaPct: 12,
    level: 'yellow',
    type: '智能预警',
  },
  {
    id: 'A-1005',
    sku: 'SKU-110875',
    name: '商品E（蓝牙耳机）',
    warehouse: '华南-1',
    turnoverDays: 30,
    deltaPct: 10,
    level: 'yellow',
    type: '趋势预警',
  },
]

export const reports = [
  { id: 'R-20260428', date: '2026-04-28', name: '周转率分析报告.pdf', type: '日报' },
  { id: 'R-20260427', date: '2026-04-27', name: '预警归因专题.pdf', type: '专题分析' },
  { id: 'R-20260421', date: '2026-04-21', name: '周转率周报.pdf', type: '周报' },
]

export const tasks = [
  { id: 'T-9001', title: '商品B：跨仓调拨方案确认', owner: '李雷', status: '待处理' as const },
  { id: 'T-9002', title: '商品A：促销折扣测算', owner: '韩梅梅', status: '进行中' as const },
  { id: 'T-9003', title: '华东-2：补货策略复盘', owner: '王强', status: '已完成' as const },
]

export const skuRanking = Array.from({ length: 12 }).map((_, i) => {
  const days = 18 + i * 2 + (i % 3) * 1.3
  return {
    rank: i + 1,
    sku: `SKU-${800000 + i * 113}`,
    name: `SKU 示例 ${i + 1}`,
    turnoverDays: Number(days.toFixed(1)),
    warehouse: ['华东-1', '华东-2', '华南-1', '华南-2'][i % 4],
    category: ['3C', '家居', '运动户外', '美妆'][i % 4],
  }
})

export const warehouseStats = [
  { name: '华东-1', turnoverDays: 26.3, utilization: 0.72, alerts: 1 },
  { name: '华东-2', turnoverDays: 33.8, utilization: 0.84, alerts: 2 },
  { name: '华南-1', turnoverDays: 28.1, utilization: 0.66, alerts: 1 },
  { name: '华南-2', turnoverDays: 31.2, utilization: 0.78, alerts: 1 },
  { name: '华北-1', turnoverDays: 24.6, utilization: 0.61, alerts: 0 },
]

