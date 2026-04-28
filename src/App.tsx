import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './app/AppShell'
import { AlertsPage } from './pages/AlertsPage'
import { AttributionPage } from './pages/AttributionPage'
import { DashboardPage } from './pages/DashboardPage'
import { RecommendationsPage } from './pages/RecommendationsPage'
import { ReportsPage } from './pages/ReportsPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'
import { ProductsDiagnosisPage } from './pages/diagnosis/ProductsDiagnosisPage'
import { TrendsDiagnosisPage } from './pages/diagnosis/TrendsDiagnosisPage'
import { WarehousesDiagnosisPage } from './pages/diagnosis/WarehousesDiagnosisPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/alerts" element={<AlertsPage />} />

          <Route path="/diagnosis/products" element={<ProductsDiagnosisPage />} />
          <Route path="/diagnosis/warehouses" element={<WarehousesDiagnosisPage />} />
          <Route path="/diagnosis/trends" element={<TrendsDiagnosisPage />} />

          <Route path="/attribution" element={<AttributionPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

