import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Đường dẫn gốc khi deploy:
  //  - GitHub Pages dạng hwt75.github.io/wedding/  -> đặt VITE_BASE=/wedding/
  //  - Domain riêng (vd tuantuhuonggiang.love) hoặc Vercel -> để '/'
  base: process.env.VITE_BASE || '/',
  server: { port: 5173 },
})
