import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages (project site) 需要以仓库名作为 base 路径
  // 部署地址将会是：https://<user>.github.io/Inventory_Turnover_Rate/
  base: '/Inventory_Turnover_Rate/',
  plugins: [react()],
})
