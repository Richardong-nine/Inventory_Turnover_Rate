import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

export function SettingsPage() {
  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>系统设置</CardTitle>
            <CardDescription>预警配置 / 数据源配置（Demo）</CardDescription>
          </div>
          <Badge tone="violet">配置</Badge>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>预警配置</CardTitle>
              <CardDescription>阈值 / 趋势 / 同比环比 / 智能预警</CardDescription>
            </div>
            <Badge tone="slate">示例</Badge>
          </CardHeader>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
              <div className="font-medium">阈值预警</div>
              <div className="mt-1 text-muted">周转天数阈值：&gt; 30 天</div>
            </div>
            <div className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
              <div className="font-medium">趋势预警</div>
              <div className="mt-1 text-muted">连续下降 N 天触发：N = 5</div>
            </div>
            <div className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
              <div className="font-medium">同比环比</div>
              <div className="mt-1 text-muted">下降超过 X% 触发：X = 15%</div>
            </div>
            <div className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
              <div className="font-medium">智能预警</div>
              <div className="mt-1 text-muted">基于历史数据自动识别异常（启用）</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" variant="secondary">
              恢复默认
            </Button>
            <Button size="sm" variant="primary">
              保存配置
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>数据源配置</CardTitle>
              <CardDescription>手动导入 / API 对接 / 数据库直连</CardDescription>
            </div>
            <Badge tone="slate">示例</Badge>
          </CardHeader>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
              <div className="font-medium">手动导入</div>
              <div className="mt-1 text-muted">支持 Excel/CSV 上传</div>
            </div>
            <div className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
              <div className="font-medium">API 对接</div>
              <div className="mt-1 text-muted">REST API 实时同步（未配置）</div>
            </div>
            <div className="rounded-xl border bg-[rgba(var(--fg),0.015)] p-3">
              <div className="font-medium">数据库直连</div>
              <div className="mt-1 text-muted">MySQL / PostgreSQL（未配置）</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" variant="secondary">
              测试连接
            </Button>
            <Button size="sm" variant="primary">
              保存配置
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

