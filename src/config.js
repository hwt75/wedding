/* ============================================================
   CHỈNH TOÀN BỘ THÔNG TIN THIỆP CƯỚI TẠI FILE NÀY
   ============================================================ */

export const CONFIG = {
  groom: {
    name: 'Vũ Đức Anh',
    shortName: 'Đức Anh',
    role: 'Út nam',
    father: 'Vũ Văn Hiệp',
    mother: 'Nguyễn Thị Ánh',
    address: 'Số 9, Ngõ 102 Trường Chinh, Đống Đa, Hà Nội',
    bank: { bankName: 'Vietcombank', account: '973052952', holder: 'Vũ Đức Anh', qrImage: '' },
  },
  bride: {
    name: 'Đỗ Thị Thanh Mai',
    shortName: 'Thanh Mai',
    role: 'Thứ nữ',
    father: 'Đỗ Văn Tuyên',
    mother: 'Lê Thị Vân',
    address: 'Số 32, Phố Đội Cấn, Ba Đình, Hà Nội',
    bank: { bankName: 'VietinBank', account: '7572658432', holder: 'Đỗ Thị Thanh Mai', qrImage: '' },
  },

  // Lễ thành hôn (buổi sáng)
  ceremony: {
    place: 'Tư gia',
    time: '09:00',
    dayOfWeek: 'Chủ Nhật',
    day: 10,
    month: 5,
    year: 2026,
    lunarNote: '(Tức ngày 24 tháng 3 năm Bính Ngọ)',
  },

  // Tiệc cưới (buổi tối) - dùng cho đếm ngược, lịch, RSVP
  party: {
    time: '18:00',
    welcomeTime: '17:00',
    dayOfWeek: 'Chủ Nhật',
    date: new Date('2026-05-10T18:00:00+07:00'),
    lunarNote: '(Tức ngày 24 tháng 3 năm Bính Ngọ)',
    venueName: 'Queen Bee Luxury',
    venueAddress: '20 P. Láng Hạ, Láng Hạ, Đống Đa, Hà Nội',
  },

  // Lịch trình ngày cưới
  schedule: [
    { time: '17:30', label: 'Đón khách' },
    { time: '18:30', label: 'Khai tiệc' },
    { time: '18:45', label: 'Rót rượu, cắt bánh' },
    { time: '19:00', label: 'Phục vụ món chính' },
    { time: '21:00', label: 'Kết thúc tiệc' },
  ],

  // Album ảnh cưới - ảnh đặt trong thư mục public/photos/
  photos: [
    '/photos/TAW07417.jpg',
    '/photos/TAW07431.jpg',
    '/photos/TAW07467.jpg',
    '/photos/TAW07620.jpg',
    '/photos/TAW07703.jpg',
    '/photos/TAW07737.jpg',
    '/photos/TAW07803.jpg',
    '/photos/TAW07865.jpg',
    '/photos/TAW07918.jpg',
    '/photos/TAW08160.jpg',
    '/photos/TAW08337.jpg',
    '/photos/TAW08421.jpg',
    '/photos/TAW08437.jpg',
    '/photos/TAW08447.jpg',
    '/photos/TAW08514.jpg',
    '/photos/TAW08555.jpg',
    '/photos/TAW08690.jpg',
    '/photos/TAW08762.jpg',
    '/photos/TAW08775.jpg',
  ],
  albumPreview: 4, // số ô ảnh hiển thị, ô cuối gộp "+N"

  // Nhạc nền - đặt file vào public/, ví dụ '/nhac-nen.mp3'
  musicSrc: '',

  // Link "Thêm vào lịch" Google Calendar (giờ UTC)
  calendarEvent: {
    title: 'Tiệc cưới Đức Anh & Thanh Mai',
    details: 'Trân trọng kính mời bạn tới dự tiệc cưới của Đức Anh & Thanh Mai',
    startUTC: '20260510T110000Z',
    endUTC: '20260510T140000Z',
  },
}

export const googleCalendarUrl = () => {
  const ev = CONFIG.calendarEvent
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${ev.startUTC}/${ev.endUTC}`,
    location: `${CONFIG.party.venueName}, ${CONFIG.party.venueAddress}`,
    details: ev.details,
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

export const googleMapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${CONFIG.party.venueName}, ${CONFIG.party.venueAddress}`
  )}`

/* Ảnh placeholder khi chưa có ảnh thật */
export function placeholderPhoto(i) {
  const hues = [
    [124, 21, 26],
    [212, 175, 55],
    [158, 60, 66],
    [184, 120, 52],
  ]
  const [r, g, b] = hues[i % hues.length]
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='rgb(${r},${g},${b})' stop-opacity='.22'/><stop offset='1' stop-color='rgb(${r},${g},${b})' stop-opacity='.55'/></linearGradient></defs><rect width='600' height='800' fill='%23fffaf7'/><rect width='600' height='800' fill='url(%23g)'/><text x='300' y='390' text-anchor='middle' font-family='Georgia' font-size='44' fill='rgba(124,21,26,.85)'>♡</text><text x='300' y='442' text-anchor='middle' font-family='Georgia' font-size='24' fill='rgba(124,21,26,.7)'>Ảnh cưới ${i + 1}</text></svg>`
  return `data:image/svg+xml;utf8,${svg}`
}

export const photoSrcs = CONFIG.photos.map((p, i) => p || placeholderPhoto(i))
