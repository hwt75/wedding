import { motion } from 'framer-motion'
import { CONFIG, asset } from '../config'

const item = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.35 + i * 0.18, duration: 0.7 } }),
}

/* Nét vẽ trái tim một đường liền (tách từ file anh.png, nền trong suốt) */
function HeartLine() {
  return (
    <img
      src={asset('/heart-line.png')}
      alt=""
      aria-hidden="true"
      className="pointer-events-none relative z-0 -mt-16 w-full"
    />
  )
}

export default function Hero({ opened }) {
  return (
    <section className="relative overflow-hidden bg-[#fbf2ee] pt-20 pb-0 text-center">
      <motion.div initial="hidden" animate={opened ? 'show' : 'hidden'}>
        {/* khối chữ all you need is LOVE */}
        <motion.div custom={0} variants={item} className="relative mx-auto w-full max-w-[440px] px-3">
          <div className="relative z-10 -mb-[0.52em] ml-[4%] text-left font-corinthia text-[clamp(58px,17vw,80px)] leading-none text-[#181818]">
            all you
          </div>
          <div className="relative z-0 text-center font-italiana text-[clamp(100px,29vw,138px)] leading-[0.95] tracking-[0.01em] text-[#8f1d24]">
            LOVE
          </div>
          <div className="relative z-10 -mt-[0.48em] mr-[1%] text-right font-corinthia text-[clamp(52px,15vw,72px)] leading-none text-[#181818]">
            need is
          </div>
        </motion.div>

        {/* tên cô dâu chú rể */}
        <motion.div custom={1} variants={item} className="mt-24">
          <div className="font-alex text-[50px] leading-tight text-neutral-900">
            {CONFIG.bride.shortName}
          </div>
          <div className="my-1 font-cormorant text-[24px] leading-none text-neutral-900">&amp;</div>
          <div className="font-alex text-[50px] leading-tight text-neutral-900">
            {CONFIG.groom.shortName}
          </div>
        </motion.div>

        {/* trái tim vẽ một nét */}
        <motion.div custom={2} variants={item}>
          <HeartLine />
        </motion.div>
      </motion.div>
    </section>
  )
}
