import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { warehouseStats } from '../../mock/data'

export function WarehousesDiagnosisPage() {
  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>诊断分析 · 仓库分析</CardTitle>
            <CardDescription>各仓库周转率对比（Demo）</CardDescription>
          </div>
          <Badge tone="violet">仓库</Badge>
        </CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="primary">
            生成仓库专题报告
          </Button>
          <Button size="sm" variant="secondary">
            查看调拨建议
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>仓库周转天数对比</CardTitle>
              <CardDescription>周转天数越高越慢</CardDescription>
            </div>
            <Badge tone="slate">示例</Badge>
          </CardHeader>
          <div className="h-[280px] min-h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseStats} margin={{ left: 8, right: 10, top: 10, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
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
                <Bar dataKey="turnoverDays" fill="rgb(var(--accent))" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>仓库健康概览</CardTitle>
              <CardDescription>利用率与预警数</CardDescription>
            </div>
            <Badge tone="slate">Top 5</Badge>
          </CardHeader>

          <div className="space-y-2">
            {warehouseStats.map((w) => (
              <div key={w.name} className="rounded-xl border bg-[rgba(var(--fg),0.015)] px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">{w.name}</div>
                  <Badge tone={w.turnoverDays >= 32 ? 'yellow' : 'green'}>{w.turnoverDays.toFixed(1)} 天</Badge>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted">
                  <span>库容利用率 {(w.utilization * 100).toFixed(0)}%</span>
                  <span>预警 {w.alerts}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

