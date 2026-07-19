/*
  Lưu LỜI CHÚC + XÁC NHẬN THAM DỰ vào Google Sheet
  (thông qua Google Apps Script Web App - xem thư mục google-sheet/).

  Cấu hình: tạo file .env, thêm dòng
    VITE_SHEET_URL=https://script.google.com/macros/s/.../exec

  Khi CHƯA cấu hình -> app tự lưu localStorage để bạn xem thử được đầy đủ.
*/

const SHEET_URL = import.meta.env.VITE_SHEET_URL
export const hasSheet = Boolean(SHEET_URL)

/* Gửi dữ liệu lên Sheet.
   Dùng Content-Type text/plain để tránh CORS preflight của Apps Script. */
async function postToSheet(payload) {
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
  } catch {
    // fallback: vẫn gửi được kể cả khi trình duyệt chặn đọc response
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
  }
}

/* ---------- Sổ lưu bút ---------- */
export async function fetchWishes() {
  if (SHEET_URL) {
    const res = await fetch(`${SHEET_URL}?action=wishes`)
    return await res.json() // [{ name, message, created_at }] - mới nhất trước
  }
  return JSON.parse(localStorage.getItem('guestbook') || '[]').reverse()
}

export async function addWish(name, message) {
  const item = { id: Date.now(), name, message, created_at: new Date().toISOString() }
  if (SHEET_URL) {
    await postToSheet({ type: 'wish', name, message })
    return item
  }
  const list = JSON.parse(localStorage.getItem('guestbook') || '[]')
  list.push(item)
  localStorage.setItem('guestbook', JSON.stringify(list))
  return item
}

/* ---------- Xác nhận tham dự ---------- */
export async function addRsvp({ name, attending, guests, note }) {
  if (SHEET_URL) {
    await postToSheet({ type: 'rsvp', name, attending, guests, note })
    return
  }
  const list = JSON.parse(localStorage.getItem('rsvp') || '[]')
  list.push({ name, attending, guests, note, created_at: new Date().toISOString() })
  localStorage.setItem('rsvp', JSON.stringify(list))
}
