import { useMemo, useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

type FactorGroup = '供应端' | '需求端' | '外部环境'
type FactorKey =
  | '采购批量'
  | '进货频率'
  | '供应商交期'
  | '销量变化'
  | '季节性因素'
  | '竞品影响'
  | '价格因素'
  | '市场行情'
  | '政策变化'
  | '突发事件'

type Factor = {
  key: FactorKey
  group: FactorGroup
  modelWeight: number
  note: string
}

const factors: Factor[] = [
  { key: '采购批量', group: '供应端', modelWeight: 0.13, note: '批量过大导致库存堆积' },
  { key: '进货频率', group: '供应端', modelWeight: 0.08, note: '频率偏高造成安全库存偏大' },
  { key: '供应商交期', group: '供应端', modelWeight: 0.07, note: '交期波动引发备货策略保守' },

  { key: '销量变化', group: '需求端', modelWeight: 0.22, note: '销量走弱直接拉长周转周期' },
  { key: '季节性因素', group: '需求端', modelWeight: 0.12, note: '淡旺季切换导致需求预测偏差' },
  { key: '竞品影响', group: '需求端', modelWeight: 0.11, note: '竞品促销/上新分流需求' },
  { key: '价格因素', group: '需求端', modelWeight: 0.09, note: '价格带变化影响转化' },

  { key: '市场行情', group: '外部环境', modelWeight: 0.08, note: '行业景气度影响动销' },
  { key: '政策变化', group: '外部环境', modelWeight: 0.05, note: '合规/关务变化影响交付节奏' },
  { key: '突发事件', group: '外部环境', modelWeight: 0.05, note: '突发事件导致短期失真' },
]

function normalize(w: Record<FactorKey, number>) {
  const sum = Object.values(w).reduce((a, b) => a + b, 0)
  const out = { ...w }
  for (const k of Object.keys(out) as FactorKey[]) out[k] = sum ? out[k] / sum : out[k]
  return out
}

export function AttributionPage() {
  const model = useMemo(() => {
    const entries = factors.map((f) => [f.key, f.modelWeight] as const)
    const w = Object.fromEntries(entries) as Record<FactorKey, number>
    return normalize(w)
  }, [])
  const [user, setUser] = useState<Record<FactorKey, number>>(model)

  const set = (k: FactorKey, v: number) => setUser((prev) => normalize({ ...prev, [k]: v }))

  const grouped = useMemo(() => {
    const g: Record<FactorGroup, Factor[]> = { 供应端: [], 需求端: [], 外部环境: [] }
    for (const f of factors) g[f.group].push(f)
    return g
  }, [])

  const summary = useMemo(() => {
    const byGroup: Record<FactorGroup, number> = { 供应端: 0, 需求端: 0, 外部环境: 0 }
    for (const f of factors) byGroup[f.group] += user[f.key]
    const top = [...factors]
      .map((f) => ({ key: f.key, w: user[f.key] }))
      .sort((a, b) => b.w - a.w)
      .slice(0, 3)
    return { byGroup, top }
  }, [user])

  const pct = (x: number) => `${(x * 100).toFixed(1)}%`

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>归因分析</CardTitle>
            <CardDescription>模型权重 + 手动微调（自动归一化，总和 100%）</CardDescription>
          </div>
          <Badge tone="violet">可微调</Badge>
        </CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted">
            Top 影响因素：{summary.top.map((x) => `${x.key}（${pct(x.w)}）`).join(' / ')}
          </div>
          <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setUser(model)}>
            重置为模型
          </Button>
          <Button size="sm" variant="primary">
            保存微调
          </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>归因汇总</CardTitle>
              <CardDescription>按维度聚合后的权重</CardDescription>
            </div>
            <Badge tone="slate">自动汇总</Badge>
          </CardHeader>
          <div className="space-y-3">
            {(['供应端', '需求端', '外部环境'] as const).map((g) => (
              <div key={g} className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <div className="font-medium">{g}</div>
                  <div className="text-muted">{pct(summary.byGroup[g])}</div>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[rgba(var(--fg),0.08)]">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))]"
                    style={{ width: `${summary.byGroup[g] * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>归因权重微调</CardTitle>
              <CardDescription>拖动滑块后会自动归一化，总和保持 100%</CardDescription>
            </div>
            <Badge tone="slate">交互 Demo</Badge>
          </CardHeader>

          <div className="space-y-4">
            {(Object.keys(grouped) as FactorGroup[]).map((group) => (
              <div key={group} className="rounded-2xl border bg-[rgba(var(--fg),0.015)] p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold">{group}</div>
                  <div className="text-xs text-muted">{pct(summary.byGroup[group])}</div>
                </div>
                <div className="space-y-3">
                  {grouped[group].map((f) => (
                    <div key={f.key} className="rounded-xl border bg-[rgb(var(--card))] p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-sm font-medium">{f.key}</div>
                            <Badge tone="slate">模型 {pct(model[f.key])}</Badge>
                            <Badge tone="violet">当前 {pct(user[f.key])}</Badge>
                          </div>
                          <div className="mt-1 text-xs text-muted">{f.note}</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <input
                          className="w-full accent-[rgb(var(--accent))]"
                          type="range"
                          min={0}
                          max={0.5}
                          step={0.005}
                          value={user[f.key]}
                          onChange={(e) => set(f.key, Number(e.target.value))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

