const chapters = [
  {
    id: 'electrostatic',
    number: '09',
    title: '静电场',
    source: './assets/origin/第9章 静电场.pdf',
    sourceLabel: '第9章 PDF',
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
    application: { title: '球壳的高斯面', prompt: '半径 $R$ 的均匀带电薄球壳，总电荷 $Q$。分别求 $r\\lt R$ 与 $r\\gt R$ 的电场强度。', answer: '$r\\lt R$ 时 $Q_{enc}=0$，所以 $E=0$；$r\\gt R$ 时等效为中心点电荷，$E=\\frac{1}{4\\pi\\epsilon_0}\\frac{Q}{r^2}$。' }
  },
  {
    id: 'magnetostatic',
    number: '10',
    title: '稳恒磁场',
    source: './assets/origin/第10章 稳恒磁场.pdf',
    sourceLabel: '第10章 PDF',
    summary: '稳恒磁场的核心是"运动电荷/电流产生磁场，磁场又对运动电荷/电流施力"。方向判断是高频考点。',
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
    number: '11',
    title: '变换的电磁场',
    source: './assets/origin/第11章 变换的电磁场.pdf',
    sourceLabel: '第11章 PDF',
    summary: '变化电磁场的核心是"磁通量变化产生感应电动势"，再通过位移电流把变化电场也纳入磁场来源。',
    concepts: ['磁通量 $\\Phi_B$ 衡量磁场穿过面积的多少。', '法拉第定律给出感应电动势大小，楞次定律给出方向。', '感应电场不是静电场，其闭合环路积分可以不为零。', '位移电流说明变化电场也能激发磁场，是电磁波理论的关键补充。'],
    formulas: ['$\\Phi_B=\\int\\vec B\\cdot d\\vec A$', '$\\epsilon=-N\\frac{d\\Phi_B}{dt}$', '$\\epsilon=Blv$', '$I_d=\\epsilon_0\\frac{d\\Phi_E}{dt}$', '$c=1/\\sqrt{\\mu_0\\epsilon_0}$'],
    mistakes: ['负号表示反抗"磁通变化"，不是永远取负数。', '磁通量变化可以来自 $B$、面积、夹角任意一种变化。', '感应电场可以是涡旋场，不能简单套静电势差路径无关。'],
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
  },
  {
    id: 'quantum',
    number: '15',
    title: '量子物理基础',
    source: './assets/origin/第15章 量子物理基础.pdf',
    sourceLabel: '第15章 PDF',
    summary: '量子物理从黑体辐射和光电效应出发，揭示了光与实物粒子的波粒二象性；玻尔氢原子模型、德布罗意物质波、测不准关系和薛定谔方程共同构建了非相对论量子力学的基础框架。',
    concepts: [
      '普朗克能量子假设：频率为 $\\nu$ 的谐振子能量只能取 $E_n=nh\\nu$，标志量子论的诞生。',
      '光电效应和康普顿散射证明光具有粒子性；光子能量 $\\varepsilon=h\\nu$，动量 $p=h/\\lambda$。',
      '玻尔氢原子模型：轨道角动量量子化 $L=n\\hbar$，能级 $E_n=-13.6\\,\\mathrm{eV}/n^2$，成功解释氢光谱。',
      '德布罗意把波粒二象性推广到实物粒子，物质波波长 $\\lambda=h/p$；玻恩统计解释：$|\\Psi|^2$ 为概率密度。',
      '测不准关系 $\\Delta x\\Delta p_x\\ge\\hbar/2$ 是微观粒子波粒二象性的本质限制，不是仪器误差。',
      '薛定谔方程描述非相对论量子系统；一维无限深势阱能级 $E_n=n^2\\pi^2\\hbar^2/(2ma^2)$，零点能不为零。'
    ],
    formulas: [
      '$M_B(T)=\\sigma T^4$，$\\lambda_m T=b$',
      '$\\varepsilon=h\\nu=hc/\\lambda$，$p=h/\\lambda$',
      '$h\\nu=W+\\dfrac{1}{2}mv_m^2$，$\\nu_0=W/h$',
      '$\\Delta\\lambda=\\dfrac{h}{m_0c}(1-\\cos\\varphi)=2\\lambda_C\\sin^2\\dfrac{\\varphi}{2}$',
      '$E_n=-13.6\\,\\mathrm{eV}/n^2$，$L=n\\hbar$，$h\\nu=E_i-E_f$',
      '$\\lambda=h/p$，$\\Delta x\\Delta p_x\\ge\\hbar/2$，$E_n=n^2\\pi^2\\hbar^2/(2ma^2)$'
    ],
    mistakes: [
      '光电效应中光强增大主要增加饱和电流，不增加最大初动能；遏止电压由频率决定，与光强无关。',
      '低于红限频率时，无论光强多大都不能发生光电效应；光子没有静质量但有动量 $p=h/\\lambda$。',
      '测不准关系不是实验误差或仪器不够精密，而是量子态本身的限制。',
      '$|\\Psi|^2$ 才是概率密度，$\\Psi$ 本身通常是复函数；一维无限深势阱最低能量不为零，即零点能 $E_1>0$。'
    ],
    diagram: false,
    multiple: [
      { q: '光电效应中，保持频率不变而增大光强，主要增大的是哪一项？', options: ['最大初动能', '遏止电压', '饱和光电流', '红限频率'], answer: 2, explain: '光强增大使单位时间光子数增多，逸出电子数增多，所以饱和电流增大；最大初动能和遏止电压由频率决定，与光强无关。' },
      { q: '康普顿效应中散射光波长变长，说明光子在碰撞后：', options: ['能量增大', '能量减小', '速度小于 $c$', '静质量变大'], answer: 1, explain: '波长变长意味着频率降低，由 $\\varepsilon=h\\nu$ 可知能量减小；部分能量传给了反冲电子。' },
      { q: '德布罗意关系 $\\lambda=h/p$ 说明：', options: ['只有光具有波动性', '实物粒子也具有波动性', '宏观物体没有动量', '粒子速度一定等于光速'], answer: 1, explain: '德布罗意将波动性推广到实物粒子，物质波由此提出；宏观物体有动量，只是德布罗意波长极小，通常不可观测。' }
    ],
    blanks: [
      { prompt: '爱因斯坦光电效应方程 $h\\nu=$', answer: '$W+\\dfrac{1}{2}mv_m^2$' },
      { prompt: '氢原子能级公式 $E_n=$', answer: '$-13.6\\,\\mathrm{eV}/n^2$' },
      { prompt: '测不准关系：$\\Delta x\\Delta p_x\\ge$', answer: '$\\hbar/2$' }
    ],
    application: { title: '光电效应伏安曲线分析', prompt: '两束频率相同、光强不同的光照射同一金属，画出伏安特性曲线。说明：① 两曲线遏止电压是否相同？② 饱和电流是否相同？', answer: '① 遏止电压相同：频率相同则单个光子能量 $h\\nu$ 相同，最大初动能 $E_k=h\\nu-W$ 相同，故 $eU_a=E_k$ 不变。② 饱和电流不同：光强较大时单位时间光子数更多，逸出光电子数更多，饱和电流更大。' }
  }
];

const formulas = chapters.flatMap(ch => ch.formulas.map(f => [ch.title, f, '见章节工作台中的适用场景。', ch.mistakes[0]])).concat([
  ['薛定谔方程', '$-\\frac{\\hbar^2}{2m}\\nabla^2\\Psi+U\\Psi=i\\hbar\\frac{\\partial\\Psi}{\\partial t}$', '非相对论量子系统的波函数演化。', '$|\\Psi|^2$ 才对应概率密度。']
]);

const quiz = chapters.map(ch => ch.multiple[0]);

let activeChapter = 0;
let exerciseData = [];
let exerciseFiltered = [];
let exerciseVisible = 40;
let exerciseParser = '--';

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
      <div class="application-card"><h4>应用图题：${ch.application.title}</h4>${ch.diagram ? diagramSvg(ch.diagram) : ''}<p>${ch.application.prompt}</p><button class="reveal-app" type="button">显示解题思路</button><div class="app-answer">${ch.application.answer}</div></div>
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

function getExerciseType(item) {
  if (item.id.startsWith('VP')) return 'variation';
  if (item.id.startsWith('Q')) return 'discussion';
  return 'problem';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function renderPill(value, className, fallback = '未标注') {
  const text = value === null || value === undefined || value === '' ? fallback : value;
  return `<span class="${className}">${escapeHtml(text)}</span>`;
}

function normalizeAssets(assets) {
  if (!assets) return [];
  if (Array.isArray(assets)) return assets.flatMap(asset => normalizeAssets(asset));
  if (typeof assets === 'string') return [{ href: assets, label: 'crop' }];
  if (typeof assets === 'object') {
    return [assets.crop, assets.crop_url, assets.path, assets.href, ...(Array.isArray(assets.crops) ? assets.crops : [])]
      .filter(Boolean)
      .flatMap(asset => normalizeAssets(asset));
  }
  return [];
}

function renderExerciseAssets(item) {
  const assets = normalizeAssets(item.assets).slice(0, 2);
  if (!assets.length) return '';
  return `<div class="exercise-assets">${assets.map((asset, index) => {
    const href = escapeHtml(asset.href);
    const label = escapeHtml(asset.label || `crop ${index + 1}`);
    const isImage = /\.(?:png|jpe?g|webp|gif)$/i.test(asset.href);
    if (!isImage) return `<a class="crop-link" href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
    return `<a class="crop-preview" href="${href}" target="_blank" rel="noreferrer"><img src="${href}" alt="${escapeHtml(item.id)} crop ${index + 1}" loading="lazy" /></a>`;
  }).join('')}</div>`;
}
function renderExerciseManagement() {
  const totalStat = document.querySelector('#exerciseTotalStat');
  const sectionStat = document.querySelector('#exerciseSectionStat');
  const matchStat = document.querySelector('#exerciseMatchStat');
  const parserStat = document.querySelector('#exerciseParserStat');
  const chips = document.querySelector('#exerciseChapterChips');
  if (!totalStat || !sectionStat || !matchStat || !parserStat || !chips) return;

  const sectionCounts = exerciseData.reduce((counts, item) => {
    const section = String(item.section || '--').padStart(2, '0');
    counts[section] = (counts[section] || 0) + 1;
    return counts;
  }, {});
  const activeSection = document.querySelector('#exerciseSection')?.value.trim() || '';

  totalStat.textContent = exerciseData.length;
  sectionStat.textContent = Object.keys(sectionCounts).length;
  matchStat.textContent = exerciseFiltered.length;
  parserStat.textContent = exerciseParser;
  chips.innerHTML = Object.entries(sectionCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([section, count]) => `<button class="chapter-chip ${activeSection === section ? 'active' : ''}" type="button" data-section="${section}"><span>${section}</span>${count}</button>`)
    .join('');
}

function renderExercises() {
  const list = document.querySelector('#exerciseList');
  const meta = document.querySelector('#exerciseMeta');
  const loadMore = document.querySelector('#loadMoreExercises');
  if (!list || !meta || !loadMore) return;
  const visible = exerciseFiltered.slice(0, exerciseVisible);
  list.innerHTML = visible
    .map(item => {
      const tags = (Array.isArray(item.tags) ? item.tags : []).map(tag => renderPill(tag, 'exercise-tag')).join('');
      const figures = (Array.isArray(item.figure_refs) ? item.figure_refs : []).map(ref => renderPill(ref, 'exercise-figure')).join('');
      const diff = renderPill(item.difficulty, 'exercise-difficulty');
      return `<article class="exercise-item">
        <h4>${escapeHtml(item.id)} · Section ${escapeHtml(item.section || '--')} · p.${escapeHtml(item.page ?? item.sourcePage ?? '--')}</h4>
        <dl class="exercise-fields">
          <div><dt>难度</dt><dd>${diff}</dd></div>
          <div><dt>标签</dt><dd>${tags || renderPill('', 'exercise-tag')}</dd></div>
          <div><dt>图表</dt><dd>${figures || renderPill('', 'exercise-figure')}</dd></div>
        </dl>
        <p>${escapeHtml(item.text)}</p>
        ${renderExerciseAssets(item)}
      </article>`;
    })
    .join('');
  meta.textContent = `共 ${exerciseData.length} 题，当前匹配 ${exerciseFiltered.length} 题，已显示 ${visible.length} 题`;
  loadMore.style.display = exerciseVisible >= exerciseFiltered.length ? 'none' : 'inline-flex';
  renderExerciseManagement();
}
function filterExercises() {
  const keyword = document.querySelector('#exerciseSearch')?.value.trim().toLowerCase() || '';
  const section = document.querySelector('#exerciseSection')?.value.trim().toLowerCase() || '';
  const type = document.querySelector('#exerciseType')?.value || 'all';
  exerciseFiltered = exerciseData.filter(item => {
    const okKeyword = !keyword || `${item.id} ${item.text}`.toLowerCase().includes(keyword);
    const okSection = !section || String(item.section || '').toLowerCase().includes(section) || item.id.toLowerCase().startsWith(section);
    const okType = type === 'all' || getExerciseType(item) === type;
    return okKeyword && okSection && okType;
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
    exerciseData = Array.isArray(data?.questions) ? data.questions : (Array.isArray(data) ? data : []);
    exerciseParser = data?.parser || '--';
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
  const chip = event.target.closest('.chapter-chip');
  if (chip) {
    const input = document.querySelector('#exerciseSection');
    if (input) input.value = input.value === chip.dataset.section ? '' : chip.dataset.section;
    filterExercises();
    return;
  }
  const resetExercises = event.target.closest('#resetExerciseFilters');
  if (resetExercises) {
    document.querySelector('#exerciseSearch').value = '';
    document.querySelector('#exerciseSection').value = '';
    document.querySelector('#exerciseType').value = 'all';
    filterExercises();
  }
});

document.querySelector('#resetQuiz').addEventListener('click', renderQuiz);
document.querySelector('#formulaSearch').addEventListener('input', event => renderFormulas(event.target.value));
document.querySelector('#exerciseSearch')?.addEventListener('input', filterExercises);
document.querySelector('#exerciseSection')?.addEventListener('input', filterExercises);
document.querySelector('#exerciseType')?.addEventListener('change', filterExercises);
document.querySelector('#loadMoreExercises')?.addEventListener('click', () => {
  exerciseVisible += 40;
  renderExercises();
});

renderTabs();
renderChapter();
renderFormulas();
renderQuiz();
initExerciseBank();

function initExamCountdown() {
  const root = document.querySelector('#examCountdown');
  if (!root) return;
  const targetRaw = root.getAttribute('data-target') || '';
  const targetMs = Date.parse(targetRaw);
  if (!Number.isFinite(targetMs)) return;

  const daysEl = document.querySelector('#cdDays');
  const hoursEl = document.querySelector('#cdHours');
  const minutesEl = document.querySelector('#cdMinutes');
  const secondsEl = document.querySelector('#cdSeconds');
  const statusEl = document.querySelector('#cdStatus');

  const pad2 = value => String(value).padStart(2, '0');

  let timer = null;
  const tick = () => {
    const diffMs = targetMs - Date.now();
    if (diffMs <= 0) {
      if (daysEl) daysEl.textContent = '0';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      if (statusEl) statusEl.textContent = '已开考：稳住节奏，先拿稳基础题。';
      if (timer) clearInterval(timer);
      timer = null;
      return;
    }
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = pad2(hours);
    if (minutesEl) minutesEl.textContent = pad2(minutes);
    if (secondsEl) secondsEl.textContent = pad2(seconds);
  };

  tick();
  timer = setInterval(tick, 1000);
}

// ── Source tabs ─────────────────────────────────────────
const tabs = document.querySelectorAll('.source-tab');
const panels = document.querySelectorAll('.source-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.hidden = true);
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('panel-' + tab.dataset.source);
    panel.hidden = false;
    panel.classList.add('active');
  });
});

// ── Embed viewer ───────────────────────────────────────
const viewer = document.getElementById('embedViewer');
const overlay = document.getElementById('embedOverlay');
const embedBody = document.getElementById('embedBody');
const embedTitle = document.getElementById('embedTitle');

function openEmbed(url, type, name) {
  embedBody.innerHTML = '';
  embedTitle.textContent = name || url.split('/').pop();
  if (type === 'iframe') {
    const el = document.createElement('iframe');
    el.src = url;
    embedBody.appendChild(el);
  } else if (type === 'video') {
    const id = url.match(/[?&]id=([^&]+)/)?.[1] || url.split('/').pop();
    const el = document.createElement('iframe');
    el.src = `https://drive.google.com/file/d/${id}/preview`;
    el.allow = 'autoplay';
    embedBody.appendChild(el);
  } else if (type === 'audio') {
    const id = url.match(/[?&]id=([^&]+)/)?.[1] || url.split('/').pop();
    const el = document.createElement('iframe');
    el.src = `https://drive.google.com/file/d/${id}/preview`;
    el.allow = 'autoplay';
    embedBody.appendChild(el);
  } else if (type === 'img') {
    const el = document.createElement('img');
    el.src = url;
    embedBody.appendChild(el);
  } else if (type === 'pdf') {
    const el = document.createElement('iframe');
    el.src = url;
    el.className = 'pdf-embed';
    embedBody.appendChild(el);
  }
  viewer.classList.add('active');
  overlay.classList.add('active');
}

function closeEmbed() {
  viewer.classList.remove('active');
  overlay.classList.remove('active');
  embedBody.innerHTML = '';
}

document.querySelectorAll('.embed-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    openEmbed(btn.dataset.embed, btn.dataset.type, btn.closest('.asset-item').querySelector('.asset-name').textContent.trim());
  });
});

document.getElementById('embedClose').addEventListener('click', closeEmbed);
overlay.addEventListener('click', closeEmbed);

initExamCountdown();
