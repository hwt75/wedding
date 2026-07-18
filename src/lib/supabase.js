import { createClient } from '@supabase/supabase-js'

/*
  Kết nối Supabase - tạo file .env từ .env.example rồi điền:
    VITE_SUPABASE_URL=https://xxxx.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJ...
  Chạy supabase/schema.sql trong SQL Editor của Supabase để tạo bảng.

  Khi CHƯA cấu hình Supabase, app tự chuyển sang lưu localStorage
  để bạn vẫn xem thử được đầy đủ chức năng.
*/

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null
export const hasSupabase = Boolean(supabase)

/* ---------- Sổ lưu bút ---------- */
export async function fetchWishes() {
  if (supabase) {
    const { data, error } = await supabase
      .from('guestbook')
      .select('id,name,message,created_at')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) throw error
    return data
  }
  return JSON.parse(localStorage.getItem('guestbook') || '[]').reverse()
}

export async function addWish(name, message) {
  if (supabase) {
    const { data, error } = await supabase
      .from('guestbook')
      .insert({ name, message })
      .select()
      .single()
    if (error) throw error
    return data
  }
  const list = JSON.parse(localStorage.getItem('guestbook') || '[]')
  const item = { id: Date.now(), name, message, created_at: new Date().toISOString() }
  list.push(item)
  localStorage.setItem('guestbook', JSON.stringify(list))
  return item
}

export function subscribeWishes(onInsert) {
  if (!supabase) return () => {}
  const channel = supabase
    .channel('guestbook-inserts')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'guestbook' },
      (payload) => onInsert(payload.new)
    )
    .subscribe()
  return () => supabase.removeChannel(channel)
}

/* ---------- Xác nhận tham dự ---------- */
export async function addRsvp({ name, attending, guests, note }) {
  if (supabase) {
    const { error } = await supabase
      .from('rsvp')
      .insert({ name, attending, guests, note })
    if (error) throw error
    return
  }
  const list = JSON.parse(localStorage.getItem('rsvp') || '[]')
  list.push({ name, attending, guests, note, created_at: new Date().toISOString() })
  localStorage.setItem('rsvp', JSON.stringify(list))
}
