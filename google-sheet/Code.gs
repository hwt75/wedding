/* ============================================================
   Google Apps Script - backend lưu lời chúc & xác nhận tham dự
   vào Google Sheet cho thiệp cưới.

   CÁCH DÙNG:
   1. Tạo 1 Google Sheet mới (sheets.new).
   2. Trong Sheet: Extensions > Apps Script.
   3. Xoá code mẫu, dán TOÀN BỘ file này vào, bấm Save.
   4. Deploy > New deployment > chọn type "Web app".
        - Execute as: Me
        - Who has access: Anyone
   5. Bấm Deploy, cấp quyền cho tài khoản của bạn.
   6. Copy "Web app URL" (dạng .../exec) -> dán vào .env:
        VITE_SHEET_URL=<url vừa copy>
   Hai tab "LoiChuc" và "ThamDu" sẽ tự tạo khi có dữ liệu đầu tiên.
   ============================================================ */

function sheetOf(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sh = ss.getSheetByName(name)
  if (!sh) {
    sh = ss.insertSheet(name)
    sh.appendRow(headers)
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold')
  }
  return sh
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}

/* Trả về danh sách lời chúc để hiển thị trên thiệp */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'wishes'
  if (action === 'wishes') {
    const sh = sheetOf('LoiChuc', ['Thời gian', 'Tên', 'Lời chúc'])
    const rows = sh.getDataRange().getValues()
    rows.shift() // bỏ dòng tiêu đề
    const wishes = rows
      .filter((r) => r[1])
      .map((r) => ({ created_at: r[0], name: r[1], message: r[2] }))
      .reverse() // mới nhất lên đầu
    return json(wishes)
  }
  return json([])
}

/* Nhận lời chúc / xác nhận tham dự và ghi vào Sheet */
function doPost(e) {
  const data = JSON.parse(e.postData.contents)
  const now = new Date()

  if (data.type === 'wish') {
    const sh = sheetOf('LoiChuc', ['Thời gian', 'Tên', 'Lời chúc'])
    sh.appendRow([now, data.name, data.message])
  } else if (data.type === 'rsvp') {
    const sh = sheetOf('ThamDu', [
      'Thời gian',
      'Tên',
      'Tham dự',
      'Số người đi cùng',
      'Lời nhắn',
    ])
    sh.appendRow([
      now,
      data.name,
      data.attending ? 'Có' : 'Không',
      data.guests,
      data.note,
    ])
  }
  return json({ ok: true })
}
