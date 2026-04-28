import { Download, Eye, FileText } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { reports } from '../mock/data'

export function ReportsPage() {
  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>报告中心</CardTitle>
            <CardDescription>PDF 报告在线预览与下载（Demo）</CardDescription>
          </div>
          <Badge tone="violet">PDF</Badge>
        </CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="primary">
            生成周报
          </Button>
          <Button size="sm" variant="secondary">
            生成月报
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>最新报告</CardTitle>
            <CardDescription>共 {reports.length} 份</CardDescription>
          </div>
          <Badge tone="slate">示例</Badge>
        </CardHeader>

        <div className="space-y-2">
          {reports.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-[rgba(var(--fg),0.015)] px-3 py-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText size={16} className="text-muted" />
                  <span className="truncate">
                    {r.date} · {r.name}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted">{r.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary">
                  <Eye size={16} />
                  预览
                </Button>
                <Button size="sm" variant="ghost">
                  <Download size={16} />
                  下载
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

