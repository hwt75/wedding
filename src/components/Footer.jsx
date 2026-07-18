import { CONFIG } from '../config'

export default function Footer() {
  return (
    <footer className="bg-wine px-8 pb-9 pt-11 text-center text-white">
      <p className="font-serif2 text-[15px] italic leading-loose opacity-95">
        Sự hiện diện của quý khách
        <br />
        là niềm vinh hạnh của gia đình chúng tôi!
      </p>
      <div className="mt-3 text-xl text-gold">♡</div>
      <div className="mt-1 font-script text-[30px]">
        {CONFIG.groom.shortName} &amp; {CONFIG.bride.shortName}
      </div>
    </footer>
  )
}
