// ตั้งค่าหน้าเช็คชื่อ (checkin.html) — ให้ตรงกับ CONFIG ใน Apps Script (attendance.gs)
// day: 0=อาทิตย์ 1=จันทร์ ... 4=พฤหัสบดี ; formUrl: ลิงก์ฟอร์ม (viewform) ของแต่ละตอนเรียน
window.CHECKIN = {
  timeZone: "Asia/Bangkok",
  sections: [
    { sec: 1, day: 4, start: "09:00", end: "12:00", room: "78-1006", formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdXyn68j_uV67c0YWdQAEovlksSAZHnI9Y7vv10vskgnpo9kg/viewform" },
    { sec: 2, day: 4, start: "13:00", end: "16:00", room: "78-1006", formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeQcqUecPG4i7YdL9_6Bf7Ht_b7DMqVLvbNwxiXAsCCM0E7mg/viewform" }
  ],
  termStart: "2026-11-23",   // "YYYY-MM-DD" หรือ "" ถ้าไม่จำกัด
  termEnd: "2027-03-14",
  skipDates: []    // วันพฤหัสบดีที่งดสอน เช่น ["2027-01-14"]
};
