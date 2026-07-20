import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG, googleCalendarUrl } from '../config'
import { Reveal, ShimmerButton, GhostButton } from './ui'
import { BigDate } from './Announcement'
import { addRsvp } from '../lib/store'

/* ---------- Lịch tháng cưới ---------- */
function Calendar() {
  const d = CONFIG.party.date
  const y = d.getFullYear()
  const m = d.getMonth()
  const day = d.getDate()
  const first = new Date(y, m, 1)
  const lead = (first.getDay() + 6) % 7 // Thứ 2 đứng đầu
  const days = new Date(y, m + 1, 0).getDate()

  return (
    <div className="mx-auto mt-6 max-w-[340px] rounded-2xl border border-wine/15 bg-white px-4 py-5 shadow-sm">
      <div className="mb-3 font-serif2 font-semibold tracking-wide text-wine">
        Tháng {m + 1} / {y}
      </div>
      <div className="grid grid-cols-7 gap-1 text-[13px]">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((t) => (
          <div key={t} className="py-1 text-[11px] font-semibold text-gold">{t}</div>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <div key={`e${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const n = i + 1
          const isDay = n === day
          return (
            <div key={n} className="relative flex h-8 items-center justify-center">
              {isDay && (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="absolute h-8 w-8 animate-pulse-ring fill-wine drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                >
                  <path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09 C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5 c0,3.78-3.4,6.86-8.55,11.54L12,21.35z" />
                </svg>
              )}
              <span
                className={`relative z-10 ${isDay ? 'pb-1 font-semibold text-white' : 'text-inkbrown'}`}
              >
                {n}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Đếm ngược ---------- */
function Countdown() {
  const calc = () => {
    const diff = Math.max(0, CONFIG.party.date - new Date())
    return {
      d: Math.floor(diff / 864e5),
      h: Math.floor(diff / 36e5) % 24,
      m: Math.floor(diff / 6e4) % 60,
      s: Math.floor(diff / 1e3) % 60,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  const cells = [
    [t.d, 'Ngày'],
    [t.h, 'Giờ'],
    [t.m, 'Phút'],
    [t.s, 'Giây'],
  ]
  return (
    <div className="mt-6 flex justify-center gap-3">
      {cells.map(([v, label]) => (
        <div
          key={label}
          className="w-[70px] rounded-xl border border-wine/15 bg-white py-3 text-center shadow-sm"
        >
          <div className="font-serif2 text-[26px] font-semibold leading-tight text-wine">{v}</div>
          <div className="text-[10px] uppercase tracking-[1.5px] text-mute">{label}</div>
        </div>
      ))}
    </div>
  )
}

/* ---------- Modal xác nhận tham dự ---------- */
function RsvpModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: 0, note: '' })
  const [state, setState] = useState('idle') // idle | sending | done | error

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await addRsvp({
        name: form.name.trim(),
        attending: form.attending === 'yes',
        guests: Number(form.guests) || 0,
        note: form.note.trim(),
      })
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[86vh] w-full max-w-[400px] overflow-y-auto rounded-2xl bg-cream px-6 py-7 text-center"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Đóng"
              onClick={onClose}
              className="absolute right-3 top-2.5 text-xl text-mute"
            >
              ✕
            </button>
            <div className="inline-block rounded-full bg-wine px-6 py-2 font-times text-[16px] font-semibold uppercase tracking-wide text-white">
              Xác nhận tham dự
            </div>

            {state === 'done' ? (
              <div className="py-8 font-serif2 text-lg text-wine">
                Cảm ơn bạn đã xác nhận! ♡
                <br />
                Hẹn gặp bạn trong ngày vui của chúng tôi.
              </div>
            ) : (
              <form onSubmit={submit} className="mt-5 text-left">
                <label className="text-[12px] font-semibold uppercase tracking-wide text-wine">
                  Họ tên
                </label>
                <input
                  required
                  maxLength={60}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="mt-1.5 mb-4 w-full rounded-xl border border-wine/25 bg-white px-4 py-2.5 text-sm outline-none focus:border-wine"
                />
                <label className="text-[12px] font-semibold uppercase tracking-wide text-wine">
                  Bạn sẽ tham dự chứ?
                </label>
                <select
                  value={form.attending}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                  className="mt-1.5 mb-4 w-full rounded-xl border border-wine/25 bg-white px-4 py-2.5 text-sm outline-none focus:border-wine"
                >
                  <option value="yes">Có, tôi sẽ tham dự 🎉</option>
                  <option value="no">Rất tiếc, tôi bận mất rồi 😢</option>
                </select>
                <label className="text-[12px] font-semibold uppercase tracking-wide text-wine">
                  Số người đi cùng
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="mt-1.5 mb-4 w-full rounded-xl border border-wine/25 bg-white px-4 py-2.5 text-sm outline-none focus:border-wine"
                />
                <label className="text-[12px] font-semibold uppercase tracking-wide text-wine">
                  Lời nhắn (không bắt buộc)
                </label>
                <textarea
                  rows={2}
                  maxLength={300}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="mt-1.5 mb-5 w-full resize-y rounded-xl border border-wine/25 bg-white px-4 py-2.5 text-sm outline-none focus:border-wine"
                />
                {state === 'error' && (
                  <p className="mb-3 text-sm text-red-600">Gửi thất bại, vui lòng thử lại.</p>
                )}
                <ShimmerButton className="w-full" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Đang gửi…' : 'Gửi xác nhận'}
                </ShimmerButton>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Party() {
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const p = CONFIG.party

  return (
    <section className="px-6 py-12 text-center">
      <Reveal>
        <h3 className="font-serif2 text-[19px] italic text-wine">{p.title}</h3>
        <div className="mt-1 font-serif2 text-[36px] font-semibold text-wine">{p.time}</div>
        <BigDate
          dayOfWeek={p.dayOfWeek}
          day={p.date.getDate()}
          month={p.date.getMonth() + 1}
          year={p.date.getFullYear()}
        />
        <p className="text-[13px] italic text-mute">{p.lunarNote}</p>

        <Calendar />
        <Countdown />

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <GhostButton as="a" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
            📅 Thêm vào lịch
          </GhostButton>
          <ShimmerButton onClick={() => setRsvpOpen(true)}>Xác nhận tham dự</ShimmerButton>
        </div>
      </Reveal>

      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </section>
  )
}
