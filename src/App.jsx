import { useState } from 'react'
import Envelope from './components/Envelope'
import Petals from './components/Petals'
import MusicButton from './components/MusicButton'
import Hero from './components/Hero'
import Families from './components/Families'
import Announcement from './components/Announcement'
import Album from './components/Album'
import Party from './components/Party'
import Venue from './components/Venue'
import Guestbook from './components/Guestbook'
import GiftBox from './components/GiftBox'
import Footer from './components/Footer'

export default function App() {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Envelope opened={opened} onOpen={() => setOpened(true)} />
      <Petals active={opened} />
      <MusicButton autoPlaySignal={opened} />

      <div className="mx-auto min-h-screen w-full max-w-[480px] overflow-hidden bg-cream shadow-[0_0_40px_rgba(0,0,0,0.18)] md:my-6 md:min-h-0 md:rounded-2xl md:border md:border-wine/15">
        <Hero opened={opened} />
        <Families />
        <Announcement />
        <Album />
        <Party />
        <Venue />
        <Guestbook />
        <GiftBox />
        <Footer />
      </div>
    </>
  )
}
