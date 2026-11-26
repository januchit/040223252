(function () {
  const C = window.COURSE, S = window.SLIDES || [], READY = !!window.SLIDES_READY;
  const LEC = (window.LECTURES || []).map((d) => Object.assign({}, (window.SLIDES || []).find((s) => s.id === d.id) || {}, d));
  const lecById = (id) => LEC.find((d) => d.id === id);
  const lecSrc = (id, p) => `lectures/ch${id}/p-${pad(p)}.jpg`;
  const app = document.getElementById("app");
  const pad = (n) => String(n).padStart(2, "0");
  const slideById = (id) => S.find((s) => s.id === id);
  const pageSrc = (id, p) => `slides/ch${id}/p-${pad(p)}.jpg`;
  const seg = (cls = "") => `<div class="seg-bar ${cls}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>`;
  const icon = {
    slides: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    left: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V4M4 4h12l-2 4 2 4H4"/></svg>'
  };

  /* ---------------- หน้าแรก ---------------- */
  function renderHome() {
    const weeks = C.weeks.filter((w) => w.w).length;
    app.innerHTML = `
      <section class="home-hero">
        <div class="hero3d" id="hero3d" aria-hidden="true"></div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="wrap hero-inner">
          <div class="hero-copy">
            <div class="hero-eyebrow"><span class="dot"></span>${C.code} · ภาคการศึกษา ${C.term}</div>
            <h1 class="hero-title">ภาษา<span class="x">×</span>เครื่องจักร<br><span class="blue">ทฤษฎีการคำนวณ</span></h1>
            <p class="hero-sub">คอมพิวเตอร์คำนวณอะไรได้ และอะไรที่คำนวณไม่ได้ — ไล่ตั้งแต่ออโตมาตาจำกัด ออโตมาตากดลง จนถึงเครื่องจักรทัวริง ตามลำดับชั้นของภาษาของ Chomsky</p>
            <div class="hero-cta">
              <a class="btn primary lg" href="#plan">ดูแผนการสอน</a>
              <a class="btn ghost lg" href="#slides">เปิดสไลด์</a>
            </div>
          </div>
        </div>
        <div class="wrap hero-stats">
          <div><b>${S.length}</b><span>บทเรียน</span></div>
          <div><b>${weeks}</b><span>สัปดาห์</span></div>
          <div><b>${C.clos.length}</b><span>ผลลัพธ์การเรียนรู้ (CLOs)</span></div>
          <div><b>DFA → TM</b><span>จากออโตมาตาสู่ทัวริง</span></div>
        </div>
        <div class="wrap code-wrap">
          <div class="code-card" aria-label="ตัวอย่างโค้ด">
              <div class="code-top"><i></i><i></i><i></i><span>dfa_mod5.py</span></div>
<pre><code><span class="c"># DFA รับเลขฐานสองที่หารด้วย 5 ลงตัว</span>
Q, q0, F = <span class="f">range</span>(<span class="n">5</span>), <span class="n">0</span>, {<span class="n">0</span>}
delta = <span class="k">lambda</span> q, a: (<span class="n">2</span>*q + <span class="f">int</span>(a)) % <span class="n">5</span>

<span class="k">def</span> <span class="f">accepts</span>(w):
    q = q0
    <span class="k">for</span> a <span class="k">in</span> w: q = delta(q, a)
    <span class="k">return</span> q <span class="k">in</span> F

accepts(<span class="s">"1010"</span>)   <span class="c"># True  (10 = 5·2)</span></code></pre>
          </div>
        </div>
      </section>

      <section class="wrap home-cards">
        <a class="hcard" href="#plan">
          <span class="hnum">01</span>
          <h3>แผนการสอน</h3>
          <p>จุดมุ่งหมาย คำอธิบายรายวิชา ผลลัพธ์การเรียนรู้ หัวข้อ 15 สัปดาห์ การวัดผล และอาจารย์ผู้สอน</p>
          <span class="go">เปิดดู →</span>
        </a>
        <a class="hcard${READY ? "" : " soon"}" href="#slides">
          <span class="hnum">02</span>
          <h3>สไลด์ประกอบการเรียน</h3>
          <p>อ่านสไลด์รายบทบนเว็บได้ทันที ทั้งบนคอมพิวเตอร์และมือถือ หรือดาวน์โหลดเป็น PDF</p>
          <span class="go">${READY ? "เปิดดู →" : "เร็ว ๆ นี้"}</span>
        </a>
        <a class="hcard${LEC.length ? "" : " soon"}" href="#lectures">
          <span class="hnum">03</span>
          <h3>เอกสารประกอบการสอน</h3>
          <p>เอกสารประกอบการสอนรายบท พร้อมนิยาม ทฤษฎีบท ตัวอย่าง และแบบฝึกหัด อ่านบนเว็บหรือดาวน์โหลดเป็น PDF</p>
          <span class="go">${LEC.length ? "เปิดดู →" : "เร็ว ๆ นี้"}</span>
        </a>
        <a class="hcard soon" href="#exercises">
          <span class="hnum">04</span>
          <h3>แบบฝึกหัด</h3>
          <p>ฝึกออกแบบ DFA, NFA, นิพจน์สม่ำเสมอ, ไวยากรณ์ และเครื่องจักรทัวริง พร้อมเฉลยแนวคิด</p>
          <span class="go">เร็ว ๆ นี้</span>
        </a>
      </section>`;

    const el = document.getElementById("hero3d");
    if (window.Hero3D) window.__heroUnmount = window.Hero3D.mount(el);
    else window.__heroPending = el;
  }

  /* ---------------- แผนการสอน ---------------- */
  function renderPlan() {
    const facts = `
      <div class="facts">
        <div class="fact"><div class="k">หน่วยกิต</div><div class="v">${C.credits}</div><div class="s">${C.creditsNote}</div></div>
        <div class="fact"><div class="k">วิชาบังคับก่อน</div><div class="v">${C.prereq}</div><div class="s">${C.prereqName}</div></div>
        <div class="fact"><div class="k">ลักษณะรายวิชา</div><div class="v">บรรยาย</div><div class="s">ประเมินผลแบบ A–F · ${C.year}</div></div>
        <div class="fact"><div class="k">ภาคการศึกษา</div><div class="v">${C.term}</div><div class="s">15 สัปดาห์ + สอบกลางภาค / ปลายภาค</div></div>
      </div>`;

    const objectives = C.objectives.map((o, i) => `<li><span class="n">${i + 1}</span><span>${o}</span></li>`).join("");
    const clos = C.clos.map((c) => `
      <div class="clo"><div class="tag">${c.id}</div><div><p>${c.text}</p><div class="wks">${c.weeks}</div></div></div>`).join("");

    const weeks = C.weeks.map((w) => {
      if (w.exam) return `<div class="exam">${w.exam}<span style="color:#9a9a9a;font-weight:400;font-size:13px">${w.note || ""}</span></div>`;
      const chips = w.ch.map((id) => {
        const s = slideById(id), n = parseInt(id, 10);
        if (!s) return "";
        return READY
          ? `<a class="chip" href="#slides/${id}" title="${s.title}">${icon.slides}บทที่ ${n}</a>`
          : `<span class="chip ch" title="สไลด์บทที่ ${n}: ${s.title}">${icon.slides}บทที่ ${n}</span>`;
      }).join("");
      const docs = w.ch.filter((id) => lecById(id)).map((id) => `<a class="chip" href="#lectures/${id}" title="เอกสารประกอบการสอนบทที่ ${parseInt(id, 10)}">${icon.doc}เอกสาร ${parseInt(id, 10)}</a>`).join("");
      const quiz = w.quiz ? `<span class="chip quiz">${icon.flag}${w.quiz}</span>` : "";
      return `
        <div class="wk">
          <div class="no">สัปดาห์<b>${w.w}</b></div>
          <div><div class="t">${w.title}</div><div class="th">${w.th}</div></div>
          <div class="links">${quiz}<span class="chip clo-chip">CLO ${w.clo}</span>${chips}${docs}</div>
        </div>`;
    }).join("");

    const shades = ["var(--blue)", "var(--blue-dark)", "var(--gray)", "var(--gray-2)", "#D6D6D6"];
    const stack = C.grading.map((g) => `<span style="flex:${g.pct}" title="${g.label} ${g.pct}%"></span>`).join("");
    const grows = C.grading.map((g, i) => `
      <tr><td><span class="sw" style="background:${shades[i]}"></span></td>
        <td>${g.label}<div class="when">${g.when} · ${g.clo}</div></td>
        <td class="p">${g.pct}%</td></tr>`).join("");
    const total = C.grading.reduce((a, g) => a + g.pct, 0);

    const people = C.instructors.map((p) => {
      const initial = p.name.replace(/^.*ดร\./, "").trim().charAt(0);
      return `
      <div class="card person">
        <div class="avatar" aria-hidden="true">${initial}</div>
        <div>
          <div class="sec">${p.role}</div>
          <div class="name">${p.name}</div>
          <div class="secs">
            ${p.sections.map((s) => `<div class="sec-box"><b>ตอนเรียนที่ ${s.sec}</b>${s.time}<br><span style="color:var(--gray)">ห้อง</span> ${s.room}</div>`).join("")}
          </div>
          <dl class="kv">
            <dt>เวลาให้คำปรึกษา</dt><dd>${p.office.join("<br>")}</dd>
            <dt>สถานที่</dt><dd>ห้อง ${p.officeRoom}</dd>
          </dl>
        </div>
      </div>`;
    }).join("");

    const head = (n, title, aside = "") => `
      <div class="section-head"><div><h2><span class="num">${pad(n)}</span>${title}</h2>${seg()}</div>${aside ? `<div class="aside">${aside}</div>` : ""}</div>`;

    app.innerHTML = `
      <div class="page">
        <section class="hero">
          <div class="eyebrow"><b>แผนการสอนวิชา ${C.code}</b> · ภาคการศึกษาที่ ${C.term}</div>
          <h1>${C.nameTh}</h1>
          <p class="en">${C.nameEn}</p>
          ${seg()}
          <div class="meta">${C.dept} ${C.faculty} ${C.uni}</div>
          ${facts}
        </section>

        <section class="section" id="objectives">
          ${head(1, "จุดมุ่งหมาย")}
          <ol class="objectives">${objectives}</ol>
        </section>

        <section class="section" id="description">
          ${head(2, "คำอธิบายรายวิชา")}
          <div class="two-col">
            <div class="card"><h3>ภาษาไทย</h3><p class="lead">${C.descTh}</p></div>
            <div class="card"><h3>ENGLISH</h3><p class="lead">${C.descEn}</p></div>
          </div>
        </section>

        <section class="section" id="clos">
          ${head(3, "ผลลัพธ์การเรียนรู้ของรายวิชา", "Course Learning Outcomes — นักศึกษาสามารถ…")}
          <div class="clos">${clos}</div>
        </section>

        <section class="section" id="schedule">
          ${head(4, "หัวข้อการสอนรายสัปดาห์", READY ? "กดที่ป้ายบทเพื่อเปิดสไลด์ของบทนั้น" : "บรรยายสัปดาห์ละ 3 ชั่วโมง รวม 45 ชั่วโมง")}
          <div class="schedule">${weeks}</div>
        </section>

        <section class="section" id="grading">
          ${head(5, "การวัดผล")}
          <div class="grading">
            <div class="card"><h3>สัดส่วนคะแนน (รวม ${total}%)</h3><div class="stack">${stack}</div>
              <table class="gtable"><tbody>${grows}</tbody></table></div>
            <div class="card grade-note"><h3>แนวทางการตัดเกรด</h3><p class="big">${C.gradingNote}</p>
              <p style="margin-top:14px;font-size:14px;color:var(--ink-2)">${C.gradingSub}</p></div>
          </div>
        </section>

        <section class="section" id="instructors">
          ${head(6, "อาจารย์ผู้สอน")}
          <div class="people one">${people}</div>
        </section>

        <section class="section" id="books">
          ${head(7, "ตำราและหนังสืออ่านประกอบ")}
          <div class="two-col">
            <div class="card"><h3>ตำราที่ใช้</h3><ol class="refs">${C.textbooks.map((t) => `<li>${t}</li>`).join("")}</ol></div>
            <div class="card"><h3>หนังสืออ่านประกอบ / หมายเหตุ</h3><ul class="refs">${C.notes.map((t) => `<li>${t}</li>`).join("")}</ul></div>
          </div>
        </section>
      </div>`;
  }

  /* ---------------- รายการสไลด์ ---------------- */
  function renderSlideList() {
    const total = S.reduce((a, s) => a + s.pages, 0);
    const cards = S.map((s) => `
      <a class="deck" href="#slides/${s.id}">
        <div class="thumb"><img src="slides/ch${s.id}/thumb.jpg" alt="หน้าปกบทที่ ${parseInt(s.id, 10)}" loading="lazy"></div>
        <div class="body">
          <div class="ch">บทที่ ${parseInt(s.id, 10)}</div>
          <div class="tt">${s.title}</div>
          <div class="en">${s.en}</div>
          <div class="foot"><span>${s.weeks}</span><span>${s.pages} หน้า</span></div>
        </div>
      </a>`).join("");
    app.innerHTML = `
      <div class="page">
        <section class="hero">
          <div class="eyebrow"><b>สไลด์ประกอบการเรียน</b> · ${C.code} · ${C.term}</div>
          <h1>สไลด์รายบท</h1>
          <p class="en">${S.length} บท · ${total} หน้า — เปิดอ่านบนเว็บได้ทันที หรือดาวน์โหลดเป็น PDF</p>
          ${seg()}
        </section>
        <div class="slide-grid">${cards}</div>
      </div>`;
  }

  /* ---------------- ตัวอ่านสไลด์ ---------------- */
  let viewer = null;
  function renderViewer(id, page) {
    const s = slideById(id);
    if (!s) return renderSlideList();
    const idx = S.indexOf(s);
    const prev = S[idx - 1], next = S[idx + 1];
    page = Math.min(Math.max(1, page || 1), s.pages);

    const strip = Array.from({ length: s.pages }, (_, i) => `
      <button type="button" data-p="${i + 1}" aria-label="หน้า ${i + 1}"><img src="${pageSrc(id, i + 1)}" alt="" loading="lazy"><span class="pn">${i + 1}</span></button>`).join("");

    app.innerHTML = `
      <div class="page viewer">
        <div class="viewer-top">
          <div>
            <a class="back" href="#slides">${icon.left} สไลด์ทั้งหมด</a>
            <div class="viewer-title"><div class="ch">บทที่ ${parseInt(id, 10)} · ${s.weeks}</div><h1>${s.title}</h1></div>
          </div>
          <div class="btns">
            <button class="btn" type="button" id="fs">${icon.full}เต็มจอ</button>
            <a class="btn primary" href="slides/ch${id}.pdf" download>${icon.dl}ดาวน์โหลด PDF</a>
          </div>
        </div>

        <div class="stage" id="stage">
          <div class="frame"><img id="slideImg" alt=""></div>
          <button class="nav-zone prev" id="zPrev" type="button" aria-label="หน้าก่อนหน้า"><span>${icon.left}</span></button>
          <button class="nav-zone next" id="zNext" type="button" aria-label="หน้าถัดไป"><span>${icon.right}</span></button>
        </div>
        <div class="progress"><i id="bar"></i></div>

        <div class="controls">
          <button class="btn" type="button" id="bPrev" aria-label="หน้าก่อนหน้า">${icon.left}</button>
          <span class="count" id="count"></span>
          <button class="btn" type="button" id="bNext" aria-label="หน้าถัดไป">${icon.right}</button>
        </div>
        <div class="strip" id="strip">${strip}</div>
        <div class="hint">ใช้ปุ่มลูกศร ← → บนคีย์บอร์ด หรือปัดซ้าย/ขวาบนมือถือเพื่อเปลี่ยนหน้า</div>

        <nav class="pager">
          ${prev ? `<a href="#slides/${prev.id}"><div class="lbl">← บทก่อนหน้า</div><div class="nm">บทที่ ${parseInt(prev.id, 10)} ${prev.title}</div></a>` : "<span></span>"}
          ${next ? `<a class="r" href="#slides/${next.id}"><div class="lbl">บทถัดไป →</div><div class="nm">บทที่ ${parseInt(next.id, 10)} ${next.title}</div></a>` : "<span></span>"}
        </nav>
      </div>`;

    viewer = { s, page };
    const img = document.getElementById("slideImg");
    const stripEl = document.getElementById("strip");

    function show(p, push = true) {
      p = Math.min(Math.max(1, p), s.pages);
      viewer.page = p;
      img.src = pageSrc(id, p);
      img.alt = `${s.title} หน้า ${p}`;
      document.getElementById("count").innerHTML = `<b>${p}</b> / ${s.pages}`;
      document.getElementById("bar").style.width = (p / s.pages * 100) + "%";
      ["zPrev", "bPrev"].forEach((k) => document.getElementById(k).disabled = p === 1);
      ["zNext", "bNext"].forEach((k) => document.getElementById(k).disabled = p === s.pages);
      stripEl.querySelectorAll("button").forEach((b) => b.classList.toggle("on", +b.dataset.p === p));
      const on = stripEl.querySelector(`button[data-p="${p}"]`);
      if (on) stripEl.scrollTo({ left: on.offsetLeft - stripEl.clientWidth / 2 + on.clientWidth / 2, behavior: "smooth" });
      // preload neighbours
      [p + 1, p - 1].forEach((q) => { if (q >= 1 && q <= s.pages) new Image().src = pageSrc(id, q); });
      if (push) history.replaceState(null, "", `#slides/${id}/${p}`);
    }
    viewer.show = show;

    document.getElementById("zPrev").onclick = document.getElementById("bPrev").onclick = () => show(viewer.page - 1);
    document.getElementById("zNext").onclick = document.getElementById("bNext").onclick = () => show(viewer.page + 1);
    stripEl.onclick = (e) => { const b = e.target.closest("button"); if (b) show(+b.dataset.p); };

    const stage = document.getElementById("stage");
    document.getElementById("fs").onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (stage.requestFullscreen) stage.requestFullscreen();
      else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
      else window.open(pageSrc(id, viewer.page), "_blank");
    };

    let x0 = null;
    stage.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) show(viewer.page + (dx < 0 ? 1 : -1));
    });

    show(page, false);
  }

  document.addEventListener("keydown", (e) => {
    if (!viewer || !document.getElementById("slideImg")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); viewer.show(viewer.page + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); viewer.show(viewer.page - 1); }
    else if (e.key === "Home") viewer.show(1);
    else if (e.key === "End") viewer.show(viewer.s.pages);
  });


  /* ---------------- เอกสารประกอบการสอน : รายการบท ---------------- */
  function renderLectureList() {
    const total = LEC.reduce((a, d) => a + d.pages, 0);
    const cards = LEC.map((d) => `
      <a class="doccard" href="#lectures/${d.id}">
        <div class="dthumb"><img src="lectures/ch${d.id}/thumb.jpg" alt="หน้าแรกของบทที่ ${parseInt(d.id, 10)}" loading="lazy"></div>
        <div class="body">
          <div class="ch">บทที่ ${parseInt(d.id, 10)}</div>
          <div class="tt">${d.title || ""}</div>
          <div class="en">${d.en || ""}</div>
          <div class="foot"><span>${d.weeks || ""}</span><span>${d.pages} หน้า · PDF</span></div>
        </div>
      </a>`).join("");
    app.innerHTML = `
      <div class="page">
        <section class="hero">
          <div class="eyebrow"><b>Lecture Notes</b> · ${C.code} · ${C.term}</div>
          <h1>เอกสารประกอบการสอน</h1>
          <p class="en">${LEC.length} บท · ${total} หน้า — นิยาม ทฤษฎีบท ตัวอย่าง สรุปท้ายบท แบบฝึกหัดและแนวคำตอบ อ่านบนเว็บได้ทันที หรือดาวน์โหลดเป็น PDF</p>
          ${seg()}
        </section>
        <div class="doc-grid">${cards}</div>
      </div>`;
  }

  /* ---------------- เอกสารประกอบการสอน : ตัวอ่านเอกสาร (เลื่อนอ่านต่อเนื่อง) ---------------- */
  let reader = null;
  function renderReader(id, page) {
    const d = lecById(id);
    if (!d) return renderLectureList();
    const idx = LEC.indexOf(d), prev = LEC[idx - 1], next = LEC[idx + 1];
    page = Math.min(Math.max(1, page || 1), d.pages);
    const sheets = Array.from({ length: d.pages }, (_, i) => `
      <div class="sheet" id="pg${i + 1}" data-p="${i + 1}"><img src="${lecSrc(id, i + 1)}" alt="${d.title} หน้า ${i + 1}" loading="lazy"></div>`).join("");
    app.innerHTML = `
      <div class="page viewer">
        <div class="viewer-top">
          <div>
            <a class="back" href="#lectures">${icon.left} เอกสารประกอบการสอนทั้งหมด</a>
            <div class="viewer-title"><div class="ch">บทที่ ${parseInt(id, 10)}${d.weeks ? " · " + d.weeks : ""}</div><h1>${d.title || ""}</h1></div>
          </div>
          <div class="btns">
            ${READY && slideById(id) ? `<a class="btn" href="#slides/${id}">${icon.slides}สไลด์บทนี้</a>` : ""}
            <a class="btn primary" href="lectures/ch${id}.pdf" download>${icon.dl}ดาวน์โหลด PDF</a>
          </div>
        </div>
        <div class="rbar">
          <div class="rbar-inner">
            <button class="btn sm" type="button" id="rPrev" aria-label="หน้าก่อนหน้า">${icon.left}</button>
            <label class="pgjump">หน้า <input id="rPg" type="number" min="1" max="${d.pages}" value="${page}" inputmode="numeric"> / ${d.pages}</label>
            <button class="btn sm" type="button" id="rNext" aria-label="หน้าถัดไป">${icon.right}</button>
            <span class="sp"></span>
            <button class="btn sm" type="button" id="zOut" aria-label="ย่อ">−</button>
            <span class="zoomv" id="zv">100%</span>
            <button class="btn sm" type="button" id="zIn" aria-label="ขยาย">+</button>
          </div>
          <div class="progress"><i id="rbarp"></i></div>
        </div>
        <div class="sheets" id="sheets">${sheets}</div>
        <nav class="pager">
          ${prev ? `<a href="#lectures/${prev.id}"><div class="lbl">← บทก่อนหน้า</div><div class="nm">บทที่ ${parseInt(prev.id, 10)} ${prev.title || ""}</div></a>` : "<span></span>"}
          ${next ? `<a class="r" href="#lectures/${next.id}"><div class="lbl">บทถัดไป →</div><div class="nm">บทที่ ${parseInt(next.id, 10)} ${next.title || ""}</div></a>` : "<span></span>"}
        </nav>
      </div>`;

    const box = document.getElementById("sheets"), inp = document.getElementById("rPg");
    let zoom = 1, cur = page;
    reader = { d, go };
    function mark(p) {
      cur = p; inp.value = p;
      document.getElementById("rbarp").style.width = (p / d.pages * 100) + "%";
      document.getElementById("rPrev").disabled = p === 1;
      document.getElementById("rNext").disabled = p === d.pages;
      history.replaceState(null, "", `#lectures/${id}/${p}`);
    }
    function go(p, smooth = true) {
      p = Math.min(Math.max(1, p), d.pages);
      const el = document.getElementById("pg" + p);
      if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : "instant", block: "start" });
      mark(p);
    }
    document.getElementById("rPrev").onclick = () => go(cur - 1);
    document.getElementById("rNext").onclick = () => go(cur + 1);
    inp.onchange = () => go(+inp.value || 1);
    const setZoom = (z) => { zoom = Math.min(2, Math.max(0.6, Math.round(z * 10) / 10)); box.style.setProperty("--zoom", zoom); document.getElementById("zv").textContent = Math.round(zoom * 100) + "%"; };
    document.getElementById("zIn").onclick = () => { setZoom(zoom + 0.1); go(cur, false); };
    document.getElementById("zOut").onclick = () => { setZoom(zoom - 0.1); go(cur, false); };

    // ติดตามหน้าที่กำลังอ่าน
    const io = new IntersectionObserver((ents) => {
      const vis = ents.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis.length) mark(+vis[0].target.dataset.p);
    }, { rootMargin: "-140px 0px -55% 0px" });
    box.querySelectorAll(".sheet").forEach((el) => io.observe(el));
    reader.io = io;
    mark(page);
    if (page > 1) setTimeout(() => go(page, false), 60);
  }

  /* ---------------- หน้าที่ยังไม่เปิด ---------------- */
  const SOON = {
    slides: { ic: icon.slides, title: "สไลด์ประกอบการเรียน", en: "Lecture Slides", text: `สไลด์ ${S.length} บท (${S.reduce((a, s) => a + s.pages, 0)} หน้า) จะเปิดให้อ่านบนเว็บและดาวน์โหลดเป็น PDF เร็ว ๆ นี้`, list: true },
    lectures: { ic: icon.doc, title: "เอกสารประกอบการสอน", en: "Lecture Notes", text: "เอกสารประกอบการสอนรายบท พร้อมนิยาม ทฤษฎีบท ตัวอย่าง และการพิสูจน์ กำลังจัดเตรียม", list: true },
    exercises: { ic: icon.pen, title: "แบบฝึกหัด", en: "Exercises", text: "แบบฝึกหัดรายบทสำหรับฝึกออกแบบออโตมาตา นิพจน์สม่ำเสมอ ไวยากรณ์ และเครื่องจักรทัวริง กำลังจัดเตรียม", list: false }
  };
  function renderSoon(tab) {
    const p = SOON[tab];
    const list = p.list ? `<div class="soon-list">${S.map((s) => `<div><b>${s.id}</b>${s.title}</div>`).join("")}</div>` : "";
    app.innerHTML = `
      <div class="page">
        <section class="soon-page">
          <div class="icon">${p.ic}</div>
          <div class="eyebrow"><b>${p.en}</b> · ${C.code} · ${C.term}</div>
          <h1>${p.title}</h1>
          ${seg("center")}
          <p>${p.text}</p>
          <span class="pill">เร็ว ๆ นี้ · coming soon</span>
          ${list}
        </section>
      </div>`;
  }

  /* ---------------- router ---------------- */
  const TABS = ["plan", "slides", "lectures", "exercises"];
  let lastRoute = "";
  function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "home").split("/");
    const tab = TABS.includes(parts[0]) ? parts[0] : "home";
    document.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.tab === tab;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on);
    });

    const key = parts.slice(0, 2).join("/");
    if (tab === "slides" && READY && parts[1] && key === lastRoute && viewer) { viewer.show(+parts[2] || 1, false); return; }
    if (tab === "lectures" && parts[1] && key === lastRoute && reader) { if (parts[2]) reader.go(+parts[2], false); return; }
    lastRoute = key;
    viewer = null;
    if (reader && reader.io) reader.io.disconnect();
    reader = null;
    if (window.__heroUnmount) { window.__heroUnmount(); window.__heroUnmount = null; }
    window.__heroPending = null;
    app.className = tab === "home" ? "" : "wrap";
    document.body.classList.toggle("is-home", tab === "home");

    if (tab === "home") { renderHome(); document.title = `${C.code} ${C.nameTh} (${C.nameEn})`; }
    else if (tab === "plan") { renderPlan(); document.title = `แผนการสอน · ${C.code} ${C.nameTh}`; }
    else if (tab === "slides" && READY) {
      const s = parts[1] && slideById(parts[1]);
      if (s) { renderViewer(s.id, +parts[2] || 1); document.title = `บทที่ ${parseInt(s.id, 10)} ${s.title} · ${C.code}`; }
      else { renderSlideList(); document.title = `สไลด์ · ${C.code}`; }
    }
    else if (tab === "lectures" && LEC.length) {
      const d = parts[1] && lecById(parts[1]);
      if (d) { renderReader(d.id, +parts[2] || 1); document.title = `เอกสารประกอบการสอนบทที่ ${parseInt(d.id, 10)} ${d.title || ""} · ${C.code}`; }
      else { renderLectureList(); document.title = `เอกสารประกอบการสอน · ${C.code}`; }
    }
    else { renderSoon(tab); document.title = `${SOON[tab].title} · ${C.code}`; }
    if (!(tab === "lectures" && parts[2] > 1)) window.scrollTo({ top: 0, behavior: "instant" });
  }
  window.addEventListener("hashchange", route);
  route();
})();
