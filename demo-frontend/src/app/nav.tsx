import type { ReactNode } from 'react'
import {
  Activity,
  Bell,
  ClipboardCheck,
  FileText,
  Gauge,
  Settings,
  Sparkles,
  Tags,
  TrendingUp,
  Warehouse,
} from 'lucide-react'

export type NavItem = {
  label: string
  to: string
  icon: ReactNode
}

export type NavGroup = {
  title: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: '总览',
    items: [{ label: '仪表盘', to: '/dashboard', icon: <Gauge size={18} /> }],
  },
  {
    title: '预警与诊断',
    items: [
      { label: '预警中心', to: '/alerts', icon: <Bell size={18} /> },
      { label: '商品分析', to: '/diagnosis/products', icon: <Tags size={18} /> },
      { label: '仓库分析', to: '/diagnosis/warehouses', icon: <Warehouse size={18} /> },
      { label: '趋势分析', to: '/diagnosis/trends', icon: <TrendingUp size={18} /> },
    ],
  },
  {
    title: '智能分析',
    items: [
      { label: '归因分析', to: '/attribution', icon: <Activity size={18} /> },
      { label: '决策建议', to: '/recommendations', icon: <Sparkles size={18} /> },
      { label: '任务中心', to: '/tasks', icon: <ClipboardCheck size={18} /> },
      { label: '报告中心', to: '/reports', icon: <FileText size={18} /> },
    ],
  },
  {
    title: '系统',
    items: [{ label: '系统设置', to: '/settings', icon: <Settings size={18} /> }],
  },
]

