# 040223252 ทฤษฎีการคำนวณ (Theory of Computation) — 2/2569

เว็บรายวิชาสำหรับนักศึกษา: หน้าแรก (ฉาก 3 มิติ) · แผนการสอน · สไลด์ · คำบรรยายรายวิชา · แบบฝึกหัด
เว็บจริง: https://januchit.github.io/040223252/

## โครงสร้าง
```
index.html          โครงหน้า + header + แท็บ + importmap ของ Three.js
assets/data.js      ข้อมูลรายวิชา + รายการสไลด์  ← แก้ไฟล์นี้เมื่อเปลี่ยนเนื้อหา
assets/style.css    ดีไซน์ (โทน น้ำเงิน-ดำ-เทา-ขาว)
assets/app.js       router + render แต่ละหน้า
assets/hero3d.js    ฉาก 3 มิติ (ES module, แก้ได้ตรง ๆ ไม่ต้อง build):
                    DFA หารด้วย 5 ลงตัว + เทปเครื่องจักรทัวริง + ลำดับชั้นของ Chomsky
slides/chXX.pdf     PDF ของแต่ละบท (ดาวน์โหลดได้จากตัวอ่านสไลด์)
slides/chXX/p-NN.jpg  ภาพแต่ละหน้า กว้าง 1440px  ·  slides/chXX/thumb.jpg ภาพปก
assets/vendor/      Three.js r185 (three.module.min.js, three.core.min.js, addons/ postprocessing)
```

## สถานะ
- [x] หน้าแรก, แผนการสอน
- [x] สไลด์ 11 บท (บทที่ 1–11) (#slides, #slides/04, #slides/04/7)

## เพิ่ม/แก้สไลด์บท
```bash
n=04; f="บทที่04_นิพจน์สม่ำเสมอ.pdf"
cp "$f" slides/ch$n.pdf; mkdir -p slides/ch$n
pdftoppm -jpeg -jpegopt quality=82 -scale-to-x 1440 -scale-to-y -1 "$f" slides/ch$n/p
pdftoppm -jpeg -jpegopt quality=80 -scale-to-x 560 -scale-to-y -1 -f 1 -l 1 -singlefile "$f" slides/ch$n/thumb
```
แล้วแก้จำนวนหน้า `pages` ใน `SLIDES` ของ `assets/data.js`
- [ ] คำบรรยายรายวิชา
- [ ] แบบฝึกหัด

## คำบรรยายรายวิชา (เอกสารประกอบการสอน)
- PDF รายบทอยู่ที่ `lectures/chXX.pdf` (บทที่ 1–11)
- ภาพแต่ละหน้า `lectures/chXX/p-NN.jpg` (A4, 150 dpi) และภาพปก `lectures/chXX/thumb.jpg`
- รายการบทและจำนวนหน้าอยู่ใน `window.LECTURES` ท้ายไฟล์ `assets/data.js` (ชื่อบทและสัปดาห์ดึงจาก `SLIDES` ที่ id ตรงกัน)
- สร้างภาพใหม่เมื่อแก้ PDF: `pdftoppm -r 150 -jpeg -jpegopt quality=82 lectures/chXX.pdf lectures/chXX/p` แล้วแก้จำนวนหน้าใน `data.js`

## หน้าเช็คชื่อ (checkin.html)
- เปิดที่ `checkin.html` (ไม่มีลิงก์จากเมนู) แสดง QR Code ของฟอร์มเช็คชื่อเฉพาะในช่วงเวลาเรียน (เวลาประเทศไทย)
- QR เปลี่ยนทุกคาบ: หน้าเว็บขอลิงก์ที่มีรหัสประจำคาบจาก Apps Script Web app (`apiUrl`) ได้เฉพาะในช่วงเวลาเรียน
- ตั้งค่าตอนเรียน apiUrl วันเปิด-ปิดภาค และวันงดสอนใน `assets/checkin-config.js` (ให้ตรงกับ Apps Script `attendance.gs`)
- QR สร้างในหน้าเว็บด้วย `assets/vendor/qrcode.js` (qrcode-generator, MIT)
