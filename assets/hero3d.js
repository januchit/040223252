// ฉาก 3 มิติของหน้าแรก (ทฤษฎีการคำนวณ)
// ES module ไม่ต้อง build: "three" และ "three/addons/" โหลดจาก assets/vendor/ (Three.js r185) ผ่าน importmap ใน index.html
//
// องค์ประกอบ
//  1) DFA 5 สถานะ รับเลขฐานสองที่หารด้วย 5 ลงตัว  δ(q,a) = (2q + a) mod 5  — ทำงานจริงทีละสัญลักษณ์
//  2) เทปของเครื่องจักรทัวริง + หัวอ่าน เลื่อนตามสตริงที่ DFA กำลังอ่าน เชื่อมกับสถานะปัจจุบัน (finite control)
//  3) วงโคจร 4 ชั้น = ลำดับชั้นของ Chomsky  REG ⊂ CFL ⊂ CSL ⊂ RE
//  4) พื้นผิวจุดคลื่นสีน้ำเงิน, สัญลักษณ์ลอย (Σ*, δ, ε, a*b*, 0ⁿ1ⁿ …), ฝุ่นดาว, bloom
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const BLUE = new THREE.Color("#2F6BFF");
const BLUE_HEX = "#4C86FF";
const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';

const TOKENS = [
  ["Σ*", 1], ["δ(q, a)", 0], ["ε", 1], ["∅", 0], ["a*b*", 0], ["0ⁿ1ⁿ", 1], ["L(M)", 0], ["q₀", 0],
  ["⊢", 1], ["S → aSb", 0], ["P = NP ?", 1], ["HALT", 0], ["⊔", 0], ["(a|b)*abb", 0], ["{ w | w = wᴿ }", 0],
  ["M = (Q, Σ, δ, q₀, F)", 0], ["λ", 1], ["NFA → DFA", 0], ["PDA", 0], ["∀n ∃k", 0], ["TM", 1], ["Γ", 0]
];

/* ---------- helpers ---------- */
function textTexture(text, { color = "#e9e9e9", fs = 64, weight = 500 } = {}) {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  const font = `${weight} ${fs}px ${MONO}`;
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width) + 24;
  c.width = w; c.height = Math.ceil(fs * 1.5);
  ctx.font = font; ctx.textBaseline = "middle"; ctx.fillStyle = color;
  ctx.fillText(text, 12, c.height / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  tex.userData = { aspect: c.width / c.height };
  return tex;
}
function textSprite(text, opts = {}) {
  const tex = textTexture(text, opts);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: opts.opacity ?? 0.6, depthWrite: false });
  const s = new THREE.Sprite(mat);
  const h = opts.h ?? 0.34;
  s.scale.set(h * tex.userData.aspect, h, 1);
  return s;
}
function circleTexture(draw, size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  draw(c.getContext("2d"), size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
const glowTex = () => circleTexture((g, s) => {
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, "rgba(120,165,255,1)");
  grd.addColorStop(0.25, "rgba(60,120,255,.55)");
  grd.addColorStop(1, "rgba(30,80,255,0)");
  g.fillStyle = grd; g.fillRect(0, 0, s, s);
});
const nodeTex = (accept) => circleTexture((g, s) => {
  const r = s * 0.36;
  g.fillStyle = "rgba(4,10,28,.96)";
  g.beginPath(); g.arc(s / 2, s / 2, r, 0, Math.PI * 2); g.fill();
  g.strokeStyle = BLUE_HEX; g.lineWidth = s * 0.03;
  g.beginPath(); g.arc(s / 2, s / 2, r, 0, Math.PI * 2); g.stroke();
  if (accept) { g.lineWidth = s * 0.022; g.beginPath(); g.arc(s / 2, s / 2, r * 1.24, 0, Math.PI * 2); g.stroke(); }
});

export function mount(container) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  } catch (e) {
    container.classList.add("no-webgl");
    return () => {};
  }
  const maxPR = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(maxPR);
  renderer.setClearColor(0x000000, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.05);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const world = new THREE.Group();
  scene.add(world);
  const rand = (a, b) => a + Math.random() * (b - a);

  /* --- 1) พื้นผิวจุดคลื่น (สีเทา → น้ำเงิน → ขาวอมฟ้า) --- */
  const N = 150, SIZE = 26;
  const pos = new Float32Array(N * N * 3);
  let k = 0;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    pos[k++] = (i / (N - 1) - 0.5) * SIZE; pos[k++] = 0; pos[k++] = (j / (N - 1) - 0.5) * SIZE;
  }
  const surfGeo = new THREE.BufferGeometry();
  surfGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const surfMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPR: { value: maxPR }, uSize: { value: 3.0 }, uBlue: { value: BLUE }, uFog: { value: 0.05 } },
    vertexShader: `
      uniform float uTime, uPR, uSize;
      varying float vH; varying float vDepth;
      void main(){
        vec3 p = position;
        float r = length(p.xz);
        float h = 0.7*sin(p.x*0.38 + uTime*0.5)*cos(p.z*0.38 + uTime*0.35)
                + 0.85*sin(r*0.8 - uTime*1.0)/(1.0 + r*0.22);
        p.y = h; vH = h;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDepth = -mv.z;
        gl_PointSize = uSize * uPR * (20.0 / vDepth);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uBlue; uniform float uFog;
      varying float vH; varying float vDepth;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.05, d);
        float t = clamp((vH + 0.6) / 1.8, 0.0, 1.0);
        vec3 col = mix(vec3(0.30), uBlue, smoothstep(0.35, 0.75, t));
        col = mix(col, vec3(0.85, 0.92, 1.0), smoothstep(0.9, 1.0, t));
        float fog = exp(-pow(uFog * vDepth, 2.0) * 2.2);
        gl_FragColor = vec4(col, a * (0.3 + 0.6 * t) * fog);
      }`
  });
  const surface = new THREE.Points(surfGeo, surfMat);
  surface.position.y = -3.2;
  world.add(surface);

  const grid = new THREE.GridHelper(40, 40, 0x1c2536, 0x0e121a);
  grid.position.y = -4.6;
  grid.material.transparent = true; grid.material.opacity = 0.5;
  world.add(grid);

  /* --- 2) กลุ่มหลัก: DFA + เทป + วงโคจร Chomsky --- */
  const hero = new THREE.Group();
  world.add(hero);
  const graph = new THREE.Group();
  hero.add(graph);

  // DFA: δ(q, a) = (2q + a) mod 5, เริ่มที่ q0, สถานะยอมรับ {q0}
  const NQ = 5, R = 2.05, NODE_R = 0.36;
  const delta = (q, a) => (2 * q + a) % NQ;
  const nodePos = [];
  for (let i = 0; i < NQ; i++) {
    const a = Math.PI / 2 + i * (Math.PI * 2 / NQ) + Math.PI; // q0 ซ้ายล่าง → ทวนเข็ม
    nodePos.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R * 0.92, Math.sin(i * 1.7) * 0.45));
  }
  const center = new THREE.Vector3();

  const gTex = glowTex();
  const nodes = nodePos.map((p, i) => {
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
    glow.scale.setScalar(1.6); glow.position.copy(p); graph.add(glow);
    const body = new THREE.Sprite(new THREE.SpriteMaterial({ map: nodeTex(i === 0), transparent: true, depthWrite: false }));
    body.scale.setScalar(NODE_R * 2 / 0.72 * (i === 0 ? 1.0 : 1.0)); body.position.copy(p); body.renderOrder = 5; graph.add(body);
    const lbl = textSprite(`q${"₀₁₂₃₄"[i]}`, { color: "#ffffff", h: 0.3, opacity: 0.95, weight: 600 });
    lbl.position.copy(p); lbl.renderOrder = 6; graph.add(lbl);
    return { glow, body, lbl, flash: 0 };
  });

  // start arrow → q0
  {
    const p = nodePos[0];
    const from = p.clone().add(new THREE.Vector3(-1.05, -0.35, 0));
    const to = p.clone().add(new THREE.Vector3(-NODE_R - 0.08, -0.1, 0));
    graph.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), new THREE.LineBasicMaterial({ color: 0x9fb8ff, transparent: true, opacity: 0.55 })));
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 12), new THREE.MeshBasicMaterial({ color: 0x9fb8ff, transparent: true, opacity: 0.7 }));
    cone.position.copy(to); cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
    graph.add(cone);
    const st = textSprite("start", { color: "#9fb8ff", h: 0.2, opacity: 0.6 });
    st.position.copy(from).add(new THREE.Vector3(-0.35, -0.05, 0)); graph.add(st);
  }

  // edges
  const edges = {}; // key "q,a"
  const sym = ["0", "1"];
  for (let q = 0; q < NQ; q++) for (let a = 0; a < 2; a++) {
    const r = delta(q, a);
    const A = nodePos[q], B = nodePos[r];
    let curve;
    if (q === r) {
      const out = A.clone().sub(center).setZ(0).normalize();
      const side = new THREE.Vector3(-out.y, out.x, 0);
      const c = A.clone().add(out.clone().multiplyScalar(0.62));
      const pts = [];
      for (let i = 0; i <= 40; i++) {
        const t = -Math.PI * 0.82 + (i / 40) * Math.PI * 1.64;
        pts.push(c.clone().add(out.clone().multiplyScalar(Math.cos(t) * 0.34)).add(side.clone().multiplyScalar(Math.sin(t) * 0.3)).add(new THREE.Vector3(0, 0, Math.sin(t) * 0.0)));
      }
      pts.reverse();
      curve = new THREE.CatmullRomCurve3(pts);
    } else {
      const mid = A.clone().add(B).multiplyScalar(0.5);
      const d = B.clone().sub(A);
      const perp = new THREE.Vector3(-d.y, d.x, 0).normalize();
      const ctrl = mid.add(perp.multiplyScalar(d.length() * 0.2)).add(new THREE.Vector3(0, 0, 0.35));
      curve = new THREE.QuadraticBezierCurve3(A.clone(), ctrl, B.clone());
    }
    // ตัดปลายเส้นที่อยู่ในวงกลมสถานะ
    let t0 = 0, t1 = 1;
    const S = 200;
    for (let i = 0; i <= S; i++) { const t = i / S; if (curve.getPoint(t).distanceTo(A) > NODE_R + 0.04) { t0 = t; break; } }
    for (let i = S; i >= 0; i--) { const t = i / S; if (curve.getPoint(t).distanceTo(B) > NODE_R + 0.06) { t1 = t; break; } }
    const pts = [];
    for (let i = 0; i <= 80; i++) pts.push(curve.getPoint(t0 + (t1 - t0) * (i / 80)));
    const mat = new THREE.LineBasicMaterial({ color: 0x6f9bff, transparent: true, opacity: 0.38 });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    graph.add(line);
    const end = pts[pts.length - 1], dir = end.clone().sub(pts[pts.length - 4]).normalize();
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.17, 12), new THREE.MeshBasicMaterial({ color: 0x8fb0ff, transparent: true, opacity: 0.7 }));
    cone.position.copy(end).sub(dir.clone().multiplyScalar(0.06));
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    graph.add(cone);
    const midP = curve.getPoint((t0 + t1) / 2);
    const lblOff = midP.clone().sub(q === r ? A : center).setZ(0).normalize().multiplyScalar(0.2);
    const lbl = textSprite(sym[a], { color: "#c9d6ff", h: 0.24, opacity: 0.75 });
    lbl.position.copy(midP).add(lblOff); graph.add(lbl);
    edges[q + "," + a] = { curve, t0, t1, mat, cone, hot: 0 };
  }

  // ชีพจรวิ่งตามเส้น
  const pulse = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
  pulse.scale.setScalar(0.55); graph.add(pulse);
  const pulseCore = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
  graph.add(pulseCore);

  // ผลลัพธ์ ACCEPT / REJECT
  const resultTex = {};
  const result = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false }));
  result.position.set(0, R + 0.95, 0.3); graph.add(result);
  function setResult(text, color) {
    const key = text + color;
    if (!resultTex[key]) resultTex[key] = textTexture(text, { color, fs: 56, weight: 600 });
    result.material.map = resultTex[key]; result.material.needsUpdate = true;
    const h = 0.32; result.scale.set(h * resultTex[key].userData.aspect, h, 1);
  }

  /* --- เทปของเครื่องจักรทัวริง --- */
  const tape = new THREE.Group();
  const TAPE_Y = -R - 1.3, PITCH = 0.62, CELLS = 25;
  tape.position.set(0, TAPE_Y, 0.6);
  hero.add(tape);
  const symTex = { "0": textTexture("0", { color: "#e6ecff", fs: 72, weight: 500 }), "1": textTexture("1", { color: "#e6ecff", fs: 72, weight: 500 }), "⊔": textTexture("⊔", { color: "#5d6680", fs: 72, weight: 400 }) };
  const cellGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.56, 0.56, 0.14));
  const strip = new THREE.Group(); tape.add(strip);
  const cells = [];
  for (let i = 0; i < CELLS; i++) {
    const g = new THREE.Group();
    const box = new THREE.LineSegments(cellGeo, new THREE.LineBasicMaterial({ color: 0x5577cc, transparent: true, opacity: 0.4 }));
    const fill = new THREE.Mesh(new THREE.PlaneGeometry(0.54, 0.54), new THREE.MeshBasicMaterial({ color: 0x0a1530, transparent: true, opacity: 0.55, depthWrite: false }));
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: symTex["⊔"], transparent: true, opacity: 0.8, depthWrite: false }));
    s.scale.set(0.36 * symTex["⊔"].userData.aspect, 0.36, 1); s.position.z = 0.08;
    g.add(fill, box, s); strip.add(g);
    cells.push({ g, box, fill, s, idx: 0 });
  }
  // หัวอ่าน/เขียน
  const head = new THREE.Group(); tape.add(head);
  const headMesh = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.ConeGeometry(0.2, 0.32, 4)), new THREE.LineBasicMaterial({ color: 0x9cc0ff, transparent: true, opacity: 0.95 }));
  headMesh.rotation.x = Math.PI; headMesh.position.y = 0.6; head.add(headMesh);
  const headGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
  headGlow.scale.setScalar(0.9); headGlow.position.y = 0.6; head.add(headGlow);
  const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.66, 0.66, 0.2)), new THREE.LineBasicMaterial({ color: 0x4c86ff, transparent: true, opacity: 0.95 }));
  head.add(frame);
  // เส้นเชื่อม finite control (สถานะปัจจุบัน) ↔ หัวอ่าน
  const linkGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  const link = new THREE.Line(linkGeo, new THREE.LineDashedMaterial({ color: 0x4c86ff, transparent: true, opacity: 0.45, dashSize: 0.08, gapSize: 0.07 }));
  hero.add(link);

  /* --- วงโคจร: ลำดับชั้นของ Chomsky --- */
  const orbits = [];
  [["REG", 3.05, 0x4c86ff, 0.34], ["CFL", 3.6, 0x7f9fdf, 0.24], ["CSL", 4.15, 0x8a93a6, 0.18], ["RE", 4.7, 0x777777, 0.14]].forEach(([name, rad, col, op], i) => {
    const o = new THREE.Group();
    const pts = [];
    for (let j = 0; j <= 160; j++) { const t = (j / 160) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(t) * rad, 0, Math.sin(t) * rad)); }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const ln = new THREE.Line(geo, i % 2 ? new THREE.LineDashedMaterial({ color: col, transparent: true, opacity: op, dashSize: 0.18, gapSize: 0.12 }) : new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op }));
    if (i % 2) ln.computeLineDistances();
    o.add(ln);
    const lbl = textSprite(name, { color: i === 0 ? "#8fb0ff" : "#a0a0a8", h: 0.24, opacity: 0.75, weight: 600 });
    lbl.position.set(rad, 0, 0); o.add(lbl);
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: i === 0 ? 0x9cc0ff : 0xdddddd }));
    bead.position.set(-rad, 0, 0); o.add(bead);
    o.rotation.set(1.18 + i * 0.07, 0, -0.35 + i * 0.16);
    hero.add(o);
    orbits.push({ o, sp: (i % 2 ? -1 : 1) * (0.07 + i * 0.025) });
  });

  /* --- สัญลักษณ์ลอย --- */
  const tokens = [];
  TOKENS.forEach(([txt, hi], i) => {
    const s = textSprite(txt, { color: hi ? "#6f9bff" : "#e2e6ef", opacity: hi ? 0.85 : 0.42 });
    const ang = (i / TOKENS.length) * Math.PI * 2 + rand(-0.2, 0.2);
    const rad = rand(5.0, 8.2);
    s.position.set(Math.cos(ang) * rad, rand(-1.2, 3.8), Math.sin(ang) * rad - 1.5);
    s.userData = { base: s.position.clone(), ph: rand(0, Math.PI * 2), sp: rand(0.3, 0.7) };
    world.add(s); tokens.push(s);
  });

  /* --- ฝุ่นดาว --- */
  const dustN = 700, dust = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) { dust[i * 3] = rand(-22, 22); dust[i * 3 + 1] = rand(-3, 12); dust[i * 3 + 2] = rand(-25, 6); }
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x7f8aa3, size: 0.035, transparent: true, opacity: 0.6, depthWrite: false }));
  scene.add(dustPts);

  /* --- post-processing --- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.62, 0.5, 0.3));
  composer.addPass(new OutputPass());

  /* --- การจำลองการทำงานของ DFA --- */
  const STEP = 0.95, MOVE = 0.62;
  const run = { w: "", i: 0, q: 0, phase: "idle", t: 0, from: 0, to: 0, a: 0, shift: 0 };
  function newWord() {
    let n;
    if (Math.random() < 0.55) n = 5 * Math.floor(rand(2, 60));
    else n = Math.floor(rand(9, 300));
    run.w = n.toString(2); run.n = n;
    run.i = 0; run.q = 0; run.phase = "pause"; run.t = -0.6; run.shift = 0;
    result.material.opacity = 0;
    // วางสตริงบนเทป: cell index j แทนตำแหน่ง (j - 8) เทียบกับตัวอักษรแรก
    cells.forEach((c, j) => {
      const idx = j - 8; c.idx = idx;
      const ch = idx >= 0 && idx < run.w.length ? run.w[idx] : "⊔";
      c.s.material.map = symTex[ch]; c.s.material.needsUpdate = true;
      c.s.scale.set(0.36 * symTex[ch].userData.aspect, 0.36, 1);
      c.g.position.x = idx * PITCH;
    });
  }
  newWord();

  function step(dt) {
    run.t += dt;
    if (run.phase === "pause") {
      if (run.t > 0) {
        if (run.i < run.w.length) {
          run.a = +run.w[run.i]; run.from = run.q; run.to = delta(run.q, run.a);
          run.phase = "move"; run.t = 0;
        } else {
          const ok = run.q === 0;
          setResult(`${run.w}₂ = ${run.n}  ${ok ? "✓ ACCEPT" : "✗ REJECT"}`, ok ? "#7fb0ff" : "#9a9aa4");
          run.phase = "done"; run.t = 0;
          if (ok) nodes[0].flash = 1.6;
        }
      }
    } else if (run.phase === "move") {
      const e = edges[run.from + "," + run.a];
      const u = Math.min(run.t / MOVE, 1);
      const ease = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const p = e.curve.getPoint(e.t0 + (e.t1 - e.t0) * ease);
      pulse.position.copy(p); pulseCore.position.copy(p);
      pulse.material.opacity = pulseCore.material.opacity = Math.sin(u * Math.PI) * 0.9 + 0.1;
      e.hot = 1;
      run.shift = run.i + ease; // เทปเลื่อนไปพร้อมกัน
      if (u >= 1) {
        run.q = run.to; run.i++; nodes[run.q].flash = 1;
        pulse.material.opacity = pulseCore.material.opacity = 0;
        run.phase = "pause"; run.t = -(STEP - MOVE);
      }
    } else if (run.phase === "done") {
      result.material.opacity = Math.min(1, run.t * 3) * (run.t > 2.6 ? Math.max(0, 1 - (run.t - 2.6) * 2.5) : 1) * 0.95;
      if (run.t > 3.1) newWord();
    }
  }

  /* --- layout --- */
  let wide = true;
  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false); composer.setSize(w, h);
    camera.aspect = w / h;
    wide = w / h > 1.15;
    camera.fov = wide ? 42 : 60;
    camera.updateProjectionMatrix();
    hero.position.set(wide ? 4.2 : 0, wide ? 1.85 : 3.6, 0);
    hero.scale.setScalar(wide ? 0.8 : 0.6);
  }
  const ro = new ResizeObserver(resize); ro.observe(container); resize();

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e) => {
    const r = container.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
  io.observe(container);

  const clock = new THREE.Clock();
  const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), inv = new THREE.Matrix4();
  let raf = 0, t = 0;
  function frameFn() {
    raf = requestAnimationFrame(frameFn);
    if (!visible || document.hidden) { clock.getDelta(); return; }
    const dt = Math.min(clock.getDelta(), 0.05) * (reduce ? 0.25 : 1);
    t += dt;
    mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;

    step(dt);
    surfMat.uniforms.uTime.value = t;

    // กราฟ: แกว่งเบา ๆ ให้เห็นความลึก
    graph.rotation.set(Math.sin(t * 0.21) * 0.12 - 0.05, Math.sin(t * 0.17) * 0.32, 0);
    nodes.forEach((n, i) => {
      const active = i === run.q && run.phase !== "move";
      n.flash = Math.max(0, n.flash - dt * 1.4);
      const g = (active ? 0.75 : 0.18) + n.flash * 0.6 + Math.sin(t * 2 + i) * 0.04;
      n.glow.material.opacity += (g - n.glow.material.opacity) * 0.15;
      n.glow.scale.setScalar(1.4 + n.flash * 0.9 + (active ? 0.25 : 0));
      const c = active ? 1.6 + n.flash : 1;
      n.body.material.color.setScalar(c);
    });
    Object.values(edges).forEach((e) => {
      e.hot = Math.max(0, e.hot - dt * 1.2);
      e.mat.opacity = 0.32 + e.hot * 0.6;
      e.mat.color.setRGB(0.43 + e.hot * 0.5, 0.6 + e.hot * 0.35, 1);
    });

    // เทป
    strip.position.x += (-run.shift * PITCH - strip.position.x) * 0.25;
    cells.forEach((c) => {
      const x = c.g.position.x + strip.position.x;
      const f = Math.max(0, 1 - Math.abs(x) / 6.2);
      const cur = Math.abs(x) < PITCH * 0.5 && run.phase !== "done";
      c.box.material.opacity = 0.12 + f * 0.45 + (cur ? 0.4 : 0);
      c.fill.material.opacity = 0.15 + f * 0.45;
      const read = c.idx < run.i;
      c.s.material.opacity = f * (read ? 0.45 : 0.95);
      c.g.position.y = cur ? Math.sin(t * 6) * 0.015 : 0;
    });
    headMesh.rotation.y = t * 1.2;
    headGlow.material.opacity = 0.35 + Math.sin(t * 3) * 0.1;
    tape.rotation.y = Math.sin(t * 0.17) * 0.12;

    // finite control ↔ head
    const src = run.phase === "move" ? pulse.position : nodePos[run.q];
    graph.updateMatrixWorld(); tape.updateMatrixWorld();
    inv.copy(hero.matrixWorld).invert();
    tmpA.copy(src).applyMatrix4(graph.matrixWorld).applyMatrix4(inv);
    tmpB.set(0, 0.78, 0).applyMatrix4(head.matrixWorld).applyMatrix4(inv);
    linkGeo.attributes.position.setXYZ(0, tmpA.x, tmpA.y - 0.38, tmpA.z);
    linkGeo.attributes.position.setXYZ(1, tmpB.x, tmpB.y, tmpB.z);
    linkGeo.attributes.position.needsUpdate = true;
    link.computeLineDistances();

    orbits.forEach((o) => { o.o.rotation.y += dt * o.sp; });
    tokens.forEach((s) => { const u = s.userData; s.position.y = u.base.y + Math.sin(t * u.sp + u.ph) * 0.25; });
    world.rotation.y = Math.sin(t * 0.05) * 0.1 + mouse.x * 0.1;
    dustPts.rotation.y = t * 0.01;

    const camR = 12;
    camera.position.set(Math.sin(mouse.x * 0.15) * camR * 0.2, 3.2 - mouse.y * 0.6, camR);
    camera.lookAt(wide ? 1.3 : 0, wide ? 0.2 : 0.6, 0);
    composer.render();
  }
  frameFn();

  return function unmount() {
    cancelAnimationFrame(raf);
    ro.disconnect(); io.disconnect();
    window.removeEventListener("pointermove", onMove);
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); }
    });
    Object.values(resultTex).forEach((x) => x.dispose());
    composer.dispose && composer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}

window.Hero3D = { mount };
if (window.__heroPending) { const el = window.__heroPending; window.__heroPending = null; window.__heroUnmount = mount(el); }
