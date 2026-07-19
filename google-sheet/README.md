# Lưu lời chúc & xác nhận tham dự vào Google Sheet

Backend miễn phí cho thiệp cưới, không cần server riêng.

## Các bước

1. Mở [sheets.new](https://sheets.new) tạo một Google Sheet mới (đặt tên tuỳ ý, ví dụ "Thiệp cưới - Dữ liệu").
2. Menu **Extensions → Apps Script**.
3. Xoá hết code mẫu, dán toàn bộ nội dung [`Code.gs`](./Code.gs), bấm **Save** (💾).
4. Bấm **Deploy → New deployment**.
   - Bánh răng ⚙ bên cạnh "Select type" → chọn **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Bấm **Deploy**, rồi **Authorize access** và đăng nhập cấp quyền (chọn "Advanced → Go to … (unsafe)" nếu Google cảnh báo — đây là script của chính bạn nên an toàn).
5. Copy **Web app URL** (kết thúc bằng `/exec`).
6. Ở thư mục gốc dự án, tạo file `.env` (copy từ `.env.example`) và điền:
   ```
   VITE_SHEET_URL=https://script.google.com/macros/s/xxxxx/exec
   ```
7. Khi deploy lên Vercel: thêm biến `VITE_SHEET_URL` trong **Settings → Environment Variables** với đúng giá trị trên.

## Kết quả

- Hai tab tự tạo trong Sheet khi có dữ liệu:
  - **LoiChuc** — Thời gian | Tên | Lời chúc
  - **ThamDu** — Thời gian | Tên | Tham dự | Số người đi cùng | Lời nhắn
- Lời chúc khách gửi sẽ hiện trên thiệp cho mọi người (tự làm mới mỗi 30 giây).

## Sửa/deploy lại

Mỗi lần sửa `Code.gs`, phải **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy** thì thay đổi mới có hiệu lực (URL giữ nguyên).
