import { useMemo, useState } from 'react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { skuRanking } from '../../mock/data'

export function ProductsDiagnosisPage() {
  const [warehouse, setWarehouse] = useState<'全部' | string>('全部')
  const [category, setCategory] = useState<'全部' | string>('全部')

  const warehouses = useMemo(() => Array.from(new Set(skuRanking.map((x) => x.warehouse))), [])
  const categories = useMemo(() => Array.from(new Set(skuRanking.map((x) => x.category))), [])

  const rows = useMemo(() => {
    return skuRanking.filter((x) => {
      if (warehouse !== '全部' && x.warehouse !== warehouse) return false
      if (category !== '全部' && x.category !== category) return false
      return true
    })
  }, [warehouse, category])

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>诊断分析 · 商品分析</CardTitle>
            <CardDescription>SKU 级别周转率排名（Demo）</CardDescription>
          </div>
          <Badge tone="violet">SKU</Badge>
        </CardHeader>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <label className="text-muted">仓库</label>
          <select className="rounded-xl border bg-[rgb(var(--card))] px-3 py-2" value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
            <option value="全部">全部</option>
            {warehouses.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>

          <label className="ml-2 text-muted">分类</label>
          <select className="rounded-xl border bg-[rgb(var(--card))] px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="全部">全部</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="secondary">
              导出
            </Button>
            <Button size="sm" variant="primary">
              生成归因
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>SKU 周转排名</CardTitle>
            <CardDescription>周转天数越高越慢</CardDescription>
          </div>
          <Badge tone="slate">Top {rows.length}</Badge>
        </CardHeader>

        <div className="overflow-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-xs text-muted">
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">排名</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">SKU</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">名称</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">仓库</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">分类</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2">周转天数</th>
                <th className="sticky top-0 bg-[rgb(var(--card))] px-3 py-2 text-right">动作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sku} className="border-t">
                  <td className="px-3 py-2 text-muted">{r.rank}</td>
                  <td className="px-3 py-2 font-medium">{r.sku}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2">{r.warehouse}</td>
                  <td className="px-3 py-2">
                    <Badge tone="slate">{r.category}</Badge>
                  </td>
                  <td className="px-3 py-2 font-semibold">{r.turnoverDays} 天</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm">归因</Button>
                      <Button size="sm" variant="ghost">
                        建议
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

