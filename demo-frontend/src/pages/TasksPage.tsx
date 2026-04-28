import { useMemo, useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { cn } from '../lib/cn'
import { tasks } from '../mock/data'

type Status = '全部' | '待处理' | '进行中' | '已完成'

export function TasksPage() {
  const [status, setStatus] = useState<Status>('全部')
  const rows = useMemo(() => tasks.filter((t) => (status === '全部' ? true : t.status === status)), [status])

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>任务中心</CardTitle>
            <CardDescription>建议 → 任务，支持状态跟踪（Demo）</CardDescription>
          </div>
          <Badge tone="violet">任务</Badge>
        </CardHeader>

        <div className="flex flex-wrap items-center gap-2">
          {(['全部', '待处理', '进行中', '已完成'] as const).map((s) => (
            <button
              key={s}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition',
                status === s
                  ? 'bg-[rgba(var(--fg),0.06)] ring-1 ring-[rgba(var(--ring),0.25)]'
                  : 'bg-[rgba(var(--fg),0.015)] hover:bg-[rgba(var(--fg),0.04)]',
              )}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="secondary">
              批量指派
            </Button>
            <Button size="sm" variant="primary">
              新建任务
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>任务列表</CardTitle>
            <CardDescription>共 {rows.length} 条</CardDescription>
          </div>
        </CardHeader>

        <div className="space-y-2">
          {rows.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-[rgba(var(--fg),0.015)] px-3 py-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{t.title}</div>
                <div className="mt-1 text-xs text-muted">
                  负责人：{t.owner} · {t.id}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={t.status === '待处理' ? 'yellow' : t.status === '进行中' ? 'violet' : 'green'}>
                  {t.status}
                </Badge>
                <Button size="sm">更新状态</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

