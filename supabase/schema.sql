-- ============================================================
-- Chạy file này trong Supabase Dashboard > SQL Editor
-- ============================================================

-- Sổ lưu bút
create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

-- Xác nhận tham dự
create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  attending boolean not null default true,
  guests int not null default 0 check (guests between 0 and 20),
  note text check (char_length(note) <= 300),
  created_at timestamptz not null default now()
);

-- Bật Row Level Security
alter table public.guestbook enable row level security;
alter table public.rsvp enable row level security;

-- Khách (anon) được đọc + gửi lời chúc
create policy "guestbook_select" on public.guestbook for select to anon using (true);
create policy "guestbook_insert" on public.guestbook for insert to anon with check (true);

-- Khách (anon) chỉ được gửi RSVP, không đọc được danh sách
create policy "rsvp_insert" on public.rsvp for insert to anon with check (true);

-- Bật realtime cho sổ lưu bút (lời chúc mới hiện ngay cho mọi khách)
alter publication supabase_realtime add table public.guestbook;
