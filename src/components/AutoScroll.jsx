import { useEffect, useRef, useState } from 'react'

/* Tự động cuộn thiệp từ từ sau khi khách mở.
   - Tự dừng khi khách tự cuộn / chạm màn hình / cuộn tới cuối.
   - Nút góc dưới phải để bật/tắt lại. */
export default function AutoScroll({ active }) {
  const [on, setOn] = useState(false)
  const rafRef = useRef(0)
  const accRef = useRef(0)

  // bắt đầu cuộn sau khi hiệu ứng mở thiệp xong
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setOn(true), 1400)
    return () => clearTimeout(t)
  }, [active])

  useEffect(() => {
    if (!on) return
    const SPEED = 26 // tốc độ px mỗi giây (nhỏ = chậm, êm)
    let last = performance.now()

    const step = (now) => {
      const dt = (now - last) / 1000
      last = now
      accRef.current += SPEED * dt
      const move = Math.floor(accRef.current)
      if (move >= 1) {
        accRef.current -= move
        window.scrollBy(0, move)
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) {
        setOn(false)
        return
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    // khách tự tương tác -> dừng tự cuộn (scrollBy không kích hoạt các sự kiện này)
    const pause = () => setOn(false)
    window.addEventListener('wheel', pause, { passive: true })
    window.addEventListener('touchstart', pause, { passive: true })
    window.addEventListener('keydown', pause)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('wheel', pause)
      window.removeEventListener('touchstart', pause)
      window.removeEventListener('keydown', pause)
    }
  }, [on])

  const toggle = () => {
    // nếu đang ở cuối trang, bấm nút sẽ đưa về đầu để xem lại
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4
    if (!on && atBottom) window.scrollTo({ top: 0, behavior: 'smooth' })
    setOn((v) => !v)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Bật / tắt tự động cuộn"
      className={`fixed bottom-[72px] right-5 z-[80] flex h-11 w-11 items-center justify-center rounded-full bg-wine text-lg text-white shadow-lg shadow-black/30 transition ${
        on ? 'ring-2 ring-gold' : ''
      }`}
    >
      {on ? '⏸' : '↓'}
    </button>
  )
}
