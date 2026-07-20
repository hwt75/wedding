import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG, asset } from '../config'

/* Ảnh cô dâu chú rể bo tròn làm logo thiệp */
function SealBadge() {
  return (
    <div className="relative h-[92px] w-[92px] rounded-full border-[2.5px] border-gold/80 bg-white p-[3px] shadow-[0_6px_16px_rgba(0,0,0,0.28)]">
      <div className="h-full w-full overflow-hidden rounded-full">
        <img
          src={asset('/photos/TAW08437.jpg')}
          alt="Hương Giang và Tuấn Tú"
          className="max-w-none"
          style={{ width: '205%', marginLeft: '-45%', marginTop: '-119%' }}
        />
      </div>
    </div>
  )
}

/* Nét vẽ trái tim một đường liền ở góc thiệp (dùng hình tách từ anh.png) */
function HeartDoodle({ className = '', flip = false }) {
  return (
    <img
      src={asset('/heart-line.png')}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute w-[230px] opacity-90 md:w-[300px] ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    />
  )
}

/* Hoạ tiết nhỏ giữa đường kẻ phân cách */
function TinyFruit() {
  return (
    <svg viewBox="0 0 18 18" className="h-[14px] w-[14px]" aria-hidden="true">
      <circle cx="9" cy="11" r="4" fill="#7c151a" />
      <path d="M9 7 q-1 -3 -4 -3 q1 3 4 3z" fill="#8c2a2f" />
      <path d="M9 7 q1 -3 4 -3 q-1 3 -4 3z" fill="#a33036" />
      <path d="M9 7 v-2" stroke="#5a0d10" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

/* Màn hình bìa - nhấn "Mở thiệp" để vào thiệp */
export default function Envelope({ opened, onOpen }) {
  const c = CONFIG.ceremony
  const dateText = `${c.day} tháng ${c.month}, ${c.year}`

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
          style={{
            background:
              'radial-gradient(ellipse at 50% 42%, #7e1418 0%, #6a1013 52%, #4d0a0c 100%)',
          }}
          exit={{ opacity: 0, transition: { duration: 0.9, delay: 0.45 } }}
        >
          <motion.div
            className="relative w-full max-w-[860px] overflow-hidden rounded-[18px] bg-[#f6f1ef] px-6 py-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.45)] md:px-24 md:py-16"
            initial={{ y: 26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <HeartDoodle className="left-[-14px] top-[-4px]" flip />
            <HeartDoodle className="bottom-[-4px] right-[-14px]" />

            <div className="relative z-10 flex flex-col items-center">
              <SealBadge />

              <h1 className="mt-9 font-display leading-snug text-wine">
                <span className="block text-[38px] md:text-[44px]">{CONFIG.bride.shortName}</span>
                <span className="my-1 block text-[19px] md:text-[21px]">&amp;</span>
                <span className="block text-[38px] md:text-[44px]">{CONFIG.groom.shortName}</span>
              </h1>

              <div className="mt-6 flex items-center gap-2.5 text-wine">
                <span className="h-px w-[60px] bg-wine/50" />
                <span className="text-wine/40">—</span>
                <TinyFruit />
                <span className="text-wine/40">—</span>
                <span className="h-px w-[60px] bg-wine/50" />
              </div>

              <div className="mt-7 font-cormorant text-[22px] font-medium text-wine md:text-[24px]">
                {dateText}
              </div>

              <div className="mt-6 font-cormorant text-[19px] font-medium text-wine/90 md:text-[21px]">
                Thân Mời
              </div>

              <motion.button
                onClick={onOpen}
                className="mt-8 cursor-pointer rounded-full bg-wine px-11 py-3.5 font-cormorant text-[19px] font-semibold text-[#f6ead9] shadow-[0_10px_24px_rgba(76,10,13,0.45)]"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Mở thiệp
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
