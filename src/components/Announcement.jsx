import { CONFIG } from '../config'
import { Reveal, Divider, CornerFloral } from './ui'

/* Khối ngày to kiểu: CHỦ NHẬT | 10 | THÁNG 05 / 2026 */
export function BigDate({ dayOfWeek, day, month, year }) {
  return (
    <div className="my-6 flex items-center justify-center gap-4 font-serif2">
      <div className="text-[13px] uppercase leading-relaxed tracking-[2px] text-inkbrown">{dayOfWeek}</div>
      <div className="border-x border-gold px-5 text-[56px] font-semibold leading-none text-wine">{day}</div>
      <div className="text-[13px] uppercase leading-relaxed tracking-[2px] text-inkbrown">
        Tháng {String(month).padStart(2, '0')}
        <br />
        {year}
      </div>
    </div>
  )
}

export default function Announcement() {
  const c = CONFIG.ceremony
  return (
    <section className="relative overflow-hidden px-6 py-12 text-center">
      <CornerFloral className="-right-6 -top-4 rotate-90" />
      <Reveal>
        <Divider />
        <p className="font-times text-sm uppercase leading-loose tracking-[2px] text-inkbrown">
          Trân trọng báo tin
          <br />
          {c.eventName} của con chúng tôi
        </p>

        <div className="my-7">
          <div className="whitespace-nowrap font-script text-[clamp(24px,8vw,44px)] leading-snug text-wine">
            {CONFIG.bride.name}
          </div>
          <div className="mt-1 text-[12px] uppercase tracking-[3px] text-mute">{CONFIG.bride.role}</div>
          <div className="my-2 font-script text-[30px] text-gold">&amp;</div>
          <div className="whitespace-nowrap font-script text-[clamp(24px,8vw,44px)] leading-snug text-wine">
            {CONFIG.groom.name}
          </div>
          <div className="mt-1 text-[12px] uppercase tracking-[3px] text-mute">{CONFIG.groom.role}</div>
        </div>

        <p className="font-times text-sm uppercase leading-loose tracking-[2px] text-inkbrown">
          {c.eventName} được cử hành tại
          <br />
          <span className="text-lg font-semibold text-wine">{c.place}</span>
          <br />
          vào lúc <strong className="text-wine">{c.time}</strong>
        </p>

        <BigDate dayOfWeek={c.dayOfWeek} day={c.day} month={c.month} year={c.year} />
        <p className="text-[13px] italic text-mute">{c.lunarNote}</p>
      </Reveal>
    </section>
  )
}
