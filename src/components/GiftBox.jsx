import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG, asset } from '../config'
import { SectionBand, Reveal } from './ui'

function BankCard({ title, bank }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bank.account)
    } catch {
      const t = document.createElement('textarea')
      t.value = bank.account
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-4 rounded-2xl border border-wine/20 bg-white px-4 py-5">
      <h3 className="text-[13px] font-semibold uppercase tracking-wide text-wine">{title}</h3>
      <div className="mt-1.5 text-[13px] text-inkbrown">{bank.bankName || 'Ngân hàng: đang cập nhật'}</div>
      <div className="my-1.5 font-serif2 text-[21px] font-semibold tracking-[2px]">{bank.account || '· · · · · · · · ·'}</div>
      <div className="text-[13px] text-inkbrown">{bank.holder}</div>
      <div className="mx-auto my-3 flex h-[130px] w-[130px] items-center justify-center overflow-hidden rounded-xl border border-wine/20 bg-wine/5 text-[12px] leading-relaxed text-wine">
        {bank.qrImage ? (
          <img src={asset(bank.qrImage)} alt={`QR ${title}`} className="h-full w-full object-contain" />
        ) : (
          <span>
            Ảnh QR
            <br />
            (điền qrImage
            <br />
            trong config.js)
          </span>
        )}
      </div>
      {bank.account && (
        <button
          onClick={copy}
          className={`cursor-pointer rounded-full border border-wine px-5 py-1.5 text-[12px] tracking-wide transition-colors ${
            copied ? 'bg-wine text-white' : 'text-wine hover:bg-wine/5'
          }`}
        >
          {copied ? 'Đã sao chép ✓' : 'Sao chép STK'}
        </button>
      )}
    </div>
  )
}

export default function GiftBox() {
  const [open, setOpen] = useState(false)

  return (
    <section>
      <SectionBand>Hộp quà mừng</SectionBand>
      <Reveal className="px-6 py-10 text-center">
        <motion.button
          onClick={() => setOpen(true)}
          aria-label="Mở hộp quà mừng"
          className="mx-auto block w-[150px] animate-float cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="18" y="44" width="84" height="58" rx="6" fill="#7c151a" />
            <rect x="12" y="30" width="96" height="20" rx="5" fill="#8a1a20" />
            <rect x="54" y="30" width="12" height="72" fill="#d4af37" />
            <path d="M60 30 C48 8 24 14 30 26 C34 34 50 32 60 30z" fill="#d4af37" />
            <path d="M60 30 C72 8 96 14 90 26 C86 34 70 32 60 30z" fill="#d4af37" />
            <circle cx="60" cy="30" r="5" fill="#b8952a" />
          </svg>
        </motion.button>
        <div className="mt-3 text-[13px] tracking-[1px] text-mute">✦ Nhấn để mở ✦</div>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative max-h-[86vh] w-full max-w-[400px] overflow-y-auto rounded-2xl bg-cream px-5 py-7 text-center"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Đóng"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-2.5 text-xl text-mute"
              >
                ✕
              </button>
              <div className="inline-block rounded-full bg-wine px-6 py-2 font-times text-[16px] font-semibold uppercase tracking-wide text-white">
                Hộp quà mừng
              </div>
              <BankCard title={`Cô dâu · ${CONFIG.bride.name}`} bank={CONFIG.bride.bank} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
