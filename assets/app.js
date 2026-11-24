(function () {
  const C = window.COURSE, S = window.SLIDES || [], READY = !!window.SLIDES_READY;
  const app = document.getElementById("app");
  const pad = (n) => String(n).padStart(2, "0");
  const slideById = (id) => S.find((s) => s.id === id);
  const seg = (cls = "") => `<div class="seg-bar ${cls}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>`;
  const icon = {
    slides: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
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
        <a class="hcard soon" href="#lectures">
          <span class="hnum">03</span>
          <h3>คำบรรยายรายวิชา</h3>
          <p>เนื้อหาคำบรรยายละเอียดรายบท พร้อมนิยาม ทฤษฎีบท และตัวอย่าง อ่านทบทวนได้ทุกที่</p>
          <span class="go">เร็ว ๆ นี้</span>
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
      const quiz = w.quiz ? `<span class="chip quiz">${icon.flag}${w.quiz}</span>` : "";
      return `
        <div class="wk">
          <div class="no">สัปดาห์<b>${w.w}</b></div>
          <div><div class="t">${w.title}</div><div class="th">${w.th}</div></div>
          <div class="links">${quiz}<span class="chip clo-chip">CLO ${w.clo}</span>${chips}</div>
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

  /* ---------------- หน้าที่ยังไม่เปิด ---------------- */
  const SOON = {
    slides: { ic: icon.slides, title: "สไลด์ประกอบการเรียน", en: "Lecture Slides", text: `สไลด์ ${S.length} บท (${S.reduce((a, s) => a + s.pages, 0)} หน้า) จะเปิดให้อ่านบนเว็บและดาวน์โหลดเป็น PDF เร็ว ๆ นี้`, list: true },
    lectures: { ic: icon.doc, title: "คำบรรยายรายวิชา", en: "Lecture Notes", text: "เนื้อหาคำบรรยายละเอียดรายบท พร้อมนิยาม ทฤษฎีบท ตัวอย่าง และการพิสูจน์ กำลังจัดเตรียม", list: true },
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
  function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "home").split("/");
    const tab = TABS.includes(parts[0]) ? parts[0] : "home";
    document.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.tab === tab;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on);
    });

    if (window.__heroUnmount) { window.__heroUnmount(); window.__heroUnmount = null; }
    window.__heroPending = null;
    app.className = tab === "home" ? "" : "wrap";
    document.body.classList.toggle("is-home", tab === "home");

    if (tab === "home") { renderHome(); document.title = `${C.code} ${C.nameTh} (${C.nameEn})`; }
    else if (tab === "plan") { renderPlan(); document.title = `แผนการสอน · ${C.code} ${C.nameTh}`; }
    else { renderSoon(tab); document.title = `${SOON[tab].title} · ${C.code}`; }
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  window.addEventListener("hashchange", route);
  route();
})();
