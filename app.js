const chapters = [
  {
    id: 'electrostatic',
    number: '01',
    title: '静电场基础：电场线与高斯定理',
    source: './assets/pdfs/xuexitong_output.pdf',
    sourceLabel: '学习通 PDF',
    summary: '这一章的主线是：电荷产生电场，电场通过力体现；高斯定理把闭合面的电通量和内部净电荷联系起来。',
    concepts: ['电场强度定义为单位正试探电荷受力：$\\vec E=\\vec F/q_0$。', '电场线从正电荷出发、终止于负电荷；疏密表示场强大小，电场线不相交。', '电通量刻画电场穿过面积的多少，闭合曲面外法向为正。', '高斯定理适合高对称模型：球对称、柱对称、平面对称。'],
    formulas: ['$F=\\frac{1}{4\\pi\\epsilon_0}\\frac{|q_1q_2|}{r^2}$', '$\\vec E=\\vec F/q_0$', '$\\Phi_E=\\int \\vec E\\cdot d\\vec A$', '$\\oint \\vec E\\cdot d\\vec A=Q_{enc}/\\epsilon_0$'],
    mistakes: ['通量为 0 不代表处处 $E=0$。', '$Q_{enc}$ 只数高斯面内部净电荷；但 $\\vec E$ 是总电场。', '高斯面是人为选的数学曲面，不一定是真实物体表面。'],
    diagram: 'gauss',
    multiple: [
      { q: '高斯定理最容易直接求场强的条件是？', options: ['电荷很多', '电势为零', '电荷分布有高对称性', '闭合面面积最大'], answer: 2, explain: '只有高对称性才能把 $E$ 从积分中提出或分段处理。' },
      { q: '闭合面内净电荷为零时，下列一定正确的是？', options: ['面上每点电场为零', '穿过闭合面的净通量为零', '面外没有电荷', '面内没有任何电场线'], answer: 1, explain: '净通量由内部净电荷决定；外部电荷仍可让面上存在电场。' }
    ],
    blanks: [
      { prompt: '点电荷场强大小 $E=$', answer: '$\\frac{1}{4\\pi\\epsilon_0}\\frac{|q|}{r^2}$' },
      { prompt: '无限大均匀带电平面场强 $E=$', answer: '$\\sigma/(2\\epsilon_0)$' }
    ],
    application: { title: '球壳的高斯面', prompt: '半径 $R$ 的均匀带电薄球壳，总电荷 $Q$。分别求 $r<R$ 与 $r>R$ 的电场强度。', answer: '$r<R$ 时 $Q_{enc}=0$，所以 $E=0$；$r>R$ 时等效为中心点电荷，$E=\\frac{1}{4\\pi\\epsilon_0}\\frac{Q}{r^2}$。' }
  },
  {
    id: 'potential',
    number: '02',
    title: '电势、电容、介质与导体',
    source: './assets/pdf_exports/第2章_电势电容_从整合版拆分.pdf',
    sourceLabel: '第2章细分 PDF',
    summary: '这一章把“力”的视角换成“能量”的视角：电势差来自电场积分，电容描述储电能力，导体静电平衡时内部电场为零。',
    concepts: ['静电场是保守场，电场力做功与路径无关。', '电势是单位电荷的电势能，电场方向指向电势降低最快的方向。', '静电平衡导体内部 $E=0$，整体为等势体，表面场强垂直表面。', '电介质极化会削弱内部电场，使电容增大。'],
    formulas: ['$V_B-V_A=-\\int_A^B\\vec E\\cdot d\\vec l$', '$\\Delta U=q\\Delta V$', '$C=Q/V$', '$C_{parallel}=\\epsilon S/d$', '$U=\\frac12CV^2=\\frac{Q^2}{2C}=\\frac12QV$'],
    mistakes: ['电势是标量，电场是矢量。', '接电池时 $V$ 固定；断开电池时 $Q$ 固定。', '导体内部 $E=0$，但导体表面外侧电场通常不为零。'],
    diagram: 'capacitor',
    multiple: [
      { q: '电容器充电后断开电源，再插入电介质，哪一项保持不变？', options: ['$V$', '$Q$', '$C$', '$E$'], answer: 1, explain: '断开后没有电荷通路，极板自由电荷量 $Q$ 保持不变。' },
      { q: '静电平衡导体表面电场方向应当怎样？', options: ['沿表面切向', '垂直表面', '任意方向', '一定为零'], answer: 1, explain: '若存在切向分量，自由电荷会沿表面继续运动。' }
    ],
    blanks: [
      { prompt: '电场力做功与电势能变化关系：$W_E=$', answer: '$-\\Delta U$' },
      { prompt: '平行板电容器插入相对介电常数 $\\epsilon_r$ 后，电容变为', answer: '$C^\\prime=\\epsilon_r C$' }
    ],
    application: { title: '电池连接的平行板电容', prompt: '平行板电容器接在电压 $V$ 的电池上，插入相对介电常数 $\\epsilon_r$ 的电介质。判断 $C,Q,U$ 如何变化。', answer: '$C$ 增大为 $\\epsilon_rC$；因电池保持 $V$ 不变，$Q=CV$ 增大为 $\\epsilon_rQ$；储能 $U=\\frac12CV^2$ 也增大为 $\\epsilon_rU$。' }
  },
  {
    id: 'magnetostatic',
    number: '03',
    title: '稳恒磁场',
    source: './assets/pdf_exports/第10章 稳恒磁场.pdf',
    sourceLabel: '第10章 PDF',
    summary: '稳恒磁场的核心是“运动电荷/电流产生磁场，磁场又对运动电荷/电流施力”。方向判断是高频考点。',
    concepts: ['磁感应强度 $\\vec B$ 描述磁场强弱和方向。', '运动电荷受洛伦兹力，载流导线受安培力。', '磁场力总垂直于速度相关分量，通常不改变速率。', '安培环路定理适合长直导线、螺线管、环形螺线管等高对称电流。'],
    formulas: ['$\\vec F=q\\vec v\\times\\vec B$', '$\\vec F=I\\vec l\\times\\vec B$', '$B=\\mu_0I/(2\\pi r)$', '$\\oint\\vec B\\cdot d\\vec l=\\mu_0I_{enc}$'],
    mistakes: ['负电荷受力方向与右手定则给出的正电荷方向相反。', '磁力方向永远垂直于 $\\vec v$ 和 $\\vec B$ 构成的平面。', '$I_{enc}$ 是穿过环路所围曲面的净电流，要带方向。'],
    diagram: 'wire',
    multiple: [
      { q: '磁场力对单个运动电荷通常做功为？', options: ['正功', '负功', '零', '取决于磁感应强度大小'], answer: 2, explain: '$\\vec F$ 与 $\\vec v$ 垂直，功率 $P=\\vec F\\cdot\\vec v=0$。' },
      { q: '长直导线外磁场大小随距离 $r$ 怎样变化？', options: ['$\\propto r$', '$\\propto r^2$', '$\\propto 1/r$', '与 $r$ 无关'], answer: 2, explain: '$B=\\mu_0I/(2\\pi r)$。' }
    ],
    blanks: [
      { prompt: '洛伦兹力大小 $F=$', answer: '$|q|vB\\sin\\theta$' },
      { prompt: '长直导线磁场方向由', answer: '右手螺旋定则判断' }
    ],
    application: { title: '长直导线的安培环路', prompt: '长直导线通电流 $I$，取半径 $r$ 的同心圆为安培环路，求环路上 $B$。', answer: '对称性给出 $B$ 在圆周上等大且沿切向，$B(2\\pi r)=\\mu_0I$，所以 $B=\\mu_0I/(2\\pi r)$。' }
  },
  {
    id: 'em-induction',
    number: '04',
    title: '变化的电磁场',
    source: './assets/pdf_exports/第11章 变化的电磁场.pdf',
    sourceLabel: '第11章 PDF',
    summary: '变化电磁场的核心是“磁通量变化产生感应电动势”，再通过位移电流把变化电场也纳入磁场来源。',
    concepts: ['磁通量 $\\Phi_B$ 衡量磁场穿过面积的多少。', '法拉第定律给出感应电动势大小，楞次定律给出方向。', '感应电场不是静电场，其闭合环路积分可以不为零。', '位移电流说明变化电场也能激发磁场，是电磁波理论的关键补充。'],
    formulas: ['$\\Phi_B=\\int\\vec B\\cdot d\\vec A$', '$\\epsilon=-N\\frac{d\\Phi_B}{dt}$', '$\\epsilon=Blv$', '$I_d=\\epsilon_0\\frac{d\\Phi_E}{dt}$', '$c=1/\\sqrt{\\mu_0\\epsilon_0}$'],
    mistakes: ['负号表示反抗“磁通变化”，不是永远取负数。', '磁通量变化可以来自 $B$、面积、夹角任意一种变化。', '感应电场可以是涡旋场，不能简单套静电势差路径无关。'],
    diagram: 'induction',
    multiple: [
      { q: '法拉第定律中的负号体现什么？', options: ['库仑定律', '楞次定律/能量守恒', '欧姆定律', '高斯定理'], answer: 1, explain: '感应电流方向总是反抗引起它的磁通变化。' },
      { q: '矩形线圈匀速进入匀强磁场时，进入阶段感应电动势大小为？', options: ['$Blv$', '$BAv$', '$B/lv$', '0'], answer: 0, explain: '有效切割磁感线的边长为 $l$，所以 $|\\epsilon|=Blv$。' }
    ],
    blanks: [
      { prompt: '磁通量定义：$\\Phi_B=$', answer: '$\\int\\vec B\\cdot d\\vec A$' },
      { prompt: '位移电流：$I_d=$', answer: '$\\epsilon_0 d\\Phi_E/dt$' }
    ],
    application: { title: '线圈进入磁场', prompt: '矩形线圈以速度 $v$ 进入垂直纸面的匀强磁场 $B$，有效边长为 $l$。求进入阶段感应电动势并判断方向。', answer: '$|\\epsilon|=Blv$；方向用楞次定律判断：若进入使入纸面磁通增加，感应电流产生出纸面磁场来反抗增加。' }
  }
];

const formulas = chapters.flatMap(ch => ch.formulas.map(f => [ch.title, f, '见章节工作台中的适用场景。', ch.mistakes[0]])).concat([
  ['相对论质能关系', '$E=mc^2$', '质量与能量等价，核反应质量亏损对应能量释放。', '不要简单理解为“质量凭空消失”。'],
  ['薛定谔方程', '$-\\frac{\\hbar^2}{2m}\\nabla^2\\Psi+U\\Psi=i\\hbar\\frac{\\partial\\Psi}{\\partial t}$', '非相对论量子系统的波函数演化。', '$|\\Psi|^2$ 才对应概率密度。']
]);

const quiz = chapters.map(ch => ch.multiple[0]);
quiz.push({ q: '量子力学中通常有直接物理意义的是？', options: ['$\\Psi$', '$|\\Psi|^2$', '$\\nabla\\Psi$', '$1/\\Psi$'], answer: 1, explain: '$|\\Psi|^2$ 表示概率密度，这是考试常见概念点。' });

let activeChapter = 0;
let exerciseData = [];
let exerciseFiltered = [];
let exerciseVisible = 40;

function diagramSvg(type) {
  const common = '<svg class="diagram" viewBox="0 0 520 300" role="img" aria-label="应用示意图"><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="currentColor"/></marker></defs>';
  if (type === 'gauss') return `${common}<circle cx="260" cy="150" r="90" class="dash"/><circle cx="260" cy="150" r="12" class="charge"/><text x="278" y="156">+Q</text><line x1="260" y1="150" x2="390" y2="150" class="arrow"/><line x1="260" y1="150" x2="260" y2="42" class="arrow"/><line x1="260" y1="150" x2="150" y2="218" class="arrow"/><text x="315" y="138">E(r)</text><text x="162" y="270">球形高斯面：E 在面上等大并沿法向</text></svg>`;
  if (type === 'capacitor') return `${common}<rect x="160" y="70" width="210" height="18" class="plate"/><rect x="160" y="215" width="210" height="18" class="plate"/><rect x="195" y="105" width="140" height="88" class="dielectric"/><text x="245" y="157">εr</text><line x1="120" y1="78" x2="120" y2="215" class="arrow teal"/><text x="90" y="152">E</text><text x="380" y="85">+Q</text><text x="380" y="232">-Q</text><text x="145" y="270">电池保持 V 不变：C 增大，Q 增大</text></svg>`;
  if (type === 'wire') return `${common}<line x1="260" y1="45" x2="260" y2="235" class="wire arrow"/><circle cx="260" cy="150" r="92" class="dash"/><path d="M260 58 A92 92 0 0 1 352 150" class="curve"/><line x1="260" y1="150" x2="352" y2="150" class="radius"/><text x="277" y="78">I</text><text x="302" y="140">r</text><text x="118" y="270">拇指沿电流，四指环绕方向为 B</text></svg>`;
  return `${common}<rect x="290" y="55" width="160" height="190" class="field"/><text x="328" y="42">B 入纸面</text><g class="cross"><text x="325" y="105">×</text><text x="385" y="105">×</text><text x="325" y="170">×</text><text x="385" y="170">×</text><text x="325" y="235">×</text><text x="385" y="235">×</text></g><rect x="105" y="112" width="130" height="86" class="loop"/><line x1="68" y1="155" x2="180" y2="155" class="arrow"/><text x="112" y="143">v</text><text x="140" y="270">进入阶段磁通量变化，产生感应电动势</text></svg>`;
}

function listItems(items) {
  return items.map(item => `<li>${item}</li>`).join('');
}

function renderTabs() {
  document.querySelector('#chapterTabs').innerHTML = chapters.map((ch, i) => `<button class="chapter-tab ${i === activeChapter ? 'active' : ''}" type="button" role="tab" aria-selected="${i === activeChapter}" data-chapter="${i}"><span>${ch.number}</span>${ch.title}</button>`).join('');
}

function renderChapter() {
  const ch = chapters[activeChapter];
  document.querySelector('#chapterPanel').innerHTML = `
    <article class="note-board">
      <div class="board-header"><span>CH ${ch.number}</span><h3>${ch.title}</h3><a href="${ch.source}">${ch.sourceLabel}</a></div>
      <p class="chapter-summary">${ch.summary}</p>
      <div class="note-grid">
        <section><h4>核心概念</h4><ul>${listItems(ch.concepts)}</ul></section>
        <section><h4>必背公式</h4><ul class="formula-list">${listItems(ch.formulas)}</ul></section>
        <section><h4>易错提醒</h4><ul>${listItems(ch.mistakes)}</ul></section>
      </div>
    </article>
    <article class="practice-board">
      <div class="practice-column"><h4>选择题</h4>${ch.multiple.map((q, i) => renderChoice(q, i)).join('')}</div>
      <div class="practice-column"><h4>填空题</h4>${ch.blanks.map((q, i) => renderBlank(q, i)).join('')}</div>
      <div class="application-card"><h4>应用图题：${ch.application.title}</h4>${diagramSvg(ch.diagram)}<p>${ch.application.prompt}</p><button class="reveal-app" type="button">显示解题思路</button><div class="app-answer">${ch.application.answer}</div></div>
    </article>`;
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
}

function renderChoice(item, i) {
  return `<div class="mini-quiz" data-kind="chapter-choice" data-answer="${item.answer}"><p>${i + 1}. ${item.q}</p><div class="options">${item.options.map((op, index) => `<button class="option" type="button" data-option="${index}">${op}</button>`).join('')}</div><div class="explain">${item.explain}</div></div>`;
}

function renderBlank(item, i) {
  return `<div class="blank-card"><label>${i + 1}. ${item.prompt}<input type="text" placeholder="先自己写，再点看答案" /></label><button class="show-blank" type="button">看答案</button><div class="blank-answer">${item.answer}</div></div>`;
}

function renderFormulas(filter = '') {
  const keyword = filter.trim().toLowerCase();
  const rows = formulas.filter(row => row.join(' ').toLowerCase().includes(keyword));
  document.querySelector('#formulaRows').innerHTML = rows.map(row => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`).join('');
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
}

function renderQuiz() {
  document.querySelector('#quizList').innerHTML = quiz.map((item, index) => `<article class="quiz-card" data-kind="mock" data-index="${index}" data-answer="${item.answer}"><h3>${index + 1}. ${item.q}</h3><div class="options">${item.options.map((option, optionIndex) => `<button class="option" type="button" data-option="${optionIndex}">${option}</button>`).join('')}</div><p class="explain">${item.explain}</p></article>`).join('');
  document.querySelector('#scoreText').textContent = `0 / ${quiz.length}`;
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
}

function updateScore() {
  const correct = document.querySelectorAll('.quiz-card[data-correct="true"]').length;
  document.querySelector('#scoreText').textContent = `${correct} / ${quiz.length}`;
}

function renderExercises() {
  const list = document.querySelector('#exerciseList');
  const meta = document.querySelector('#exerciseMeta');
  const loadMore = document.querySelector('#loadMoreExercises');
  if (!list || !meta || !loadMore) return;
  const visible = exerciseFiltered.slice(0, exerciseVisible);
  list.innerHTML = visible.map(item => `<article class="exercise-item"><h4>${item.id} · Section ${item.section || '--'} · p.${item.page}</h4><p>${item.text}</p></article>`).join('');
  meta.textContent = `共 ${exerciseData.length} 题，当前匹配 ${exerciseFiltered.length} 题，已显示 ${visible.length} 题`;
  loadMore.style.display = exerciseVisible >= exerciseFiltered.length ? 'none' : 'inline-flex';
}

function filterExercises() {
  const keyword = document.querySelector('#exerciseSearch')?.value.trim().toLowerCase() || '';
  const section = document.querySelector('#exerciseSection')?.value.trim().toLowerCase() || '';
  exerciseFiltered = exerciseData.filter(item => {
    const okKeyword = !keyword || `${item.id} ${item.text}`.toLowerCase().includes(keyword);
    const okSection = !section || String(item.section || '').toLowerCase().includes(section) || item.id.toLowerCase().startsWith(section);
    return okKeyword && okSection;
  });
  exerciseVisible = 40;
  renderExercises();
}

async function initExerciseBank() {
  const meta = document.querySelector('#exerciseMeta');
  try {
    const res = await fetch('./assets/pdfs/exercise_questions_parsed.json');
    if (!res.ok) throw new Error('load failed');
    const data = await res.json();
    exerciseData = Array.isArray(data.questions) ? data.questions : [];
    exerciseFiltered = exerciseData;
    renderExercises();
  } catch (error) {
    if (meta) meta.textContent = '题库加载失败：请确认 exercise_questions_parsed.json 存在。';
  }
}

document.addEventListener('click', event => {
  const tab = event.target.closest('.chapter-tab');
  if (tab) {
    activeChapter = Number(tab.dataset.chapter);
    renderTabs();
    renderChapter();
    return;
  }
  const option = event.target.closest('.option');
  if (option) {
    const card = option.closest('[data-answer]');
    if (card.classList.contains('answered')) return;
    const chosen = Number(option.dataset.option);
    const correct = Number(card.dataset.answer);
    card.classList.add('answered');
    card.dataset.correct = String(chosen === correct);
    [...card.querySelectorAll('.option')].forEach((button, index) => {
      if (index === correct) button.classList.add('correct');
      if (index === chosen && chosen !== correct) button.classList.add('wrong');
    });
    if (card.dataset.kind === 'mock') updateScore();
    return;
  }
  const blank = event.target.closest('.show-blank');
  if (blank) {
    blank.closest('.blank-card').classList.add('revealed');
    if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
    return;
  }
  const app = event.target.closest('.reveal-app');
  if (app) {
    app.closest('.application-card').classList.toggle('revealed');
    app.textContent = app.closest('.application-card').classList.contains('revealed') ? '隐藏解题思路' : '显示解题思路';
    if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
    return;
  }
});

document.querySelector('#resetQuiz').addEventListener('click', renderQuiz);
document.querySelector('#formulaSearch').addEventListener('input', event => renderFormulas(event.target.value));
document.querySelector('#exerciseSearch')?.addEventListener('input', filterExercises);
document.querySelector('#exerciseSection')?.addEventListener('input', filterExercises);
document.querySelector('#loadMoreExercises')?.addEventListener('click', () => {
  exerciseVisible += 40;
  renderExercises();
});

renderTabs();
renderChapter();
renderFormulas();
renderQuiz();
initExerciseBank();
