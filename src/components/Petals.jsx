import { useEffect, useRef } from 'react'

/* Vẽ hình trái tim tâm (0,0), bán kính ~s */
function drawHeart(ctx, s) {
  ctx.beginPath()
  ctx.moveTo(0, s * 0.35)
  ctx.bezierCurveTo(-s * 1.1, -s * 0.45, -s * 0.5, -s * 1.1, 0, -s * 0.4)
  ctx.bezierCurveTo(s * 0.5, -s * 1.1, s * 1.1, -s * 0.45, 0, s * 0.35)
  ctx.closePath()
  ctx.fill()
}

/* Hiệu ứng trái tim đỏ rơi (canvas) */
export default function Petals({ active }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let W, H, raf
    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (anyY) => ({
      x: Math.random() * W,
      y: anyY ? Math.random() * H : -20,
      r: 4 + Math.random() * 6,
      vy: 0.5 + Math.random() * 1.1,
      vx: (Math.random() - 0.5) * 0.6,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.03,
      hue: Math.random() < 0.7 ? '124,21,26' : '212,175,55',
      a: 0.22 + Math.random() * 0.35,
    })
    const petals = Array.from({ length: 22 }, () => spawn(true))

    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      petals.forEach((p, i) => {
        p.y += p.vy
        p.x += p.vx + Math.sin(p.y / 60) * 0.4
        p.rot += p.vr
        if (p.y > H + 30) petals[i] = spawn(false)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = `rgba(${p.hue},${p.a})`
        drawHeart(ctx, p.r)
        ctx.restore()
      })
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[60]" />
}
