// ตั้งค่าหน้าเช็คชื่อ (checkin.html) — ให้ตรงกับ CONFIG ใน Apps Script (attendance.gs)
// day: 0=อาทิตย์ 1=จันทร์ ... 4=พฤหัสบดี ; formUrl: ลิงก์ฟอร์ม (viewform) ของแต่ละตอนเรียน
window.CHECKIN = {
  timeZone: "Asia/Bangkok",
  sections: [
    { sec: 1, day: 4, start: "09:00", end: "12:00", room: "78-1006", formUrl: "" },
    { sec: 2, day: 4, start: "13:00", end: "16:00", room: "78-1006", formUrl: "" }
  ],
  termStart: "",   // "YYYY-MM-DD" หรือ "" ถ้าไม่จำกัด
  termEnd: "",
  skipDates: []    // วันพฤหัสบดีที่งดสอน เช่น ["2027-01-14"]
};
