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
assets/vendor/      Three.js r185 (three.module.min.js, three.core.min.js, addons/ postprocessing)
```

## สถานะ
- [x] หน้าแรก, แผนการสอน
- [ ] สไลด์ (ตั้ง `window.SLIDES_READY = true` ใน data.js เมื่อเพิ่มภาพ `slides/chXX/p-NN.jpg` แล้ว)
- [ ] คำบรรยายรายวิชา
- [ ] แบบฝึกหัด
