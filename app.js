(function () {
  const DESK_LAYOUT = [
    { x: 36, y: 78 },
    { x: 128, y: 78 },
    { x: 220, y: 78 },
    { x: 312, y: 78 }
  ];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function wrapText(text, maxChars) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = "";
    for (const w of words) {
      const next = line ? line + " " + w : w;
      if (next.length > maxChars && line) {
        lines.push(line);
        line = w;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines.slice(0, 2);
  }

  function deskSvg(desk, i) {
    const pos = DESK_LAYOUT[i] || { x: 36 + i * 92, y: 78 };
    const color = desk.color || "#7C5CFF";
    const bot = desk.bot;
    let robot = "";
    if (bot) {
      robot = `
        <g transform="translate(${pos.x + 18}, ${pos.y - 28})" filter="url(#softShadow)">
          <ellipse cx="18" cy="42" rx="14" ry="5" fill="rgba(0,0,0,0.15)"/>
          <rect x="6" y="14" width="24" height="22" rx="8" fill="#fff"/>
          <rect x="6" y="14" width="24" height="22" rx="8" fill="${esc(color)}" opacity="0.85"/>
          <circle cx="18" cy="8" r="11" fill="#fff"/>
          <circle cx="18" cy="8" r="11" fill="${esc(color)}" opacity="0.9"/>
          <circle cx="14" cy="7" r="2.2" fill="#1a1040"/>
          <circle cx="22" cy="7" r="2.2" fill="#1a1040"/>
          <path d="M13 12 Q18 15 23 12" stroke="#1a1040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <rect x="2" y="18" width="5" height="10" rx="2" fill="#FFE08A"/>
          <rect x="29" y="18" width="5" height="10" rx="2" fill="#FFE08A"/>
          <text x="18" y="56" text-anchor="middle" font-family="Nunito,sans-serif" font-size="8" font-weight="800" fill="#1a1040">${esc(bot.name)}</text>
        </g>`;
    } else {
      robot = `
        <g transform="translate(${pos.x + 10}, ${pos.y + 8})" opacity="0.55">
          <text x="26" y="8" text-anchor="middle" font-family="Nunito,sans-serif" font-size="8" font-weight="700" fill="#8a6b20">empty</text>
        </g>`;
    }

    return `
      <g>
        <!-- desk -->
        <rect x="${pos.x}" y="${pos.y + 22}" width="72" height="10" rx="3" fill="#8B5A2B" filter="url(#softShadow)"/>
        <rect x="${pos.x + 4}" y="${pos.y + 12}" width="64" height="14" rx="4" fill="#C48A4A"/>
        <rect x="${pos.x + 8}" y="${pos.y + 32}" width="6" height="18" rx="2" fill="#6E4320"/>
        <rect x="${pos.x + 58}" y="${pos.y + 32}" width="6" height="18" rx="2" fill="#6E4320"/>
        <!-- monitor -->
        <rect x="${pos.x + 22}" y="${pos.y - 2}" width="28" height="18" rx="3" fill="#2a2a4a"/>
        <rect x="${pos.x + 24}" y="${pos.y}" width="24" height="12" rx="2" fill="#7CF5E0"/>
        <rect x="${pos.x + 33}" y="${pos.y + 16}" width="6" height="6" fill="#444"/>
        ${robot}
      </g>`;
  }

  function bubblesSvg(chatter) {
    if (!chatter || !chatter.length) return "";
    const slots = [
      { x: 40, y: 52 },
      { x: 210, y: 52 }
    ];
    return chatter.slice(0, 2).map((c, i) => {
      const slot = slots[i] || { x: 40 + i * 170, y: 52 };
      const label = `${c.from} → ${c.to}`;
      const lines = wrapText(c.text, 28);
      const h = 18 + lines.length * 10;
      const w = 150;
      const textLines = lines
        .map((ln, li) => `<tspan x="${slot.x + 8}" dy="${li === 0 ? 0 : 10}">${esc(ln)}</tspan>`)
        .join("");
      return `
        <g filter="url(#softShadow)">
          <rect x="${slot.x}" y="${slot.y}" width="${w}" height="${h}" rx="10" fill="#fff"/>
          <polygon points="${slot.x + 24},${slot.y + h} ${slot.x + 34},${slot.y + h} ${slot.x + 28},${slot.y + h + 8}" fill="#fff"/>
          <text x="${slot.x + 8}" y="${slot.y + 12}" font-family="Nunito,sans-serif" font-size="7.5" font-weight="800" fill="#7C5CFF">${esc(label)}</text>
          <text y="${slot.y + 24}" font-family="Nunito,sans-serif" font-size="8" font-weight="600" fill="#1a1040">${textLines}</text>
        </g>`;
    }).join("");
  }

  function renderProjects(projects, desks) {
    const workingByProject = {};
    (desks || []).forEach((d) => {
      if (d.bot && d.bot.project) {
        workingByProject[d.bot.project] = d.bot;
      }
    });
    const colors = ["#FF6B9D", "#7C5CFF", "#00C2A8"];
    const el = document.getElementById("projectList");
    el.innerHTML = (projects || [])
      .map((p, i) => {
        const bot = workingByProject[p.name];
        const link =
          p.productLink
            ? `<a href="${esc(p.productLink)}" target="_blank" rel="noopener noreferrer">${esc(p.productLink)}</a>`
            : "";
        const pill = bot
          ? `<span class="working-pill">${esc(bot.name)} · ${esc(bot.task)} · since ${esc(bot.sinceLabel || "")}</span>`
          : "";
        return `
          <article class="project-card">
            <div class="stripe" style="background:${colors[i % colors.length]}"></div>
            <div>
              <h3>${esc(p.name)}</h3>
              <p>${esc(p.blurb || "")}</p>
              ${pill}
              ${link}
            </div>
          </article>`;
      })
      .join("");
  }

  function render(data) {
    const desksGroup = document.getElementById("desksGroup");
    const bubblesGroup = document.getElementById("bubblesGroup");
    desksGroup.innerHTML = (data.desks || []).map(deskSvg).join("");
    bubblesGroup.innerHTML = bubblesSvg(data.chatter || []);
    renderProjects(data.projects || [], data.desks || []);

    const updated = document.getElementById("updatedLabel");
    if (data.updatedAt) {
      try {
        const d = new Date(data.updatedAt);
        updated.textContent =
          "Updated " +
          d.toLocaleTimeString("en-US", {
            timeZone: data.timezone || "America/Chicago",
            hour: "numeric",
            minute: "2-digit"
          }) +
          " CT";
      } catch (_) {
        updated.textContent = "Live";
      }
    } else {
      updated.textContent = "Live";
    }
  }

  fetch("office.json?_=" + Date.now())
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load office.json");
      return r.json();
    })
    .then(render)
    .catch((err) => {
      document.getElementById("updatedLabel").textContent = "Offline";
      console.error(err);
    });
})();
