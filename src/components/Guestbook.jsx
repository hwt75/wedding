import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchWishes, addWish, subscribeWishes } from '../lib/supabase'

function fmtTime(iso) {
  const d = new Date(iso)
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())} ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`
}

export default function Guestbook() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState('idle')

  useEffect(() => {
    fetchWishes().then(setWishes).catch(() => {})
    // lời chúc mới từ khách khác hiện ngay (Supabase realtime)
    const unsub = subscribeWishes((w) =>
      setWishes((prev) => (prev.some((x) => x.id === w.id) ? prev : [w, ...prev]))
    )
    return unsub
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setState('sending')
    try {
      const item = await addWish(name.trim(), message.trim())
      setWishes((prev) => (prev.some((x) => x.id === item.id) ? prev : [item, ...prev]))
      setName('')
      setMessage('')
      setState('idle')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="bg-gradient-to-b from-wine-light to-wine-dark px-6 py-12 text-white">
      <div className="mb-7 text-center">
        <h2 className="inline-block rounded-full bg-white/12 px-7 py-2.5 font-pattaya text-[26px]">
          Sổ lưu bút
        </h2>
      </div>

      <form onSubmit={submit} className="mx-auto max-w-[360px]">
        <input
          required
          maxLength={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn"
          className="mb-3 w-full rounded-xl bg-white/95 px-4 py-3 text-sm text-neutral-800 outline-none"
        />
        <textarea
          required
          maxLength={500}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Gửi lời chúc tới cô dâu chú rể..."
          className="mb-3 w-full resize-y rounded-xl bg-white/95 px-4 py-3 text-sm text-neutral-800 outline-none"
        />
        {state === 'error' && (
          <p className="mb-2 text-center text-sm text-amber-300">Gửi thất bại, vui lòng thử lại.</p>
        )}
        <button
          disabled={state === 'sending'}
          className="w-full cursor-pointer rounded-full bg-gold py-3 text-[13px] font-semibold uppercase tracking-[1.5px] text-wine-dark transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {state === 'sending' ? 'Đang gửi…' : '🪄 Gửi lời chúc'}
        </button>
      </form>

      <div className="mx-auto mt-7 flex max-w-[360px] flex-col gap-3">
        <AnimatePresence initial={false}>
          {wishes.map((w) => (
            <motion.div
              key={w.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white/10 px-4 py-3 text-sm"
            >
              <div className="text-[13px] font-semibold text-gold">{w.name}</div>
              <div className="mt-0.5 leading-relaxed">{w.message}</div>
              <div className="mt-1.5 text-[11px] text-white/55">{fmtTime(w.created_at)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
