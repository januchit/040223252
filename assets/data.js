// ข้อมูลรายวิชา — แก้ไขไฟล์นี้ไฟล์เดียวเมื่อต้องการเพิ่ม/เปลี่ยนเนื้อหา
// ที่มา: แผนการสอน 040223252 TC.pdf และ OBE3 - 040223252_2_69.pdf
window.COURSE = {
  code: "040223252",
  term: "2/2569",
  nameTh: "ทฤษฎีการคำนวณ",
  nameEn: "Theory of Computation",
  credits: "3(3-0-6)",
  creditsNote: "บรรยาย 3 · ปฏิบัติ 0 · ศึกษาด้วยตนเอง 6 ชม./สัปดาห์",
  prereq: "040213101",
  prereqName: "คณิตศาสตร์ดิสครีตและการประยุกต์",
  year: "ชั้นปีที่ 3",
  program: "หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์เชิงวิทยาการคอมพิวเตอร์",
  dept: "ภาควิชาคณิตศาสตร์",
  faculty: "คณะวิทยาศาสตร์ประยุกต์",
  uni: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",

  objectives: [
    "เพื่อให้เข้าใจในทฤษฎีพื้นฐานของออโตมาตาชนิดต่าง ๆ",
    "เพื่อศึกษาภาษารูปนัยและลำดับชั้นของภาษา",
    "เพื่อศึกษาไวยากรณ์สำหรับภาษาในลำดับชั้นต่าง ๆ",
    "เพื่อศึกษาคุณสมบัติปิดของภาษาในลำดับชั้นต่าง ๆ",
    "เพื่อให้สามารถประยุกต์ใช้งานทฤษฎีการคำนวณในการแก้ปัญหาทางคณิตศาสตร์"
  ],

  descTh: "เครื่องจักรและภาษารูปนัย ออโตมาตาจำกัด ภาษาสม่ำเสมอ นิพจน์สม่ำเสมอ ไวยากรณ์สม่ำเสมอ ออโตมาตากดลง ไวยากรณ์ไม่พึ่งบริบท ภาษาไม่พึ่งบริบท เครื่องจักรทัวริง ภาษาแจงนับได้แบบเวียนซ้ำ ความซับซ้อนของการคำนวณ",
  descEn: "Machine and formal language; finite automata; regular language; regular expression; regular grammar; pushdown automata; context-free grammar; context-free language; turing machine; recursively enumerable language; complexity of computation.",

  // ผลลัพธ์การเรียนรู้ของรายวิชา (CLOs) จาก OBE3 หมวดที่ 2 ข้อ 4
  clos: [
    { id: "CLO 1", text: "อธิบายแนวคิดพื้นฐานของภาษารูปนัย ไวยากรณ์ และเครื่องจักร และใช้เครื่องมือทางคณิตศาสตร์ (เซต ความสัมพันธ์ ฟังก์ชัน การนิยามแบบเวียนเกิด) และวิธีการพิสูจน์ รวมถึงอุปนัยเชิงคณิตศาสตร์ ในการให้เหตุผลเกี่ยวกับภาษาได้", weeks: "สัปดาห์ 1–4" },
    { id: "CLO 2", text: "ออกแบบออโตมาตาจำกัดแบบเชิงกำหนด (DFA) และไม่เชิงกำหนด (NFA) และแปลงระหว่างออโตมาตาจำกัดกับนิพจน์สม่ำเสมอ เพื่อรู้จำภาษาสม่ำเสมอได้", weeks: "สัปดาห์ 5–6" },
    { id: "CLO 3", text: "วิเคราะห์คุณสมบัติปิดของภาษาสม่ำเสมอ และพิสูจน์ว่าภาษาใดไม่เป็นภาษาสม่ำเสมอโดยใช้บทตั้งการปั๊ม (Pumping Lemma) ได้", weeks: "สัปดาห์ 7–8" },
    { id: "CLO 4", text: "สร้างไวยากรณ์ไม่พึ่งบริบทและออโตมาตากดลงสำหรับภาษาไม่พึ่งบริบท และวิเคราะห์คุณสมบัติปิดของภาษาไม่พึ่งบริบทได้", weeks: "สัปดาห์ 9–11" },
    { id: "CLO 5", text: "ออกแบบเครื่องจักรทัวริง อธิบายภาษาแจงนับได้แบบเวียนซ้ำ ลำดับชั้นของภาษา และแนวคิดเบื้องต้นของความซับซ้อนของการคำนวณได้", weeks: "สัปดาห์ 12–13" },
    { id: "CLO 6", text: "ประยุกต์ใช้ทฤษฎีการคำนวณในการวิเคราะห์และแก้ปัญหาทางคณิตศาสตร์ได้", weeks: "สัปดาห์ 14–15" }
  ],

  textbooks: [
    "Martin, J. C. <i>Introduction to Languages and the Theory of Computation</i>. 4th ed. (International Edition). New York: McGraw-Hill, 2011."
  ],
  notes: [
    "หนังสือทฤษฎีการคำนวณ ทั้งภาษาไทยและภาษาอังกฤษ ไม่กำหนดชื่อผู้แต่ง",
    "นักศึกษาสามารถใช้ตำราหรือหนังสือทฤษฎีการคำนวณอื่น ๆ ทั้งภาษาไทยและภาษาอังกฤษซึ่งมีเนื้อหาตรงตามที่กำหนด"
  ],

  // ch = รหัสบทของสไลด์ที่เกี่ยวข้อง (ตรงกับ SLIDES ด้านล่าง), quiz = มีทดสอบย่อยในสัปดาห์นั้น
  weeks: [
    { w: 1,  title: "Introduction to Languages, Grammars and Machines", th: "แนวคิดของภาษารูปนัย ไวยากรณ์ และเครื่องจักร ภาพรวมของทฤษฎีการคำนวณ", clo: 1, ch: ["00", "01"] },
    { w: 2,  title: "Mathematical Tools and Techniques (Relations, Functions and Recursive)", th: "เซต ความสัมพันธ์ ฟังก์ชัน และการนิยามแบบเวียนเกิด", clo: 1, ch: [] },
    { w: 3,  title: "Methods of Proof & Mathematical Induction", th: "วิธีการพิสูจน์ การพิสูจน์โดยอุปนัยเชิงคณิตศาสตร์ และอุปนัยเชิงโครงสร้าง", clo: 1, ch: [] },
    { w: 4,  title: "Language, Recursively defining Languages", th: "สตริงและภาษา การดำเนินการบนภาษา การนิยามภาษาแบบเวียนเกิด", clo: 1, ch: ["02"] },
    { w: 5,  title: "Finite automata (DFA and NFA)", th: "ออโตมาตาจำกัดแบบเชิงกำหนดและไม่เชิงกำหนด การแปลง NFA เป็น DFA", clo: 2, ch: ["02", "03"] },
    { w: 6,  title: "Regular Expressions and Regular languages", th: "นิพจน์สม่ำเสมอ ภาษาสม่ำเสมอ ไวยากรณ์สม่ำเสมอ และความสมมูลกับออโตมาตาจำกัด", clo: 2, ch: ["04", "05"] },
    { w: 7,  title: "Properties of Regular Languages", th: "คุณสมบัติปิดของภาษาสม่ำเสมอ ปัญหาการตัดสินเกี่ยวกับภาษาสม่ำเสมอ", clo: 3, ch: ["06"], quiz: "ทดสอบย่อย 1" },
    { w: 8,  title: "Pumping Lemma for Regular Languages", th: "บทตั้งการปั๊มและการพิสูจน์ว่าภาษาไม่เป็นภาษาสม่ำเสมอ", clo: 3, ch: ["06", "07"] },
    { exam: "สอบกลางภาค", note: "ตามกำหนดการของมหาวิทยาลัย (หลังสัปดาห์ที่ 8)" },
    { w: 9,  title: "Pushdown Automata", th: "ออโตมาตากดลงแบบเชิงกำหนดและไม่เชิงกำหนด", clo: 4, ch: ["09"] },
    { w: 10, title: "Context-Free Grammars and Context-Free Languages", th: "ไวยากรณ์ไม่พึ่งบริบท ต้นไม้การแจกแจง ความกำกวม ความสัมพันธ์กับออโตมาตากดลง", clo: 4, ch: ["08"] },
    { w: 11, title: "Properties of Context-Free Languages", th: "คุณสมบัติปิดของภาษาไม่พึ่งบริบท บทตั้งการปั๊มสำหรับภาษาไม่พึ่งบริบท", clo: 4, ch: ["10"] },
    { w: 12, title: "Turing Machines", th: "เครื่องจักรทัวริง การออกแบบเครื่องจักรทัวริง และเครื่องจักรทัวริงแบบต่าง ๆ", clo: 5, ch: ["11"] },
    { w: 13, title: "Recursively Enumerable Languages", th: "ภาษาแจงนับได้แบบเวียนซ้ำ ลำดับชั้นของภาษา (Chomsky hierarchy) และความซับซ้อนของการคำนวณเบื้องต้น", clo: 5, ch: ["11"], quiz: "ทดสอบย่อย 2" },
    { w: 14, title: "Applications of theory of computation to Mathematical Problems (1)", th: "การประยุกต์ทฤษฎีการคำนวณในการแก้ปัญหาทางคณิตศาสตร์", clo: 6, ch: [] },
    { w: 15, title: "Applications of theory of computation to Mathematical Problems (2)", th: "การประยุกต์ทฤษฎีการคำนวณในการแก้ปัญหาทางคณิตศาสตร์ (ต่อ) และทบทวนรายวิชา", clo: 6, ch: [] },
    { exam: "สอบปลายภาค", note: "ตามกำหนดการของมหาวิทยาลัย (หลังสัปดาห์ที่ 15)" }
  ],

  // แผนการประเมิน (OBE3 หมวดที่ 4 ข้อ 2) — รวม 100%
  grading: [
    { label: "สอบกลางภาค", pct: 40, when: "หลังสัปดาห์ที่ 8", clo: "CLO 1, 2, 3" },
    { label: "สอบปลายภาค", pct: 40, when: "หลังสัปดาห์ที่ 15", clo: "CLO 4, 5, 6" },
    { label: "ทดสอบย่อย ครั้งที่ 1", pct: 5, when: "สัปดาห์ที่ 7", clo: "CLO 1, 2, 3" },
    { label: "ทดสอบย่อย ครั้งที่ 2", pct: 5, when: "สัปดาห์ที่ 13", clo: "CLO 4, 5" },
    { label: "การบ้าน แบบฝึกหัด และการเข้าชั้นเรียน", pct: 10, when: "ตลอดภาคการศึกษา", clo: "CLO 1–6" }
  ],
  gradingNote: "ตัดเกรดแบบอิงกลุ่มและอิงเกณฑ์ โดยพิจารณาจากค่าเฉลี่ย (x̄) และส่วนเบี่ยงเบนมาตรฐาน (S.D.)",
  gradingSub: "คะแนนระหว่างเรียน 20% = ทดสอบย่อย 2 ครั้ง (10%) + การบ้าน แบบฝึกหัด และการเข้าเรียน (10%)",

  instructors: [
    {
      name: "รศ. ดร.อนุชิต จิตพัฒนกุล",
      role: "อาจารย์ผู้รับผิดชอบรายวิชาและอาจารย์ผู้สอน",
      sections: [
        { sec: "1", time: "พฤหัสบดี 09.00 – 12.00 น.", room: "78-1006" },
        { sec: "2", time: "พฤหัสบดี 13.00 – 16.00 น.", room: "78-1006" }
      ],
      office: ["พุธ 13.00 – 16.00 น.", "ศุกร์ 09.00 – 12.00 น."],
      officeRoom: "78-1003"
    }
  ]
};

// สไลด์: PDF อยู่ที่ slides/chXX.pdf, ภาพแต่ละหน้า slides/chXX/p-NN.jpg (กว้าง 1440px), ภาพปก slides/chXX/thumb.jpg
window.SLIDES_READY = true;
window.SLIDES = [
  { id: "00", title: "แนะนำรายวิชา", en: "Course Introduction", pages: 22, weeks: "สัปดาห์ 1" },
  { id: "01", title: "ภาษา ไวยากรณ์ และเครื่องจักร", en: "Languages, Grammars & Machines", pages: 37, weeks: "สัปดาห์ 1" },
  { id: "02", title: "ภาษาและออโตมาตาจำกัด", en: "Languages & Finite Automata", pages: 67, weeks: "สัปดาห์ 4–5" },
  { id: "03", title: "ออโตมาตาจำกัดแบบไม่เชิงกำหนด (NFA)", en: "Nondeterministic Finite Automata", pages: 57, weeks: "สัปดาห์ 5" },
  { id: "04", title: "นิพจน์สม่ำเสมอ", en: "Regular Expressions", pages: 47, weeks: "สัปดาห์ 6" },
  { id: "05", title: "ไวยากรณ์สม่ำเสมอ", en: "Regular Grammars", pages: 47, weeks: "สัปดาห์ 6" },
  { id: "06", title: "คุณสมบัติของภาษาสม่ำเสมอ และบทตั้งการปั๊ม", en: "Properties of Regular Languages & Pumping Lemma", pages: 35, weeks: "สัปดาห์ 7–8" },
  { id: "07", title: "ตัวอย่างการใช้บทตั้งการปั๊ม", en: "Applying the Pumping Lemma", pages: 26, weeks: "สัปดาห์ 8" },
  { id: "08", title: "ภาษาไม่พึ่งบริบท", en: "Context-Free Languages", pages: 39, weeks: "สัปดาห์ 10" },
  { id: "09", title: "ออโตมาตากดลง (PDA)", en: "Pushdown Automata", pages: 60, weeks: "สัปดาห์ 9" },
  { id: "10", title: "DPDA และคุณสมบัติของภาษาไม่พึ่งบริบท", en: "DPDA & Properties of CFLs", pages: 28, weeks: "สัปดาห์ 11" },
  { id: "11", title: "เครื่องจักรทัวริง", en: "Turing Machines", pages: 51, weeks: "สัปดาห์ 12–13" }
];

// เอกสารประกอบการสอน (คำบรรยาย): PDF อยู่ที่ lectures/chXX.pdf, ภาพแต่ละหน้า lectures/chXX/p-NN.jpg (A4 กว้าง 1241px), ภาพปก lectures/chXX/thumb.jpg
// ชื่อบทและสัปดาห์ใช้ร่วมกับ SLIDES (id เดียวกัน)
window.LECTURES = [
  { id: "01", pages: 20 }, { id: "02", pages: 18 }, { id: "03", pages: 15 }, { id: "04", pages: 14 },
  { id: "05", pages: 11 }, { id: "06", pages: 10 }, { id: "07", pages: 9 }, { id: "08", pages: 13 },
  { id: "09", pages: 12 }, { id: "10", pages: 12 }, { id: "11", pages: 12 }
];
