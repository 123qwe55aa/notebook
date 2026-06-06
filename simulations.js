/* =================================================================
   Interactive Physics Field Simulators for notebook-gh-pages
   Electric Field Visualizer + Magnetic Field Visualizer
   Plain Canvas JS — no dependencies, works on GitHub Pages
   ================================================================= */

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // Constants
  // ──────────────────────────────────────────────
  const K = 8.99e9;          // Coulomb constant (scaled)
  const MU0 = 4 * Math.PI * 1e-7; // permeability (scaled visual)
  const CANVAS_W = 520;
  const CANVAS_H = 400;
  const ARROW_LEN = 8;

  // ──────────────────────────────────────────────
  // 1. ELECTRIC FIELD SIMULATOR
  // ──────────────────────────────────────────────

  function ElectricFieldSimulator(containerId) {
    this.container = document.getElementById(containerId);
    this.charges = [];
    this.showEquipotentials = true;
    this.dragIndex = -1;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.animId = null;
    this.init();
  }

  ElectricFieldSimulator.prototype.init = function () {
    const self = this;

    // Build HTML structure
    this.container.innerHTML = `
      <div class="sim-panel dark-card">
        <div class="sim-header">
          <span class="sim-title">⚡ 电场线模拟</span>
          <span class="sim-hint">拖曳电荷查看电场线</span>
        </div>
        <div class="sim-toolbar">
          <button class="sim-btn btn-add-pos" type="button">+Q 正电荷</button>
          <button class="sim-btn btn-add-neg" type="button">−Q 负电荷</button>
          <button class="sim-btn btn-clear" type="button">清除</button>
          <button class="sim-btn btn-eqp active-btn" type="button">等势线</button>
        </div>
        <canvas class="sim-canvas" width="${CANVAS_W}" height="${CANVAS_H}"></canvas>
      </div>
    `;

    this.canvas = this.container.querySelector('.sim-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Toolbar buttons
    this.container.querySelector('.btn-add-pos').addEventListener('click', function () {
      self.addCharge(CANVAS_W / 2 + (Math.random() - 0.5) * 100, CANVAS_H / 2 + (Math.random() - 0.5) * 80, 1);
    });
    this.container.querySelector('.btn-add-neg').addEventListener('click', function () {
      self.addCharge(CANVAS_W / 2 + (Math.random() - 0.5) * 100, CANVAS_H / 2 + (Math.random() - 0.5) * 80, -1);
    });
    this.container.querySelector('.btn-clear').addEventListener('click', function () {
      self.charges = [];
      self.draw();
    });
    this.container.querySelector('.btn-eqp').addEventListener('click', function () {
      self.showEquipotentials = !self.showEquipotentials;
      this.classList.toggle('active-btn');
      self.draw();
    });

    // Mouse events
    this.canvas.addEventListener('mousedown', function (e) { self.onMouseDown(e); });
    this.canvas.addEventListener('mousemove', function (e) { self.onMouseMove(e); });
    this.canvas.addEventListener('mouseup', function () { self.onMouseUp(); });
    this.canvas.addEventListener('mouseleave', function () { self.onMouseUp(); });
    this.canvas.addEventListener('dblclick', function (e) { self.onDoubleClick(e); });
    // Touch events
    this.canvas.addEventListener('touchstart', function (e) { self.onTouchStart(e); }, { passive: false });
    this.canvas.addEventListener('touchmove', function (e) { self.onTouchMove(e); }, { passive: false });
    this.canvas.addEventListener('touchend', function () { self.onMouseUp(); });

    // Start with a default dipole
    this.addCharge(180, 200, 1);
    this.addCharge(340, 200, -1);
  };

  ElectricFieldSimulator.prototype.addCharge = function (x, y, sign) {
    this.charges.push({ x: x, y: y, q: sign * 1e-9 });
    this.draw();
  };

  ElectricFieldSimulator.prototype.getChargeAt = function (mx, my) {
    var radius = 16;
    for (var i = this.charges.length - 1; i >= 0; i--) {
      var c = this.charges[i];
      var dx = mx - c.x;
      var dy = my - c.y;
      if (dx * dx + dy * dy < radius * radius) return i;
    }
    return -1;
  };

  ElectricFieldSimulator.prototype.onMouseDown = function (e) {
    var rect = this.canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left) * (CANVAS_W / rect.width);
    var my = (e.clientY - rect.top) * (CANVAS_H / rect.height);
    this.dragIndex = this.getChargeAt(mx, my);
    if (this.dragIndex >= 0) {
      var c = this.charges[this.dragIndex];
      this.dragOffsetX = mx - c.x;
      this.dragOffsetY = my - c.y;
    }
  };

  ElectricFieldSimulator.prototype.onMouseMove = function (e) {
    if (this.dragIndex < 0) return;
    var rect = this.canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left) * (CANVAS_W / rect.width);
    var my = (e.clientY - rect.top) * (CANVAS_H / rect.height);
    this.charges[this.dragIndex].x = mx - this.dragOffsetX;
    this.charges[this.dragIndex].y = my - this.dragOffsetY;
    this.draw();
  };

  ElectricFieldSimulator.prototype.onMouseUp = function () {
    this.dragIndex = -1;
  };

  ElectricFieldSimulator.prototype.onDoubleClick = function (e) {
    var rect = this.canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left) * (CANVAS_W / rect.width);
    var my = (e.clientY - rect.top) * (CANVAS_H / rect.height);
    var idx = this.getChargeAt(mx, my);
    if (idx >= 0) {
      this.charges.splice(idx, 1);
      this.draw();
    }
  };

  ElectricFieldSimulator.prototype.onTouchStart = function (e) {
    e.preventDefault();
    var touch = e.touches[0];
    var rect = this.canvas.getBoundingClientRect();
    var mx = (touch.clientX - rect.left) * (CANVAS_W / rect.width);
    var my = (touch.clientY - rect.top) * (CANVAS_H / rect.height);
    // Check for existing charge to drag
    this.dragIndex = this.getChargeAt(mx, my);
    if (this.dragIndex >= 0) {
      var c = this.charges[this.dragIndex];
      this.dragOffsetX = mx - c.x;
      this.dragOffsetY = my - c.y;
    } else {
      // Place a positive charge on tap
      this.addCharge(mx, my, 1);
    }
  };

  ElectricFieldSimulator.prototype.onTouchMove = function (e) {
    e.preventDefault();
    if (this.dragIndex < 0) return;
    var touch = e.touches[0];
    var rect = this.canvas.getBoundingClientRect();
    var mx = (touch.clientX - rect.left) * (CANVAS_W / rect.width);
    var my = (touch.clientY - rect.top) * (CANVAS_H / rect.height);
    this.charges[this.dragIndex].x = mx - this.dragOffsetX;
    this.charges[this.dragIndex].y = my - this.dragOffsetY;
    this.draw();
  };

  // ---- Field calculation ----
  ElectricFieldSimulator.prototype.fieldAt = function (x, y) {
    var ex = 0, ey = 0;
    var charges = this.charges;
    for (var i = 0; i < charges.length; i++) {
      var c = charges[i];
      var dx = x - c.x;
      var dy = y - c.y;
      var r2 = dx * dx + dy * dy;
      if (r2 < 400) continue; // avoid singularities inside charge
      var r = Math.sqrt(r2);
      var eMag = K * Math.abs(c.q) / r2;
      ex += eMag * (dx / r) * Math.sign(c.q);
      ey += eMag * (dy / r) * Math.sign(c.q);
    }
    return { x: ex, y: ey };
  };

  ElectricFieldSimulator.prototype.potentialAt = function (x, y) {
    var v = 0;
    var charges = this.charges;
    for (var i = 0; i < charges.length; i++) {
      var c = charges[i];
      var dx = x - c.x;
      var dy = y - c.y;
      var r = Math.sqrt(dx * dx + dy * dy);
      if (r < 10) continue;
      v += K * c.q / r;
    }
    return v;
  };

  // ---- Drawing ----
  ElectricFieldSimulator.prototype.draw = function () {
    var ctx = this.ctx;
    var w = CANVAS_W, h = CANVAS_H;
    ctx.clearRect(0, 0, w, h);

    // Background grid
    this.drawGrid(ctx, w, h);

    if (this.charges.length === 0) return;

    // Draw equipotentials
    if (this.showEquipotentials) {
      this.drawEquipotentials(ctx, w, h);
    }

    // Draw field lines
    this.drawFieldLines(ctx, w, h);

    // Draw field direction grid
    this.drawFieldGrid(ctx, w, h);

    // Draw charges
    this.drawCharges(ctx);
  };

  ElectricFieldSimulator.prototype.drawGrid = function (ctx, w, h) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (var x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (var y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  ElectricFieldSimulator.prototype.drawFieldLines = function (ctx, w, h) {
    var charges = this.charges;
    if (charges.length === 0) return;

    var self = this;
    var step = 6;
    var maxSteps = 400;

    // For each charge, emit field lines
    for (var i = 0; i < charges.length; i++) {
      var c = charges[i];
      var numLines = 16;
      if (charges.length > 2) numLines = 12;

      for (var j = 0; j < numLines; j++) {
        var angle = (j / numLines) * 2 * Math.PI;
        // Start slightly away from charge
        var sx = c.x + 18 * Math.cos(angle);
        var sy = c.y + 18 * Math.sin(angle);
        var dir = Math.sign(c.q);

        ctx.beginPath();
        ctx.moveTo(sx, sy);

        var px = sx, py = sy;
        var alive = true;
        for (var s = 0; s < maxSteps; s++) {
          var f = self.fieldAt(px, py);
          var mag = Math.sqrt(f.x * f.x + f.y * f.y);
          if (mag < 1e-10) { alive = false; break; }

          var nx = px + dir * step * (f.x / mag);
          var ny = py + dir * step * (f.y / mag);

          // Check bounds
          if (nx < 0 || nx > w || ny < 0 || ny > h) { alive = false; break; }

          // Check if we hit another charge
          var hit = false;
          for (var k = 0; k < charges.length; k++) {
            if (k === i) continue;
            var oc = charges[k];
            var dx = nx - oc.x;
            var dy = ny - oc.y;
            if (dx * dx + dy * dy < 324) { hit = true; break; }
          }
          if (hit) { alive = false; break; }

          ctx.lineTo(nx, ny);
          px = nx;
          py = ny;
        }

        // Color: blue hue for positive sources, red hue for negative
        if (c.q > 0) {
          ctx.strokeStyle = 'rgba(70, 160, 255, 0.7)';
        } else {
          ctx.strokeStyle = 'rgba(255, 80, 80, 0.7)';
        }
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    }
  };

  ElectricFieldSimulator.prototype.drawFieldGrid = function (ctx, w, h) {
    var self = this;
    var spacing = 36;
    var arrowLen = ARROW_LEN;

    for (var gx = spacing; gx < w; gx += spacing) {
      for (var gy = spacing; gy < h; gy += spacing) {
        var f = self.fieldAt(gx, gy);
        var mag = Math.sqrt(f.x * f.x + f.y * f.y);
        if (mag < 1e-6) continue;

        // Normalize and scale
        var nf = Math.min(mag / 5e10, 1);
        var len = 4 + nf * arrowLen;
        var dx = (f.x / mag) * len;
        var dy = (f.y / mag) * len;

        var alpha = 0.25 + nf * 0.5;
        ctx.strokeStyle = 'rgba(200, 220, 255, ' + alpha + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx + dx, gy + dy);
        ctx.stroke();

        // Arrowhead
        var aLen = 4;
        var angle = Math.atan2(dy, dx);
        ctx.fillStyle = 'rgba(200, 220, 255, ' + alpha + ')';
        ctx.beginPath();
        ctx.moveTo(gx + dx, gy + dy);
        ctx.lineTo(gx + dx - aLen * Math.cos(angle - 0.5), gy + dy - aLen * Math.sin(angle - 0.5));
        ctx.lineTo(gx + dx - aLen * Math.cos(angle + 0.5), gy + dy - aLen * Math.sin(angle + 0.5));
        ctx.closePath();
        ctx.fill();
      }
    }
  };

  ElectricFieldSimulator.prototype.drawEquipotentials = function (ctx, w, h) {
    var self = this;
    var spacing = 24;
    var contours = [];

    // Find potential range
    var potentials = [];
    for (var gx = spacing; gx < w; gx += spacing) {
      for (var gy = spacing; gy < h; gy += spacing) {
        var skip = false;
        for (var k = 0; k < this.charges.length; k++) {
          var c = this.charges[k];
          var dx = gx - c.x, dy = gy - c.y;
          if (dx * dx + dy * dy < 400) { skip = true; break; }
        }
        if (!skip) potentials.push(self.potentialAt(gx, gy));
      }
    }
    if (potentials.length < 4) return;
    potentials.sort(function (a, b) { return a - b; });
    var pMin = potentials[Math.floor(potentials.length * 0.1)];
    var pMax = potentials[Math.floor(potentials.length * 0.9)];
    var range = pMax - pMin;
    if (range < 1e-10) return;

    var numContours = 8;
    var thresholdValues = [];
    for (var ci = 1; ci <= numContours; ci++) {
      thresholdValues.push(pMin + (ci / (numContours + 1)) * range);
    }

    // Simple contour tracing by checking each cell
    for (var ci = 0; ci < thresholdValues.length; ci++) {
      var threshold = thresholdValues[ci];
      ctx.strokeStyle = 'rgba(255, 220, 100, 0.25)';
      ctx.lineWidth = 1.2;

      for (var gx = spacing; gx < w - spacing; gx += 6) {
        for (var gy = spacing; gy < h - spacing; gy += 6) {
          var v = self.potentialAt(gx, gy);
          var diff = v - threshold;
          if (Math.abs(diff) < range * 0.015) {
            ctx.fillStyle = 'rgba(255, 220, 100, 0.2)';
            ctx.fillRect(gx - 1, gy - 1, 2, 2);
          }
        }
      }
    }
  };

  ElectricFieldSimulator.prototype.drawCharges = function (ctx) {
    var charges = this.charges;
    for (var i = 0; i < charges.length; i++) {
      var c = charges[i];
      var r = 14;

      // Glow
      var grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r * 2.2);
      if (c.q > 0) {
        grad.addColorStop(0, 'rgba(70, 160, 255, 0.4)');
        grad.addColorStop(1, 'rgba(70, 160, 255, 0)');
      } else {
        grad.addColorStop(0, 'rgba(255, 80, 80, 0.4)');
        grad.addColorStop(1, 'rgba(255, 80, 80, 0)');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r * 2.2, 0, 2 * Math.PI);
      ctx.fill();

      // Circle
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, 2 * Math.PI);
      if (c.q > 0) {
        ctx.fillStyle = '#4a90ff';
        ctx.strokeStyle = '#2a6ad0';
      } else {
        ctx.fillStyle = '#ff4444';
        ctx.strokeStyle = '#cc2222';
      }
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();

      // Sign
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.q > 0 ? '+' : '−', c.x, c.y + 1);
    }
  };


  // ──────────────────────────────────────────────
  // 2. MAGNETIC FIELD SIMULATOR
  // ──────────────────────────────────────────────

  function MagneticFieldSimulator(containerId) {
    this.container = document.getElementById(containerId);
    this.mode = 'wire'; // 'wire', 'solenoid', 'parallel'
    this.currentInto = true;  // true = into page (red ×), false = out of page (blue dot)
    this.parallelSame = true; // for parallel wires mode: same direction?
    this.animTime = 0;
    this.animId = null;
    this.init();
  }

  MagneticFieldSimulator.prototype.init = function () {
    var self = this;

    this.container.innerHTML = `
      <div class="sim-panel dark-card">
        <div class="sim-header">
          <span class="sim-title">🧲 磁场分布模拟</span>
          <span class="sim-hint">查看磁场分布</span>
        </div>
        <div class="sim-toolbar">
          <button class="sim-btn mode-btn active-btn" data-mode="wire" type="button">单根导线</button>
          <button class="sim-btn mode-btn" data-mode="solenoid" type="button">螺线管</button>
          <button class="sim-btn mode-btn" data-mode="parallel" type="button">平行导线</button>
          <button class="sim-btn dir-btn" type="button">切换电流方向 ↺</button>
        </div>
        <canvas class="sim-canvas" width="${CANVAS_W}" height="${CANVAS_H}"></canvas>
      </div>
    `;

    this.canvas = this.container.querySelector('.sim-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Mode buttons
    this.container.querySelectorAll('.mode-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        self.container.querySelectorAll('.mode-btn').forEach(function (b) { b.classList.remove('active-btn'); });
        this.classList.add('active-btn');
        self.mode = this.dataset.mode;
        self.draw();
      });
    });

    // Current direction button
    this.container.querySelector('.dir-btn').addEventListener('click', function () {
      self.currentInto = !self.currentInto;
      self.draw();
    });

    // Start animation
    this.animate();
  };

  MagneticFieldSimulator.prototype.animate = function () {
    var self = this;
    function tick() {
      self.animTime += 0.016;
      self.draw();
      self.animId = requestAnimationFrame(tick);
    }
    this.animId = requestAnimationFrame(tick);
  };

  MagneticFieldSimulator.prototype.draw = function () {
    var ctx = this.ctx;
    var w = CANVAS_W, h = CANVAS_H;
    ctx.clearRect(0, 0, w, h);

    // Background grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (var x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (var y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (this.mode === 'wire') {
      this.drawSingleWire(ctx, w, h);
    } else if (this.mode === 'solenoid') {
      this.drawSolenoid(ctx, w, h);
    } else if (this.mode === 'parallel') {
      this.drawParallelWires(ctx, w, h);
    }
  };

  // ---- Single Wire Mode ----
  MagneticFieldSimulator.prototype.drawSingleWire = function (ctx, w, h) {
    var cx = w / 2, cy = h / 2;

    // Draw the wire
    this.drawCurrentElement(ctx, cx, cy, 14);

    // Concentric field loops
    var numLoops = 5;
    var radii = [50, 85, 120, 155, 190];
    var self = this;

    for (var i = 0; i < numLoops; i++) {
      var r = radii[i];
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Animated arrows along the ring
      var numArrows = 10;
      for (var j = 0; j < numArrows; j++) {
        var baseAngle = (j / numArrows) * 2 * Math.PI;
        var angle = baseAngle + (self.animTime * 1.2) * (self.currentInto ? -1 : 1);
        var ax = cx + r * Math.cos(angle);
        var ay = cy + r * Math.sin(angle);

        // Tangent direction (perpendicular to radius)
        var tdx = -Math.sin(angle) * (self.currentInto ? -1 : 1);
        var tdy = Math.cos(angle) * (self.currentInto ? -1 : 1);

        this.drawTinyArrow(ctx, ax, ay, tdx, tdy, 8, 'rgba(100, 220, 255, 0.7)');
      }
    }

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('B = μ₀I / (2πr)', cx, h - 18);
    ctx.fillText(this.currentInto ? '电流 ↓ (入纸面)' : '电流 ↑ (出纸面)', cx, 24);
  };

  // ---- Solenoid Mode ----
  MagneticFieldSimulator.prototype.drawSolenoid = function (ctx, w, h) {
    var cx = w / 2, cy = h / 2;
    var coilW = 260, coilH = 180;
    var left = cx - coilW / 2;
    var top = cy - coilH / 2;

    // Coil windings (top and bottom wires)
    ctx.strokeStyle = 'rgba(200, 150, 80, 0.6)';
    ctx.lineWidth = 2;

    var numTurns = 10;
    for (var i = 0; i <= numTurns; i++) {
      var x = left + (i / numTurns) * coilW;

      // Show current direction on each turn
      // Dot (out) on top, cross (in) on bottom if currentInto
      var dotSize = 6;
      // Top wire segment
      ctx.fillStyle = this.currentInto ? 'rgba(255,80,80,0.7)' : 'rgba(80,150,255,0.7)';
      if (this.currentInto) {
        this.drawCross(ctx, x, top, dotSize);
      } else {
        this.drawDot(ctx, x, top, dotSize);
      }
      // Bottom wire segment
      ctx.fillStyle = this.currentInto ? 'rgba(80,150,255,0.7)' : 'rgba(255,80,80,0.7)';
      if (this.currentInto) {
        this.drawDot(ctx, x, top + coilH, dotSize);
      } else {
        this.drawCross(ctx, x, top + coilH, dotSize);
      }
    }

    // Side connections
    ctx.strokeStyle = 'rgba(200, 150, 80, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left, top + coilH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(left + coilW, top);
    ctx.lineTo(left + coilW, top + coilH);
    ctx.stroke();

    // Interior B field (uniform, left to right)
    // Animated field lines inside
    var numLines = 5;
    for (var li = 0; li < numLines; li++) {
      var ly = top + 20 + (li / (numLines - 1)) * (coilH - 40);
      ctx.beginPath();
      ctx.moveTo(left + 5, ly);
      ctx.lineTo(left + coilW - 5, ly);
      ctx.strokeStyle = 'rgba(100, 220, 255, 0.4)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Animated arrow
      var ax = left + 20 + ((this.animTime * 60) % (coilW - 60));
      ctx.fillStyle = 'rgba(100, 220, 255, 0.8)';
      this.drawArrowHead(ctx, ax, ly, 1, 0, 8);
    }

    // B field label inside
    ctx.fillStyle = 'rgba(100, 220, 255, 0.6)';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('B → 均匀', cx, cy + 6);

    // Exterior field lines (wrapping around)
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(cx, top - 15, 40, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, top + coilH + 15, 40, 0, Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('内部 B = μ₀nI 均匀', cx, h - 18);
  };

  // ---- Parallel Wires Mode ----
  MagneticFieldSimulator.prototype.drawParallelWires = function (ctx, w, h) {
    var cx = w / 2, cy = h / 2;
    var spacing = 80;

    // Two wires: left and right
    var x1 = cx - spacing, x2 = cx + spacing;

    // Wire 1
    this.drawCurrentElement(ctx, x1, cy, 12);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('I₁', x1, cy + cy > h / 2 ? cy + 30 : cy - 24);

    // Wire 2
    this.drawCurrentElement(ctx, x2, cy, 12);
    ctx.fillText('I₂', x2, cy + cy > h / 2 ? cy + 30 : cy - 24);

    var self = this;

    // Draw field lines from both wires with superposition
    var numRings = 3;
    var radii = [30, 55, 85];

    for (var ww = 0; ww < 2; ww++) {
      var wx = ww === 0 ? x1 : x2;
      for (var ri = 0; ri < numRings; ri++) {
        var r = radii[ri];
        if (r < 8) continue;

        ctx.beginPath();
        ctx.arc(wx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Animated arrows
        var numArrows = 8;
        for (var j = 0; j < numArrows; j++) {
          var baseAngle = (j / numArrows) * 2 * Math.PI;
          var angle = baseAngle + (self.animTime * 1.0) * (self.currentInto ? -1 : 1);
          var ax = wx + r * Math.cos(angle);
          var ay = cy + r * Math.sin(angle);

          var tdx = -Math.sin(angle) * (self.currentInto ? -1 : 1);
          var tdy = Math.cos(angle) * (self.currentInto ? -1 : 1);

          // Different color per wire
          var color = ww === 0 ? 'rgba(100, 220, 255, 0.5)' : 'rgba(255, 180, 100, 0.5)';
          this.drawTinyArrow(ctx, ax, ay, tdx, tdy, 5, color);
        }
      }
    }

    // Force indication between wires
    var forceAttr = this.parallelSame ? 'rgba(255,80,80,0.3)' : 'rgba(80,220,100,0.3)';
    var arrowsY = cy - spacing - 20;
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.parallelSame ? '同向电流 → 相互吸引' : '反向电流 → 相互排斥', cx, h - 18);

    // Force arrows
    var fy = cy - 50;
    ctx.strokeStyle = forceAttr;
    ctx.lineWidth = 2;
    if (this.parallelSame) {
      // Arrows pointing toward each other
      ctx.beginPath();
      ctx.moveTo(x1 + 15, fy);
      ctx.lineTo(x1 + 45, fy);
      ctx.stroke();
      this.drawArrowHead(ctx, x1 + 45, fy, 1, 0, 8);
      ctx.beginPath();
      ctx.moveTo(x2 - 15, fy);
      ctx.lineTo(x2 - 45, fy);
      ctx.stroke();
      this.drawArrowHead(ctx, x2 - 45, fy, -1, 0, 8);
    } else {
      // Arrows pointing away
      ctx.beginPath();
      ctx.moveTo(x1 + 15, fy);
      ctx.lineTo(x1 - 25, fy);
      ctx.stroke();
      this.drawArrowHead(ctx, x1 - 25, fy, -1, 0, 8);
      ctx.beginPath();
      ctx.moveTo(x2 - 15, fy);
      ctx.lineTo(x2 + 25, fy);
      ctx.stroke();
      this.drawArrowHead(ctx, x2 + 25, fy, 1, 0, 8);
    }

    // Set current direction info
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ 点击\"切换电流方向\"试试', cx, 22);
  };

  // ---- Helper drawing methods ----

  MagneticFieldSimulator.prototype.drawCurrentElement = function (ctx, x, y, size) {
    if (this.currentInto) {
      // Cross (into page)
      ctx.strokeStyle = 'rgba(255, 80, 80, 0.85)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.6, y - size * 0.6);
      ctx.lineTo(x + size * 0.6, y + size * 0.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - size * 0.6, y + size * 0.6);
      ctx.lineTo(x + size * 0.6, y - size * 0.6);
      ctx.stroke();
      // Circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 80, 80, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      // Dot (out of page)
      ctx.fillStyle = 'rgba(80, 150, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(80, 150, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };

  MagneticFieldSimulator.prototype.drawCross = function (ctx, x, y, size) {
    ctx.strokeStyle = 'rgba(255, 80, 80, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.5, y - size * 0.5);
    ctx.lineTo(x + size * 0.5, y + size * 0.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - size * 0.5, y + size * 0.5);
    ctx.lineTo(x + size * 0.5, y - size * 0.5);
    ctx.stroke();
  };

  MagneticFieldSimulator.prototype.drawDot = function (ctx, x, y, size) {
    ctx.fillStyle = 'rgba(80, 150, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.35, 0, 2 * Math.PI);
    ctx.fill();
  };

  MagneticFieldSimulator.prototype.drawTinyArrow = function (ctx, x, y, dx, dy, len, color) {
    var mag = Math.sqrt(dx * dx + dy * dy);
    if (mag < 0.001) return;
    var nx = dx / mag, ny = dy / mag;
    var ex = x + nx * len, ey = y + ny * len;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // arrowhead
    var angle = Math.atan2(ny, nx);
    var hLen = 3.5;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - hLen * Math.cos(angle - 0.6), ey - hLen * Math.sin(angle - 0.6));
    ctx.lineTo(ex - hLen * Math.cos(angle + 0.6), ey - hLen * Math.sin(angle + 0.6));
    ctx.closePath();
    ctx.fill();
  };

  MagneticFieldSimulator.prototype.drawArrowHead = function (ctx, x, y, dx, dy, len) {
    var angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - len * Math.cos(angle - 0.5), y - len * Math.sin(angle - 0.5));
    ctx.lineTo(x - len * Math.cos(angle + 0.5), y - len * Math.sin(angle + 0.5));
    ctx.closePath();
    ctx.fill();
  };

  // ──────────────────────────────────────────────
  // Expose to global scope
  // ──────────────────────────────────────────────
  window.ElectricFieldSimulator = ElectricFieldSimulator;
  window.MagneticFieldSimulator = MagneticFieldSimulator;

  // ──────────────────────────────────────────────
  // Auto-init when toggle buttons are clicked
  // ──────────────────────────────────────────────
  // These are called from app.js after the panel is added to DOM
  window.initElectricSim = function () {
    var container = document.getElementById('electricFieldSim');
    if (!container) return;
    if (container.dataset.initialized) return;
    container.dataset.initialized = '1';
    return new ElectricFieldSimulator('electricFieldSim');
  };

  window.initMagneticSim = function () {
    var container = document.getElementById('magneticFieldSim');
    if (!container) return;
    if (container.dataset.initialized) return;
    container.dataset.initialized = '1';
    return new MagneticFieldSimulator('magneticFieldSim');
  };

})();
