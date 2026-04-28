import { useMemo, useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { cn } from '../lib/cn'
import { alerts, type AlertItem } from '../mock/data'

type LevelFilter = '全部' | '红色' | '黄色'
type TypeFilter = '全部' | AlertItem['type']

export function AlertsPage() {
  const [level, setLevel] = useState<LevelFilter>('全部')
  const [type, setType] = useState<TypeFilter>('全部')

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      if (level === '红色' && a.level !== 'red') return false
      if (level === '黄色' && a.level !== 'yellow') return false
      if (type !== '全部' && a.type !== type) return false
      return true
    })
  }, [level, type])

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>预警中心</CardTitle>
            <CardDescription>阈值/趋势/同比环比/智能预警统一入口</CardDescription>
          </div>
          <Badge tone="violet">可配置</Badge>
        </CardHeader>

        <div className="flex flex-wrap items-center gap-2">
          {(['全部', '红色', '黄色'] as const).map((x) => (
            <button
              key={x}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition',
                level === x
                  ? 'bg-[rgba(var(--fg),0.06)] ring-1 ring-[rgba(var(--ring),0.25)]'
                  : 'bg-[rgba(var(--fg),0.015)] hover:bg-[rgba(var(--fg),0.04)]',
              )}
              onClick={() => setLevel(x)}
            >
              {x}
            </button>
          ))}

          <div className="mx-1 h-5 w-px bg-[rgba(var(--fg),0.12)]" />

          {(['全部', '阈值预警', '趋势预警', '同比环比', '智能预警'] as const).map((x) => (
            <button
              key={x}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition',
                type === x
                  ? 'bg-[rgba(var(--fg),0.06)] ring-1 ring-[rgba(var(--ring),0.25)]'
                  : 'bg-[rgba(var(--fg),0.015)] hover:bg-[rgba(var(--fg),0.04)]',
              )}
              onClick={() => setType(x)}
            >
              {x}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>待处理预警</CardTitle>
            <CardDescription>共 {filtered.length} 条</CardDescription>
          </div>
          <Button variant="primary">批量生成建议</Button>
        </CardHeader>

        <div className="overflow-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-xs text-muted">
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">级别</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">商品</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">仓库</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">周转天数</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">变化</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">类型</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-3 py-2">
                    <Badge tone={a.level === 'red' ? 'red' : 'yellow'}>
                      {a.level === 'red' ? '红色' : '黄色'}
                    </Badge>
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-muted">{a.sku}</div>
                  </td>
                  <td className="px-3 py-2">{a.warehouse}</td>
                  <td className="px-3 py-2 font-semibold">{a.turnoverDays} 天</td>
                  <td className="px-3 py-2 text-muted">↑ {a.deltaPct}%</td>
                  <td className="px-3 py-2">
                    <Badge tone="slate">{a.type}</Badge>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm">处理</Button>
                      <Button size="sm" variant="ghost">
                        详情
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

