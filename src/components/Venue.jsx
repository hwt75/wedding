import { CONFIG, googleMapsUrl } from '../config'
import { SectionBand, Reveal, GhostButton } from './ui'

export default function Venue() {
  return (
    <section>
      <SectionBand>Địa điểm tổ chức</SectionBand>
      <Reveal className="bg-wine/5 px-6 py-10 text-center">
        <p className="text-[12px] uppercase tracking-[2px] text-mute">Tiệc cưới sẽ tổ chức tại</p>
        <div className="mt-2 font-serif2 text-[22px] font-semibold text-wine">
          {CONFIG.party.venueName}
        </div>
        <div className="mt-1.5 text-sm text-inkbrown">{CONFIG.party.venueAddress}</div>
        <div className="mt-6">
          <GhostButton as="a" href={googleMapsUrl()} target="_blank" rel="noopener noreferrer">
            📍 Xem bản đồ
          </GhostButton>
        </div>
      </Reveal>
    </section>
  )
}
