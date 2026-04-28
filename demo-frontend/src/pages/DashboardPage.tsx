import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Pie, PieChart } from 'recharts'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { buttonClassName } from '../components/ui/buttonStyles'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { cn } from '../lib/cn'
import { alertDistribution, alerts, kpis, reports, turnoverTrend30d } from '../mock/data'

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted">{hint}</div> : null}
    </Card>
  )
}

export function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm text-muted">欢迎回来！</div>
          <div className="truncate text-lg font-semibold tracking-tight">
            今日有 <span className="text-[rgb(var(--fg))]">5</span> 个预警待处理
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary">一键生成日报</Button>
          <Link to="/alerts" className={cn(buttonClassName({ variant: 'secondary' }), 'no-underline')}>
            前往预警中心 <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Kpi label="总 SKU 数" value={kpis.totalSkus.toLocaleString()} hint="覆盖全部仓库" />
        <Kpi label="平均周转率（天）" value={kpis.avgTurnoverDays.toFixed(1)} hint="近 30 天滚动" />
        <Kpi label="预警数" value={String(kpis.alerts)} hint="红色/黄色预警" />
        <Kpi label="待处理任务" value={String(kpis.pendingTasks)} hint="待处理 → 进行中 → 已完成" />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>周转率趋势图</CardTitle>
              <CardDescription>近 30 天平均周转天数</CardDescription>
            </div>
            <Badge tone="violet">30 天</Badge>
          </CardHeader>
          <div className="h-[260px] min-h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoverTrend30d} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis width={36} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid rgba(var(--border),1)',
                    background: 'rgb(var(--card))',
                    boxShadow: 'var(--shadow)',
                  }}
                  labelStyle={{ color: 'rgb(var(--muted))' }}
                />
                <Line type="monotone" dataKey="turnoverDays" stroke="rgb(var(--accent))" strokeWidth={2.2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>预警分布图</CardTitle>
              <CardDescription>按预警类型占比</CardDescription>
            </div>
            <Badge tone="slate">本周</Badge>
          </CardHeader>
          <div className="h-[260px] min-h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid rgba(var(--border),1)',
                    background: 'rgb(var(--card))',
                    boxShadow: 'var(--shadow)',
                  }}
                  labelStyle={{ color: 'rgb(var(--muted))' }}
                />
                <Pie
                  data={alertDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={92}
                  stroke="rgba(var(--border),1)"
                  fill="rgb(var(--accent-2))"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>预警商品列表</CardTitle>
              <CardDescription>红色/黄色预警，支持快速处理</CardDescription>
            </div>
            <Link to="/alerts" className="text-sm text-muted hover:underline">
              查看全部 →
            </Link>
          </CardHeader>
          <div className="space-y-2">
            {alerts.slice(0, 3).map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-[rgba(var(--fg),0.015)] px-3 py-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={a.level === 'red' ? 'red' : 'yellow'}>
                      {a.level === 'red' ? '🔴' : '🟡'} {a.type}
                    </Badge>
                    <div className="truncate text-sm font-medium">{a.name}</div>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {a.sku} · {a.warehouse}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">{a.turnoverDays}天</div>
                  <div className="text-xs text-muted">↑ {a.deltaPct}%</div>
                  <Button size="sm">处理</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>最新分析报告</CardTitle>
              <CardDescription>PDF 报告在线预览/下载</CardDescription>
            </div>
            <Link to="/reports" className="text-sm text-muted hover:underline">
              查看全部 →
            </Link>
          </CardHeader>
          <div className="space-y-2">
            {reports.slice(0, 2).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2 rounded-xl border bg-[rgba(var(--fg),0.015)] px-3 py-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText size={16} className="text-muted" />
                    <span className="truncate">{r.date} {r.name}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted">{r.type}</div>
                </div>
                <Button size="sm" variant="ghost">
                  预览
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

