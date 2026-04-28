import { useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { cn } from '../lib/cn'
import { alerts } from '../mock/data'

type Tab = '促销建议' | '调拨建议' | '补货优化' | '淘汰建议'

export function RecommendationsPage() {
  const [tab, setTab] = useState<Tab>('促销建议')

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>决策建议</CardTitle>
            <CardDescription>把诊断/归因转成可执行方案（Demo）</CardDescription>
          </div>
          <Badge tone="violet">建议</Badge>
        </CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          {(['促销建议', '调拨建议', '补货优化', '淘汰建议'] as const).map((t) => (
            <button
              key={t}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition',
                tab === t
                  ? 'bg-[rgba(var(--fg),0.06)] ring-1 ring-[rgba(var(--ring),0.25)]'
                  : 'bg-[rgba(var(--fg),0.015)] hover:bg-[rgba(var(--fg),0.04)]',
              )}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="secondary">
              导出方案
            </Button>
            <Button size="sm" variant="primary">
              生成任务
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>{tab}</CardTitle>
            <CardDescription>示例预警数据生成的 Demo 建议</CardDescription>
          </div>
          <Badge tone="slate">{alerts.length} 条</Badge>
        </CardHeader>

        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a.id} className="rounded-xl border bg-[rgba(var(--fg),0.015)] px-3 py-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={a.level === 'red' ? 'red' : 'yellow'}>
                      {a.level === 'red' ? '高优先级' : '中优先级'}
                    </Badge>
                    <div className="truncate text-sm font-medium">{a.name}</div>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {a.sku} · {a.warehouse} · 周转 {a.turnoverDays} 天
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm">转任务</Button>
                  <Button size="sm" variant="ghost">
                    细则
                  </Button>
                </div>
              </div>

              <div className="mt-2 text-sm text-muted">
                {tab === '促销建议' && '建议参与清仓促销：折扣 10%~18%，预计 14 天回到健康区间。'}
                {tab === '调拨建议' && `建议从 ${a.warehouse} 调拨至需求更旺仓，降低结构性积压。`}
                {tab === '补货优化' && '建议下调安全库存并延长补货周期 1~2 周，观察动销恢复。'}
                {tab === '淘汰建议' && '若连续 90 天低动销，建议 SKU 结构优化：下架/合并/清仓。'}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

