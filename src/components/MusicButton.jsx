import { useEffect, useRef, useState } from 'react'
import { CONFIG, asset } from '../config'

export default function MusicButton({ autoPlaySignal }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // tự phát nhạc khi khách mở thiệp (nếu đã gắn file nhạc)
  useEffect(() => {
    if (!autoPlaySignal || !CONFIG.musicSrc) return
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {})
  }, [autoPlaySignal])

  const toggle = () => {
    const a = audioRef.current
    if (!CONFIG.musicSrc) {
      alert('Chưa gắn file nhạc. Đặt file vào thư mục public/ rồi điền musicSrc trong src/config.js')
      return
    }
    if (a.paused) {
      a.play()
      setPlaying(true)
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      {CONFIG.musicSrc && <audio ref={audioRef} src={asset(CONFIG.musicSrc)} loop preload="none" />}
      <button
        onClick={toggle}
        aria-label="Bật / tắt nhạc nền"
        className={`fixed bottom-5 right-5 z-[80] flex h-11 w-11 items-center justify-center rounded-full bg-wine text-lg text-white shadow-lg shadow-black/30 ${
          playing ? 'animate-spin [animation-duration:4s]' : ''
        }`}
      >
        ♪
      </button>
    </>
  )
}
