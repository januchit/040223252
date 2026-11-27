// ตั้งค่าหน้าเช็คชื่อ (checkin.html) — ให้ตรงกับ CONFIG ใน Apps Script (attendance.gs)
// day: 0=อาทิตย์ 1=จันทร์ ... 4=พฤหัสบดี
// apiUrl: Web app URL ของ Apps Script (ลงท้าย /exec) — หน้าเว็บขอลิงก์ QR ประจำคาบจากที่นี่ ได้เฉพาะในช่วงเวลาเรียน
window.CHECKIN = {
  courseCode: "040223252",
  courseName: "ทฤษฎีการคำนวณ",
  courseNameEn: "Theory of Computation",
  timeZone: "Asia/Bangkok",
  apiUrl: "https://script.google.com/macros/s/AKfycbzcguo7oLa1D7sUFHnnq-WGLqEYmqDepWlVbpQNSoW0DC592lwb6jzz0VepAJAkaFd0/exec",
  sections: [
    { sec: 1, day: 4, start: "09:00", end: "12:00", room: "78-1006" },
    { sec: 2, day: 4, start: "13:00", end: "16:00", room: "78-1006" }
  ],
  termStart: "2026-11-23",   // "YYYY-MM-DD" หรือ "" ถ้าไม่จำกัด
  termEnd: "2027-03-14",
  skipDates: []    // วันพฤหัสบดีที่งดสอน เช่น ["2027-01-14"]
};
