import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge } from '../../components/ui/Badge'
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { turnoverTrend30d } from '../../mock/data'

export function TrendsDiagnosisPage() {
  const anomalyIdx = 22
  const anomaly = turnoverTrend30d[anomalyIdx]

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>诊断分析 · 趋势分析</CardTitle>
            <CardDescription>识别异常波动（Demo）</CardDescription>
          </div>
          <Badge tone="violet">时间序列</Badge>
        </CardHeader>
        <div className="text-sm text-muted">
          示例：{anomaly.day} 附近出现异常上升，建议进入「归因分析」查看权重并微调。
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>周转天数曲线（30 天）</CardTitle>
            <CardDescription>带异常点提示</CardDescription>
          </div>
          <Badge tone="slate">近 30 天</Badge>
        </CardHeader>
        <div className="h-[320px] min-h-[320px] w-full">
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
              <Line
                type="monotone"
                dataKey="turnoverDays"
                stroke="rgb(var(--accent))"
                strokeWidth={2.2}
                dot={({ cx, cy, index }) => {
                  if (index !== anomalyIdx) return null
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={6} fill="rgb(var(--accent-2))" />
                      <circle cx={cx} cy={cy} r={10} fill="rgba(var(--accent-2),0.18)" />
                    </g>
                  )
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

