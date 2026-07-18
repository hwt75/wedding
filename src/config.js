/* ============================================================
   CHỈNH TOÀN BỘ THÔNG TIN THIỆP CƯỚI TẠI FILE NÀY
   Các chỗ ghi '--:--' hoặc '' là CHƯA CÓ thông tin - cần điền!
   ============================================================ */

export const CONFIG = {
  groom: {
    name: 'Nguyễn Minh Tuấn Tú',
    shortName: 'Tuấn Tú',
    role: 'Chú rể',
    father: 'Nguyễn Ngọc Quý',
    mother: 'Phùng Thị Sen',
    address: '', // TODO: địa chỉ nhà trai (chưa có trên thiệp in)
    bank: { bankName: '', account: '', holder: 'Nguyễn Minh Tuấn Tú', qrImage: '' }, // TODO: STK chú rể
  },
  bride: {
    name: 'Bùi Hương Giang',
    shortName: 'Hương Giang',
    role: 'Cô dâu',
    father: 'Bùi Văn Thắng',
    mother: 'Phạm Thị Hoa',
    address: 'SN 1178 Đường Trần Nhân Tông, Thôn Cộng Hòa, Xã Kiến Xương, Tỉnh Hưng Yên',
    bank: { bankName: '', account: '', holder: 'Bùi Hương Giang', qrImage: '' }, // TODO: STK cô dâu
  },

  // Lễ Vu Quy
  ceremony: {
    eventName: 'Lễ Vu Quy',
    place: 'Tư gia nhà gái',
    time: '--:--', // TODO: giờ làm lễ (thiệp in đang để trống)
    dayOfWeek: 'Chủ Nhật',
    day: 2,
    month: 8,
    year: 2026,
    lunarNote: '(Tức ngày 20 tháng 6 năm Bính Ngọ)',
  },

  // Bữa cơm thân mật - dùng cho đếm ngược, lịch, RSVP
  party: {
    title: 'Bữa cơm thân mật sẽ diễn ra vào lúc',
    time: '--:--', // TODO: giờ khai tiệc
    welcomeTime: '--:--', // TODO: giờ đón khách
    dayOfWeek: 'Chủ Nhật',
    date: new Date('2026-08-02T10:00:00+07:00'), // TODO: sửa lại giờ khi đã chốt
    lunarNote: '(Tức ngày 20 tháng 6 năm Bính Ngọ)',
    venueName: 'Tư gia nhà gái',
    venueAddress: 'SN 1178 Đường Trần Nhân Tông, Thôn Cộng Hòa, Xã Kiến Xương, Tỉnh Hưng Yên',
  },

  // Lịch trình ngày cưới - để trống thì section tự ẩn; điền khi đã chốt giờ
  // Ví dụ: { time: '09:00', label: 'Đón khách' },
  schedule: [],

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

  // Link "Thêm vào lịch" Google Calendar (giờ UTC; 10:00 VN = 03:00 UTC)
  calendarEvent: {
    title: 'Lễ Vu Quy Tuấn Tú & Hương Giang',
    details: 'Trân trọng kính mời bạn tới dự bữa cơm thân mật cùng gia đình mừng hạnh phúc Tuấn Tú & Hương Giang',
    startUTC: '20260802T030000Z',
    endUTC: '20260802T070000Z',
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
    `SN 1178 Đường Trần Nhân Tông, Thôn Cộng Hòa, Xã Kiến Xương, Hưng Yên`
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
