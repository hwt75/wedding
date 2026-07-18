import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG, photoSrcs } from '../config'
import { SectionBand, Reveal } from './ui'

export default function Album() {
  const [lbIndex, setLbIndex] = useState(-1)
  const preview = Math.min(CONFIG.albumPreview, photoSrcs.length)
  const extra = photoSrcs.length - preview

  const close = useCallback(() => setLbIndex(-1), [])
  const step = useCallback(
    (d) => setLbIndex((i) => (i + d + photoSrcs.length) % photoSrcs.length),
    []
  )

  useEffect(() => {
    if (lbIndex < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lbIndex, close, step])

  return (
    <section>
      <SectionBand>Album ảnh cưới</SectionBand>
      <Reveal className="px-6 py-10">
        <div className="grid grid-cols-2 gap-2.5">
          {photoSrcs.slice(0, preview).map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setLbIndex(i)}
              className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-neutral-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={src}
                alt={`Ảnh cưới ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {i === preview - 1 && extra > 0 && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/50 font-serif2 text-3xl text-white">
                  +{extra}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {lbIndex >= 0 && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.img
              key={lbIndex}
              src={photoSrcs[lbIndex]}
              alt={`Ảnh cưới ${lbIndex + 1}`}
              className="max-h-[84vh] max-w-[92vw] rounded-lg object-contain"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              aria-label="Đóng"
              onClick={close}
              className="absolute right-4 top-4 text-2xl text-white/90"
            >
              ✕
            </button>
            <button
              aria-label="Ảnh trước"
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white"
            >
              ‹
            </button>
            <button
              aria-label="Ảnh sau"
              onClick={(e) => { e.stopPropagation(); step(1) }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white"
            >
              ›
            </button>
            <div className="absolute bottom-5 left-0 right-0 text-center text-[13px] text-white/80">
              {lbIndex + 1} / {photoSrcs.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
