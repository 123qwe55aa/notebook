const chapters = [
  {
    id: 'electrostatic',
    number: '09',
    title: '静电场',
    source: './assets/origin/第9章 静电场.pdf',
    sourceLabel: '第9章 PDF',
    summary: '静电场从最基础的电荷相互作用开始：库仑定律给出两个点电荷之间的力，电场强度描述空间中任意位置的受力情况。对于连续带电体通过叠加原理积分求场强；高对称系统则用高斯定理快捷求解。本章需要掌握的核心能力：判断对称性选择合适的高斯面，在不同带电体系（点电荷、球壳、无限长线、无限大平面）之间流畅切换。',
    concepts: [
      '库仑定律是静电学的基石：真空中两个静止点电荷之间的相互作用力大小与电荷量乘积成正比、与距离平方成反比，方向沿连线。$F = k\\frac{|q_1q_2|}{r^2}$，其中 $k = 1/(4\\pi\\epsilon_0) \\approx 8.99\\times10^9\\,\\text{N·m}^2/\\text{C}^2$。注意与万有引力形式相同但来源不同。',
      '电场强度 $\\vec E$ 的定义是检验电荷 $q_0$ 在电场中受到的力与其电荷量之比：$\\vec E = \\vec F / q_0$。电场是"空间属性"，与放入其中的检验电荷无关——你放不放电荷，电场就在那里。单位 N/C 或 V/m。',
      '叠加原理是处理多个电荷的关键：合场强等于各电荷单独产生的场强的矢量和。$\\vec E = \\sum_i \\vec E_i$。对于连续电荷分布，矢量求和变成积分。考试常考模型：电偶极子中垂线上的场强、均匀带电圆弧圆心处的场强。',
      '电场线（电力线）从正电荷出发、终止于负电荷；密度正比于场强大小；电场线不相交。注意电场线不是真实物理实体，只是几何辅助工具。',
      '电通量 $\\Phi_E$ 衡量电场"穿过"曲面的多少：$\\Phi_E = \\int \\vec E \\cdot d\\vec A$。闭合曲面的面元外法向为正，通量可正可零可负。理解电通量是理解高斯定理的必经之路。',
      '高斯定理：$\\oint \\vec E \\cdot d\\vec A = Q_{enc} / \\epsilon_0$，即闭合曲面的净电通量等于内部净电荷除以 $\\epsilon_0$。通量只与内部电荷有关，但电场 $\\vec E$ 是内外部所有电荷共同产生的总场。',
      '只有三种对称性能直接用高斯定理求场强：球对称（点电荷、均匀带电球壳/球体）、柱对称（无限长均匀带电直线、无限长圆柱）、平面对称（无限大均匀带电平面）。构造高斯面使得 $E$ 大小相等，将 $E \\cdot A = Q_{enc}/\\epsilon_0$ 解出 $E$。',
      '电势 $V$ 是标量：$V_B - V_A = -\\int_A^B \\vec E \\cdot d\\vec l$，即从 A 到 B 移动单位正电荷电场力做功的负值。电势是标量，叠加只需代数和。',
      '电场强度与电势的微分关系：$\\vec E = -\\nabla V$，即电场沿着电势下降最快的方向。直角坐标系 $E_x = -\\partial V/\\partial x$，已知电势分布求场强就是求梯度。',
      '电容器储能：$U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C}$。平行板电容器 $C = \\epsilon_0 A / d$，插入电介质后 $C\' = \\epsilon_r C$ 增大 $\\epsilon_r$ 倍。'
    ],
    formulas: [
      '$F = \\frac{1}{4\\pi\\epsilon_0}\\frac{|q_1q_2|}{r^2}$ — 库仑定律，适用于点电荷之间的静电力',
      '$\\vec E = \\frac{\\vec F}{q_0}$ — 电场强度定义式',
      '$\\vec E = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r^2}\\hat r$ — 点电荷的场强公式',
      '$\\Phi_E = \\int \\vec E \\cdot d\\vec A$ — 电通量定义，注意面元方向',
      '$\\oint \\vec E \\cdot d\\vec A = \\frac{Q_{enc}}{\\epsilon_0}$ — 高斯定理，静电场核心方程',
      '$\\oint \\vec E \\cdot d\\vec l = 0$ — 环流定理：静电场是保守场',
      '$V_B - V_A = -\\int_A^B \\vec E \\cdot d\\vec l$ — 电势差定义',
      '$V = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}$ — 点电荷电势（无穷远为零势点）',
      '$\\vec E = -\\nabla V$ — 电场与电势的微分关系',
      '$C = \\epsilon_0 \\frac{A}{d}$ — 平行板电容器电容，插入介质后 $C$ 变为 $\\epsilon_r C$',
      '$U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C}$ — 电容器储能公式',
      '$E = \\frac{\\sigma}{\\epsilon_0}$ — 无限大带电平面附近场强，与距离无关'
    ],
    mistakes: [
      '通量为 0 不代表处处 $E=0$。通量是面元积分，正负可以抵消。',
      '$Q_{enc}$ 只数高斯面内部净电荷；但 $\\vec E$ 是总电场（内外电荷共同产生）。',
      '高斯面是人为选的数学曲面，不一定是真实物体表面。选择原则：要么 $E$ 处处垂直于面元，要么处处平行于面元。',
      '无限大均匀带电平面用高斯定理时，两侧都有电场，不要只算一侧。',
      '点电荷在均匀带电球壳内部 $E=0$ 但电势不为零——$V$ 为常数等于球壳表面电势。',
      '$k=1/(4\\pi\\epsilon_0)$ 和 $\\epsilon_0$ 不要搞混。考试有时给 $k$ 有时给 $\\epsilon_0$。',
      '叠加原理注意方向矢量合成，不能直接代数和。',
      '球对称选同心球面，柱对称选共轴圆柱面，平面对称选穿平面的柱形高斯面。'
    ],
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
    summary: '稳恒磁场的核心逻辑链：运动电荷（电流）产生磁场 → 磁场又对运动电荷（电流）施力。方向判断是高频考点。本章从毕奥-萨伐尔定律计算磁场分布，用安培环路定理处理高对称模型，再讨论洛伦兹力和安培力的应用。学好本章的关键：手特别熟右手螺旋定则和叉乘方向。',
    concepts: [
      '磁感应强度 $\\vec B$ 描述磁场，单位特斯拉（T）或高斯（G，$1\\,\\text{T} = 10^4\\,\\text{G}$）。磁场只对运动电荷有作用（静电荷不受磁场力）。$\\vec B$ 方向定义为磁场线方向（北极针指向）。',
      '毕奥-萨伐尔定律是计算磁场的基本工具：$d\\vec B = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec l \\times \\hat r}{r^2}$。方向由 $d\\vec l \\times \\hat r$ 叉乘决定，右手四指从电流方向弯向径矢方向，拇指即磁场方向。',
      '长直载流导线周围磁场：$B = \\frac{\\mu_0 I}{2\\pi r}$，方向右手螺旋定则（拇指电流方向，四指弯曲即磁场环绕方向）。与距离 $r$ 成反比，不同于点电荷电场的 $1/r^2$。',
      '安培环路定理：$\\oint \\vec B \\cdot d\\vec l = \\mu_0 I_{enc}$，磁场环流等于穿过环路的净电流乘以 $\\mu_0$。$I_{enc}$ 要带正负号。应用要求高对称性。',
      '安培环路适合四种模型：无限长直导线、长直螺线管（管内 $B = \\mu_0 n I$）、环形螺线管、无限大均匀电流面。选安培环路使 $B$ 在环路上为常数。',
      '洛伦兹力 $\\vec F = q\\vec v \\times \\vec B$：力方向永远垂直于速度-磁场平面，因此不做功（只改变方向，不改变速率）。垂直进入匀强磁场做匀速圆周运动，回旋半径 $r = mv/(qB)$，周期 $T = 2\\pi m/(qB)$ 与速度无关。',
      '霍尔效应：载流导体上加垂直磁场，运动电荷受洛伦兹力偏转，在两侧积累电荷形成横向电势差。霍尔电压 $V_H = \\frac{IB}{nqd}$。可判断半导体是 N 型（电子）还是 P 型（空穴）导电。',
      '安培力 $\\vec F = I\\vec l \\times \\vec B$ 是磁场对载流导线的作用力。平行载流导线：同向电流相吸，反向相斥。单位长度力 $F/l = \\mu_0 I_1 I_2 / (2\\pi d)$。',
      '磁矩 $\\vec m = I\\vec A$ 描述载流线圈的磁性质。在均匀磁场中受力矩 $\\vec\\tau = \\vec m \\times \\vec B$，使线圈转向磁场方向。',
      '电场 vs 磁场对比：① 电场产生于电荷（静态），磁场产生于运动电荷（电流）；② 电场线有源有汇，磁场线闭合无头无尾；③ 电场力平行于场方向，磁场力垂直于速度和场方向；④ 电场力做功，磁场力不做功。'
    ],
    formulas: [
      '$\\vec F = q\\vec v \\times \\vec B$ — 洛伦兹力，方向右手定则',
      '$\\vec F = I\\vec l \\times \\vec B$ — 安培力，载流导线受力',
      '$d\\vec B = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec l \\times \\hat r}{r^2}$ — 毕奥-萨伐尔定律',
      '$B = \\frac{\\mu_0 I}{2\\pi r}$ — 无限长直导线磁场，与 r 成反比',
      '$\\oint \\vec B \\cdot d\\vec l = \\mu_0 I_{enc}$ — 安培环路定理',
      '$B = \\mu_0 n I$ — 长直螺线管内部均匀磁场',
      '$r = \\frac{mv}{qB}$ — 回旋半径',
      '$T = \\frac{2\\pi m}{qB}$ — 回旋周期，与速度无关',
      '$\\vec\\tau = \\vec m \\times \\vec B$ — 载流线圈受的力矩',
      '$V_H = \\frac{IB}{nqd}$ — 霍尔电压'
    ],
    mistakes: [
      '负电荷受力方向与右手定则给出的正电荷方向相反。对电子用 $\\vec F = q\\vec v \\times \\vec B$，$q$ 为负则力方向反转。',
      '磁力方向永远垂直于 $\\vec v$ 和 $\\vec B$ 构成的平面。做题检查垂直性。',
      '$I_{enc}$ 是穿过环路的净电流，要带方向符号（与路径右手定则同向为正）。',
      '安培环路定理中 $\\vec B$ 来自所有电流（不只是环路内的），但积分仅与 $I_{enc}$ 有关。',
      '洛伦兹力不做功！磁场只能改变带电粒子的运动方向，不能改变速度大小。',
      '右手定则多个版本：洛伦兹用力方向法，磁场方向螺旋法，别搞混。',
      '长直螺线管 $n$ 是单位长度匝数，不是总匝数。管内 $B$ 与长度无关。',
      '无限长导线模型不适用于有限长导线或靠近端点的位置。'
    ],
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
    summary: '变化电磁场是电磁学的核心集成章：法拉第定律揭示磁生电，位移电流揭示电生磁的对称补充。麦克斯韦方程组至此完整。本章要掌握：不同情况下的感应电动势计算（法拉第定律）、方向判断（楞次定律）、自感与互感、麦克斯韦方程组的物理含义。',
    concepts: [
      '磁通量 $\\Phi_B = \\int \\vec B \\cdot d\\vec A$ 的三种变化来源：① $B$ 随时间变化；② 回路面积变化（线圈伸缩）；③ 回路转动（投影面积变化）。考试快速识别是哪一种。',
      '法拉第定律：$\\epsilon = -N d\\Phi_B/dt$。负号来自楞次定律。注意是磁通量的变化率，不是磁通量本身——磁通量很大但不变就没有感应电动势。',
      '楞次定律：感应电流产生的磁场总是反抗引起它的磁通变化。"磁通增加时感应电流产生反方向磁场，减小时感应电流产生同方向磁场"。这是能量守恒的体现。',
      '动生电动势 $\\epsilon = Blv$（$B \\perp l \\perp v$ 时）。本质洛伦兹力驱动电子沿导体运动。常见模型：直导线切割磁感线、旋转导体棒、磁场中转动的矩形线圈。',
      '感生电动势由变化磁场本身产生，不需要导体运动。涡旋电场 $\\vec E_{ind}$ 满足 $\\oint \\vec E_{ind} \\cdot d\\vec l = -d\\Phi_B/dt$。与静电场本质区别：环流可以不为零，是非保守场。',
      '自感：$\\epsilon_L = -L dI/dt$。长直螺线管 $L = \\mu_0 n^2 V$。电流不能突变——RL 电路中电流渐近变化。',
      '互感：$\\epsilon_2 = -M dI_1/dt$，$M_{12} = M_{21}$。变压器基于互感原理。',
      '位移电流 $I_d = \\epsilon_0 d\\Phi_E/dt$ 是麦克斯韦最大贡献。使安培环路定理在电容器充放电时仍然成立。不是真实电荷流动，而是电场变化率的等效效应。',
      '麦克斯韦方程组四大方程：高斯定理（电）— 电荷产生电场；高斯定理（磁）— 无磁单极；法拉第定律 — 变化磁场产生电场；安培-麦克斯韦定律 — 电流和变化电场产生磁场。后两条蕴含电磁波。',
      '电磁波：同频率同相位的交变电磁场互相垂直且垂直于传播方向（横波）。$c = 1/\\sqrt{\\mu_0\\epsilon_0} \\approx 3\\times10^8\\,\\text{m/s}$。$\\vec E \\times \\vec B$ 指向传播方向。'
    ],
    formulas: [
      '$\\Phi_B = \\int \\vec B \\cdot d\\vec A$ — 磁通量定义',
      '$\\epsilon = -N \\frac{d\\Phi_B}{dt}$ — 法拉第定律（通用形式）',
      '$\\epsilon = Blv$ — 动生电动势（$B\\perp l\\perp v$ 时）',
      '$\\epsilon_L = -L \\frac{dI}{dt}$ — 自感电动势',
      '$L = \\mu_0 n^2 V$ — 长直螺线管自感系数',
      '$\\epsilon_2 = -M \\frac{dI_1}{dt}$ — 互感电动势',
      '$I_d = \\epsilon_0 \\frac{d\\Phi_E}{dt}$ — 位移电流',
      '$c = \\frac{1}{\\sqrt{\\mu_0\\epsilon_0}}$ — 真空中光速',
      '$\\vec E \\times \\vec B \\parallel \\vec k$ — 电磁波传播方向'
    ],
    mistakes: [
      '负号表示反抗"磁通变化"，不是永远取负数。一般先算大小再用楞次定律判断方向。',
      '磁通量变化可以来自 $B$、面积、夹角任意一种变化。有时两种同时发生。',
      '感应电场是涡旋场，不能套静电场的路径无关特性。',
      '动生电动势 $Blv$ 要求 $B \\perp l \\perp v$，不垂直时取有效分量。',
      '自感线圈电流不能突变，但电流变化率可以突变。$t=0$ 时 $I=0$ 但 $dI/dt$ 可以很大。',
      '位移电流方向与电场变化方向相同（$\\epsilon_0 d\\vec E/dt$），不是与电场方向相同。',
      '互感系数 $M$ 只取决于线圈几何结构、相对位置和磁介质，与电流无关。'
    ],
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
  const panel = document.querySelector('#chapterPanel');
  panel.classList.add('switching');
  setTimeout(() => {
    const ch = chapters[activeChapter];
    const chProgress = loadChapterProgress(activeChapter);
    const hasProgress = Object.keys(chProgress).length > 0;
    panel.innerHTML = `
    <article class="note-board">
      <div class="board-header"><span>CH ${ch.number}</span><h3>${ch.title}</h3><a href="${ch.source}">${ch.sourceLabel}</a>${hasProgress ? `<button class="reset-progress-btn" data-chapter="${activeChapter}" type="button">重置本章进度</button>` : ''}</div>
      <p class="chapter-summary">${ch.summary}</p>
      <div class="note-grid">
        <section><h4>核心概念</h4><ul>${listItems(ch.concepts)}</ul></section>
        <section><h4>必背公式</h4><ul class="formula-list">${listItems(ch.formulas)}</ul></section>
        <section><h4>易错提醒</h4><ul>${listItems(ch.mistakes)}</ul></section>
      </div>
    </article>
    <article class="practice-board">
      <div class="practice-column"><h4>选择题</h4>${ch.multiple.map((q, i) => renderChoice(q, i, activeChapter)).join('')}</div>
      <div class="practice-column"><h4>填空题</h4>${ch.blanks.map((q, i) => renderBlank(q, i)).join('')}</div>
      <div class="application-card"><h4>应用图题：${ch.application.title}</h4>${ch.diagram ? diagramSvg(ch.diagram) : ''}<p>${ch.application.prompt}</p><button class="reveal-app" type="button">显示解题思路</button><div class="app-answer">${ch.application.answer}</div></div>
    </article>`;
    // Add simulator toggle for electrostatic and magnetostatic chapters
    const toggleHtml = {
      'electrostatic': '<button class="sim-toggle-btn" data-sim="electric" type="button">🔬 电场模拟器</button><div id="electricFieldSim"></div>',
      'magnetostatic': '<button class="sim-toggle-btn" data-sim="magnetic" type="button">🧲 磁场模拟器</button><div id="magneticFieldSim"></div>'
    }[ch.id];
    if (toggleHtml) {
      panel.insertAdjacentHTML('beforeend', toggleHtml);
    }
    setTimeout(() => panel.classList.remove('switching'), 50);
    if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
  }, 120);
}

function renderChoice(item, i, chapterIndex) {
  const progress = loadChapterProgress(chapterIndex);
  const saved = progress[i];
  let markHtml = '';
  if (saved === 'correct') markHtml = '<span class="chapter-progress-mark correct">✅</span>';
  else if (saved === 'wrong') markHtml = '<span class="chapter-progress-mark wrong">❌</span>';
  return `<div class="mini-quiz" data-kind="chapter-choice" data-answer="${item.answer}" data-chapter="${chapterIndex}" data-question="${i}"><p>${i + 1}. ${item.q}${markHtml}</p><div class="options">${item.options.map((op, index) => `<button class="option" type="button" data-option="${index}">${op}</button>`).join('')}</div><div class="explain">${item.explain}</div></div>`;
}

function loadChapterProgress(chapterIndex) {
  try {
    const data = JSON.parse(localStorage.getItem('physicsPlaygroundProgress') || '{}');
    return data[String(chapterIndex)] || {};
  } catch { return {}; }
}

function saveChapterProgress(chapterIndex, questionIndex, isCorrect) {
  const data = JSON.parse(localStorage.getItem('physicsPlaygroundProgress') || '{}');
  if (!data[String(chapterIndex)]) data[String(chapterIndex)] = {};
  data[String(chapterIndex)][String(questionIndex)] = isCorrect ? 'correct' : 'wrong';
  localStorage.setItem('physicsPlaygroundProgress', JSON.stringify(data));
}

function resetChapterProgress(chapterIndex) {
  const data = JSON.parse(localStorage.getItem('physicsPlaygroundProgress') || '{}');
  delete data[String(chapterIndex)];
  localStorage.setItem('physicsPlaygroundProgress', JSON.stringify(data));
}

function updateWeakPanel() {
  const data = JSON.parse(localStorage.getItem('physicsPlaygroundProgress') || '{}');
  let totalAnswered = 0;
  let totalCorrect = 0;
  const chapterStats = chapters.map((ch, idx) => {
    const answers = data[String(idx)] || {};
    const answered = Object.keys(answers).length;
    const correct = Object.values(answers).filter(v => v === 'correct').length;
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : null;
    totalAnswered += answered;
    totalCorrect += correct;
    return { chapterIdx: idx, title: ch.title, answered, correct, accuracy };
  });

  const weakAnswered = document.getElementById('weakAnswered');
  const weakTotal = document.getElementById('weakTotal');
  const weakAccuracy = document.getElementById('weakAccuracy');
  const weakestChapter = document.getElementById('weakestChapter');
  const weakestAccuracy = document.getElementById('weakestAccuracy');
  const weakSuggestions = document.getElementById('weakSuggestions');

  if (weakAnswered) weakAnswered.textContent = totalAnswered;
  if (weakTotal) weakTotal.textContent = `/ ${chapters.reduce((s, ch) => s + ch.multiple.length, 0)} 题`;
  if (weakAccuracy) weakAccuracy.textContent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : '--';

  const answeredChapters = chapterStats.filter(s => s.answered > 0);
  let weakest = null;
  if (answeredChapters.length > 0) {
    weakest = answeredChapters.reduce((min, s) => (s.accuracy < min.accuracy ? s : min), answeredChapters[0]);
  }

  if (weakestChapter) {
    weakestChapter.textContent = weakest ? weakest.title : '--';
  }
  if (weakestAccuracy) {
    weakestAccuracy.textContent = weakest ? `${weakest.accuracy}% 正确率` : '';
  }

  if (weakSuggestions) {
    if (totalAnswered === 0) {
      weakSuggestions.innerHTML = '<p>开始答题后将自动生成复习建议。</p>';
    } else if (weakest) {
      const weakCh = chapters[weakest.chapterIdx];
      const concepts = weakCh.concepts.slice(0, 3);
      const mistakes = weakCh.mistakes.slice(0, 2);
      let html = `<p><strong>${weakest.title}</strong> 是薄弱环节（${weakest.accuracy}% 正确率）。建议复习：</p><ul>`;
      concepts.forEach(c => { html += `<li>${c.replace(/\$\$|\$/g, '')}</li>`; });
      mistakes.forEach(m => { html += `<li>⚠ ${m.replace(/\$\$|\$/g, '')}</li>`; });
      html += '</ul>';
      weakSuggestions.innerHTML = html;
      if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
    } else {
      weakSuggestions.innerHTML = '<p>继续练习以获取更精确的分析。</p>';
    }
  }
}

// ── Timed Quiz Mode ────────────────────────────────────
let timerActive = false;
let timerInterval = null;
let timerSeconds = 0;
const QUIZ_TIME_SECONDS = 15 * 60; // 15 min

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `⏱ ${m}:${String(s).padStart(2, '0')} remaining`;
}

function startTimer() {
  timerActive = true;
  timerSeconds = QUIZ_TIME_SECONDS;
  const display = document.getElementById('quizTimerDisplay');
  const scoreCard = document.querySelector('.score-card');
  if (display) display.textContent = formatTime(timerSeconds);
  if (scoreCard) scoreCard.classList.add('timer-active');

  timerInterval = setInterval(() => {
    timerSeconds--;
    if (display) {
      display.textContent = formatTime(timerSeconds);
      if (timerSeconds <= 120) {
        display.classList.add('timer-urgent');
        if (scoreCard) scoreCard.classList.add('timer-urgent');
      }
    }
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerActive = false;
      autoSubmitQuiz();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerActive = false;
  const display = document.getElementById('quizTimerDisplay');
  const scoreCard = document.querySelector('.score-card');
  if (display) {
    display.textContent = '';
    display.classList.remove('timer-urgent');
  }
  if (scoreCard) {
    scoreCard.classList.remove('timer-active');
    scoreCard.classList.remove('timer-urgent');
  }
}

function autoSubmitQuiz() {
  document.querySelectorAll('.quiz-card').forEach(card => {
    if (!card.classList.contains('answered')) {
      const options = card.querySelectorAll('.option');
      if (options.length > 0) {
        // Mark first option as wrong to trigger "answered" state without adding a correct answer
        card.classList.add('answered');
        card.dataset.correct = 'false';
        const correctIndex = Number(card.dataset.answer);
        options.forEach((btn, idx) => {
          if (idx === correctIndex) btn.classList.add('correct');
        });
      }
    }
  });
  updateScore();
  const display = document.getElementById('quizTimerDisplay');
  if (display) display.textContent = '⏱ 时间到！';
}

// ── Flashcard Mode ─────────────────────────────────────
let flashcardData = [];
let flashcardIndex = 0;
let flashcardOpen = false;

function buildFlashcardData() {
  const cards = [];
  chapters.forEach(ch => {
    // Add formulas as flashcards
    ch.formulas.forEach(f => {
      cards.push({ front: ch.title + ': 公式', back: f });
    });
    // Add concepts as flashcards
    ch.concepts.slice(0, 4).forEach(c => {
      cards.push({ front: ch.title, back: c });
    });
  });
  return cards;
}

function openFlashcard() {
  flashcardData = buildFlashcardData();
  flashcardIndex = 0;
  const viewer = document.getElementById('flashcardViewer');
  if (viewer) viewer.classList.add('active');
  flashcardOpen = true;
  showFlashcard(0);
}

function closeFlashcard() {
  const viewer = document.getElementById('flashcardViewer');
  if (viewer) viewer.classList.remove('active');
  flashcardOpen = false;
}

function showFlashcard(index) {
  if (!flashcardData.length) return;
  flashcardIndex = Math.max(0, Math.min(index, flashcardData.length - 1));
  const card = flashcardData[flashcardIndex];
  const front = document.getElementById('flashcardFront');
  const back = document.getElementById('flashcardBack');
  const counter = document.getElementById('flashcardCounter');
  const inner = document.getElementById('flashcardInner');
  if (front) front.innerHTML = card.front;
  if (back) back.innerHTML = card.back;
  if (counter) counter.textContent = `Card ${flashcardIndex + 1} / ${flashcardData.length}`;
  if (inner) inner.classList.remove('flipped');
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
}

function flipFlashcard() {
  const inner = document.getElementById('flashcardInner');
  if (inner) inner.classList.toggle('flipped');
}

function prevFlashcard() {
  if (flashcardIndex > 0) showFlashcard(flashcardIndex - 1);
}

function nextFlashcard() {
  if (flashcardIndex < flashcardData.length - 1) showFlashcard(flashcardIndex + 1);
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
    // Save progress for chapter choices
    const chapterIdx = card.dataset.chapter;
    const questionIdx = card.dataset.question;
    if (chapterIdx !== undefined && questionIdx !== undefined) {
      saveChapterProgress(Number(chapterIdx), Number(questionIdx), chosen === correct);
      updateWeakPanel();
      // Re-render to update mark
      renderChapter();
    }
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
  const resetBtn = event.target.closest('.reset-progress-btn');
  if (resetBtn) {
    const ch = Number(resetBtn.dataset.chapter);
    resetChapterProgress(ch);
    updateWeakPanel();
    renderChapter();
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
  // Flashcard controls
  const flashcardContainer = event.target.closest('#flashcardContainer');
  if (flashcardContainer) {
    flipFlashcard();
    return;
  }
  const flashcardPrev = event.target.closest('#flashcardPrev');
  if (flashcardPrev) {
    prevFlashcard();
    return;
  }
  const flashcardNext = event.target.closest('#flashcardNext');
  if (flashcardNext) {
    nextFlashcard();
    return;
  }
  // Simulator toggle
  const simBtn = event.target.closest('.sim-toggle-btn');
  if (simBtn) {
    const simType = simBtn.dataset.sim;
    const containerId = simType === 'electric' ? 'electricFieldSim' : 'magneticFieldSim';
    const container = document.getElementById(containerId);
    if (!container) return;
    const isOpen = container.style.display !== 'none' && container.innerHTML !== '';
    if (isOpen) {
      container.style.display = 'none';
      simBtn.classList.remove('active');
    } else {
      container.style.display = 'block';
      simBtn.classList.add('active');
      // Initialize if not yet done
      if (simType === 'electric' && typeof window.initElectricSim === 'function') {
        window.initElectricSim();
      } else if (simType === 'magnetic' && typeof window.initMagneticSim === 'function') {
        window.initMagneticSim();
      }
    }
    return;
  }
});

document.querySelector('#resetQuiz').addEventListener('click', () => {
  renderQuiz();
  if (timerActive) {
    stopTimer();
    const toggle = document.querySelector('#timerToggle');
    if (toggle) toggle.textContent = '⏱ 计时模式';
    startTimer();
  }
});
document.querySelector('#formulaSearch').addEventListener('input', event => renderFormulas(event.target.value));
document.querySelector('#exerciseSearch')?.addEventListener('input', filterExercises);
document.querySelector('#exerciseSection')?.addEventListener('input', filterExercises);
document.querySelector('#exerciseType')?.addEventListener('change', filterExercises);
document.querySelector('#loadMoreExercises')?.addEventListener('click', () => {
  exerciseVisible += 40;
  renderExercises();
});

// Timer toggle
document.querySelector('#timerToggle').addEventListener('click', function() {
  if (timerActive) {
    stopTimer();
    this.textContent = '⏱ 计时模式';
  } else {
    startTimer();
    this.textContent = '⏱ 停止计时';
  }
});

// Flashcard open/close
document.querySelector('#flashcardBtn').addEventListener('click', openFlashcard);
document.querySelector('#flashcardClose').addEventListener('click', closeFlashcard);

// Keyboard support for flashcards
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && flashcardOpen) {
    closeFlashcard();
    return;
  }
  if (!flashcardOpen) return;
  if (event.key === ' ' || event.key === 'Space') {
    event.preventDefault();
    flipFlashcard();
  } else if (event.key === 'ArrowLeft') {
    prevFlashcard();
  } else if (event.key === 'ArrowRight') {
    nextFlashcard();
  }
});

renderTabs();
renderChapter();
renderFormulas();
renderQuiz();
initExerciseBank();
updateWeakPanel();

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
    const el = document.createElement('video');
    el.src = url; el.controls = true; el.autoplay = true; el.playsinline = true;
    el.style.objectFit = 'contain';
    embedBody.appendChild(el);
  } else if (type === 'audio') {
    const el = document.createElement('audio');
    el.src = url; el.controls = true; el.autoplay = true;
    el.style.width = '100%';
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
