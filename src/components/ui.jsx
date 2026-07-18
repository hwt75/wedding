import { motion } from 'framer-motion'

/* Dải tiêu đề đỏ full-width như web mẫu */
export function SectionBand({ children, className = '' }) {
  return (
    <div className={`w-full bg-wine py-3 md:py-4 text-center ${className}`}>
      <h2 className="font-times text-2xl font-semibold uppercase tracking-[0.6px] text-white">
        {children}
      </h2>
    </div>
  )
}

/* Nút đỏ bo tròn có vệt sáng chạy qua (shimmer) như nút mẫu */
export function ShimmerButton({ children, className = '', as: As = 'button', ...props }) {
  return (
    <As
      className={`relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-wine px-8 py-2.5 text-[13px] font-medium uppercase tracking-[1.5px] text-white shadow-lg shadow-wine/30 transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-white/30 blur-[6px] animate-shimmer" />
    </As>
  )
}

export function GhostButton({ children, className = '', as: As = 'button', ...props }) {
  return (
    <As
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-[1.5px] border-wine bg-white px-7 py-2.5 text-[13px] font-medium uppercase tracking-[1.5px] text-wine transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-wine/20 ${className}`}
      {...props}
    >
      {children}
    </As>
  )
}

/* Bọc section với hiệu ứng hiện dần khi cuộn tới */
export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

/* Hoạ tiết hoa lá tối giản màu đỏ - vẽ SVG riêng, đặt ở góc section */
export function CornerFloral({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 200 150"
      className={`pointer-events-none absolute w-[180px] opacity-90 md:w-[230px] ${className}`}
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke="#7c151a" strokeWidth="1.6" strokeLinecap="round">
        <path d="M-10 20 Q40 8 78 42 Q108 70 150 66" />
        <path d="M20 8 Q52 20 72 52" />
        <path d="M78 42 q14 -20 34 -14 q-6 22 -34 14z" fill="#7c151a" opacity=".85" stroke="none" />
        <path d="M50 24 q10 -16 26 -11 q-4 18 -26 11z" fill="#a33036" opacity=".8" stroke="none" />
        <path d="M112 58 q12 -17 30 -12 q-5 19 -30 12z" fill="#7c151a" opacity=".65" stroke="none" />
        <path d="M28 42 q-14 4 -16 18 q16 2 16 -18z" fill="#a33036" opacity=".6" stroke="none" />
        <circle cx="96" cy="34" r="4.5" fill="#d4af37" stroke="none" />
        <circle cx="136" cy="52" r="3.5" fill="#d4af37" stroke="none" />
        <circle cx="42" cy="14" r="3" fill="#d4af37" stroke="none" />
        <path d="M150 66 q22 0 40 14" />
        <circle cx="176" cy="74" r="3" fill="#7c151a" stroke="none" />
      </g>
    </svg>
  )
}

/* Đường kẻ trang trí giữa section */
export function Divider() {
  return (
    <div className="my-4 flex items-center justify-center gap-3 text-wine">
      <span className="h-px w-12 bg-gold" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-wine" aria-hidden="true">
        <path d="M12 21s-7.5-4.9-9.8-9.2C.6 8.6 2.6 5 6.1 5c2.1 0 3.7 1.2 4.4 2.5h3c.7-1.3 2.3-2.5 4.4-2.5 3.5 0 5.5 3.6 3.9 6.8C19.5 16.1 12 21 12 21z" opacity=".9" transform="scale(.86) translate(2 1.5)" />
      </svg>
      <span className="h-px w-12 bg-gold" />
    </div>
  )
}
