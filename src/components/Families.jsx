import { CONFIG } from '../config'
import { SectionBand, Reveal } from './ui'

function FamilyCard({ side, father, mother, address }) {
  return (
    <div className="rounded-2xl border border-wine/15 bg-white px-4 py-6 text-center shadow-sm">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[3px] text-gold">{side}</div>
      <div className="text-xs text-mute">Ông</div>
      <div className="font-serif2 text-base font-semibold text-wine">{father}</div>
      <div className="mt-2 text-xs text-mute">Bà</div>
      <div className="font-serif2 text-base font-semibold text-wine">{mother}</div>
      <div className="mt-3 text-[12px] leading-relaxed text-inkbrown">{address}</div>
    </div>
  )
}

export default function Families() {
  return (
    <section>
      <SectionBand>Thông tin lễ cưới</SectionBand>
      <Reveal className="px-6 py-10">
        <div className="grid grid-cols-2 gap-4">
          <FamilyCard
            side="Nhà trai"
            father={CONFIG.groom.father}
            mother={CONFIG.groom.mother}
            address={CONFIG.groom.address}
          />
          <FamilyCard
            side="Nhà gái"
            father={CONFIG.bride.father}
            mother={CONFIG.bride.mother}
            address={CONFIG.bride.address}
          />
        </div>
      </Reveal>
    </section>
  )
}
