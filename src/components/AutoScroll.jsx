import { useEffect, useRef, useState } from 'react'

/* Tự động cuộn thiệp từ từ sau khi khách mở.
   - Tự dừng khi khách tự cuộn / chạm màn hình / cuộn tới cuối.
   - Nút góc dưới phải để bật/tắt lại.
   Dùng document.scrollingElement để chạy đúng trên cả Safari/iOS. */
export default function AutoScroll({ active }) {
  const [on, setOn] = useState(false)
  const rafRef = useRef(0)
  const accRef = useRef(0)

  const getScroller = () => document.scrollingElement || document.documentElement

  // bắt đầu cuộn sau khi hiệu ứng mở thiệp xong
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setOn(true), 1400)
    return () => clearTimeout(t)
  }, [active])

  useEffect(() => {
    if (!on) return
    const scroller = getScroller()
    // tắt tạm scroll-behavior:smooth (từ CSS) để mỗi bước cuộn là tức thời,
    // nếu không Safari sẽ đứng im vì mỗi khung lại khởi động 1 animation mượt mới
    const prevBehavior = scroller.style.scrollBehavior
    scroller.style.scrollBehavior = 'auto'
    const SPEED = 48 // tốc độ px mỗi giây (nhỏ = chậm, êm)
    let last = performance.now()

    const step = (now) => {
      // chặn dt quá lớn khi rAF bị trình duyệt bóp (đổi tab, cuộn quán tính)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      accRef.current += SPEED * dt
      const move = Math.floor(accRef.current)
      if (move >= 1) {
        accRef.current -= move
        scroller.scrollTop += move
      }
      const maxScroll = scroller.scrollHeight - scroller.clientHeight
      if (scroller.scrollTop >= maxScroll - 2) {
        setOn(false)
        return
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    // khách tự tương tác -> dừng tự cuộn (việc set scrollTop không kích hoạt các sự kiện này)
    const pause = () => setOn(false)
    window.addEventListener('wheel', pause, { passive: true })
    window.addEventListener('touchmove', pause, { passive: true })
    window.addEventListener('keydown', pause)
    return () => {
      cancelAnimationFrame(rafRef.current)
      scroller.style.scrollBehavior = prevBehavior
      window.removeEventListener('wheel', pause)
      window.removeEventListener('touchmove', pause)
      window.removeEventListener('keydown', pause)
    }
  }, [on])

  const toggle = () => {
    const scroller = getScroller()
    const maxScroll = scroller.scrollHeight - scroller.clientHeight
    // nếu đang tắt và ở cuối trang -> đưa về đầu để xem lại
    if (!on && scroller.scrollTop >= maxScroll - 4) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' })
    }
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
