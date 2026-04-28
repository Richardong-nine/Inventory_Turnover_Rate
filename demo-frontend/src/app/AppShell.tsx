import { Bell, Search } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/cn'
import { navGroups } from './nav'

function usePageTitle() {
  const { pathname } = useLocation()
  for (const g of navGroups) {
    const hit = g.items.find((i) => i.to === pathname)
    if (hit) return hit.label
  }
  if (pathname.startsWith('/diagnosis/')) return '诊断分析'
  return '库存周转率健康分析平台'
}

export function AppShell() {
  const title = usePageTitle()
  const { pathname } = useLocation()

  return (
    <div className="h-full bg-[rgb(var(--bg))]">
      <div className="mx-auto flex h-full max-w-[1400px]">
        <aside className="hidden w-[288px] flex-col border-r bg-[rgb(var(--bg-2))] px-4 py-5 md:flex">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">
                库存周转率健康分析平台
              </div>
              <div className="truncate text-xs text-muted">Inventory Turnover Analyzer</div>
            </div>
            <Badge tone="violet">Demo</Badge>
          </div>

          <nav className="flex-1 space-y-5 overflow-auto pr-1">
            {navGroups.map((g) => (
              <div key={g.title}>
                <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted">
                  {g.title}
                </div>
                <div className="space-y-1">
                  {g.items.map((item) => {
                    const isActive = item.to === pathname
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={cn(
                          'group relative flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition',
                          'hover:bg-[rgba(var(--fg),0.035)]',
                          isActive &&
                            'bg-white/75 dark:bg-[rgba(var(--fg),0.075)] ring-1 ring-[rgba(var(--ring),0.38)] shadow-soft',
                        )}
                      >
                        <span
                          className={cn(
                            'absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-transparent transition',
                            'group-hover:bg-[rgba(var(--accent),0.25)]',
                            isActive && 'bg-[rgba(var(--accent),0.9)]',
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            'text-muted transition group-hover:text-[rgb(var(--fg))]',
                            isActive && 'text-[rgb(var(--fg))]',
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className={cn('truncate', isActive && 'font-semibold')}>{item.label}</span>
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-4 rounded-2xl border bg-[rgb(var(--card))] p-3 shadow-soft">
            <div className="text-xs text-muted">今日预警</div>
            <div className="mt-1 flex items-end justify-between">
              <div className="text-lg font-semibold">5</div>
              <Badge tone="red">2 红</Badge>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b bg-[rgba(var(--bg),0.88)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(var(--bg),0.72)]">
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
              <div className="min-w-0">
                <div className="text-xs text-muted">欢迎回来</div>
                <div className="truncate text-base font-semibold tracking-tight">{title}</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-xl border bg-white/70 px-3 py-2 text-sm text-muted shadow-soft md:flex dark:bg-[rgb(var(--card))]">
                  <Search size={16} className="opacity-70" />
                  <span className="select-none">搜索 SKU / 仓库 / 报告…</span>
                </div>
                <Button variant="ghost" className="h-9 w-9 px-0">
                  <Bell size={18} />
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 py-5 md:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

