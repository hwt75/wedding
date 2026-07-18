import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { SectionBand } from './ui'

export default function Schedule() {
  if (CONFIG.schedule.length === 0) return null
  return (
    <section>
      <SectionBand>Lịch trình ngày cưới</SectionBand>
      <div className="px-6 py-10">
        <div className="relative mx-auto max-w-[300px] pl-7 before:absolute before:bottom-1.5 before:left-[7px] before:top-1.5 before:w-px before:bg-gradient-to-b before:from-gold before:to-wine">
          {CONFIG.schedule.map((s, i) => (
            <motion.div
              key={s.time}
              className="relative pb-6 last:pb-0"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <span className="absolute -left-[25px] top-1.5 h-[11px] w-[11px] rounded-full border-[2.5px] border-wine bg-cream" />
              <div className="font-serif2 text-[17px] font-semibold text-wine">{s.time}</div>
              <div className="text-sm text-inkbrown">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
