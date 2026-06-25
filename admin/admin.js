// Transform Ventures — admin panel logic (vanilla JS, no build step).
let PAGE = "home";
const PAGE_URL = (p) => (p === "home" ? "/" : "/pages/" + p + ".html");
let schema = null;
let content = null;
let dirty = false;
const collapsed = new WeakSet(); // remembers collapsed list items across re-renders

const $ = (sel) => document.querySelector(sel);
const el = (tag, props = {}, ...kids) => {
  const n = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== undefined && v !== null && v !== false) n.setAttribute(k, v);
  });
  kids.flat().forEach((c) => c != null && n.append(c?.nodeType ? c : document.createTextNode(c)));
  return n;
};

async function api(url, opts = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    ...opts,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Request failed (" + res.status + ")");
  }
  return res.status === 204 ? null : res.json();
}

function toast(msg, isErr) {
  const t = $("#toast");
  t.textContent = msg;
  t.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (t.className = "toast"), 2400);
}

// ---------- dirty state ----------
function markDirty() {
  dirty = true;
  $("#save-btn").disabled = false;
  $("#dirty").classList.remove("hidden");
  $("#saved").classList.add("hidden");
}
function markClean() {
  dirty = false;
  $("#save-btn").disabled = true;
  $("#dirty").classList.add("hidden");
  $("#saved").classList.remove("hidden");
}
window.addEventListener("beforeunload", (e) => {
  if (dirty) {
    e.preventDefault();
    e.returnValue = "";
  }
});

// ---------- auth ----------
async function checkAuth() {
  try {
    await api("/api/me");
    return true;
  } catch {
    return false;
  }
}

$("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("#login-err").textContent = "";
  try {
    await api("/api/login", {
      method: "POST",
      body: JSON.stringify({ username: $("#u").value, password: $("#p").value }),
    });
    boot();
  } catch (err) {
    $("#login-err").textContent = err.message;
  }
});

$("#logout-btn").addEventListener("click", async () => {
  if (dirty && !confirm("You have unsaved changes. Log out anyway?")) return;
  dirty = false;
  await api("/api/logout", { method: "POST" }).catch(() => {});
  location.reload();
});

// ---------- value helpers ----------
const getVal = (obj, s, f) => obj?.[s]?.[f];
function setVal(s, f, value) {
  if (!content[s]) content[s] = {};
  content[s][f] = value;
  markDirty();
}

// ---------- field renderers ----------
function fieldInput(value, field, onChange) {
  const change = (v) => { onChange(v); };
  if (field.type === "textarea" || field.type === "lines") {
    const v = field.type === "lines" && Array.isArray(value) ? value.join("\n") : value || "";
    const ta = el("textarea", { rows: field.type === "lines" ? 5 : 3 });
    ta.value = v;
    ta.addEventListener("input", () =>
      change(field.type === "lines" ? ta.value.split("\n").map((s) => s.trim()).filter(Boolean) : ta.value)
    );
    return ta;
  }
  if (field.type === "image") return imageField(value || "", change);
  const inp = el("input", { type: "text" });
  inp.value = value || "";
  inp.addEventListener("input", () => change(inp.value));
  return inp;
}

function imageField(value, onChange) {
  const resolve = (v) => (!v ? "" : v.startsWith("http") || v.startsWith("/") ? v : "/" + v);
  const preview = el("img", { class: "img-preview", src: resolve(value), alt: "" });
  preview.addEventListener("error", () => (preview.style.opacity = ".25"));
  const pathInput = el("input", { type: "text", placeholder: "image path or URL" });
  pathInput.value = value;
  pathInput.addEventListener("input", () => {
    onChange(pathInput.value);
    preview.src = resolve(pathInput.value);
    preview.style.opacity = "1";
  });
  const fileInput = el("input", { type: "file", accept: "image/*", style: "display:none" });
  const uploadBtn = el("button", { class: "btn-ghost btn-tiny", type: "button" }, "Upload image");
  uploadBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    uploadBtn.textContent = "Uploading…";
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd, credentials: "same-origin" });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      pathInput.value = url;
      onChange(url);
      preview.src = resolve(url);
      preview.style.opacity = "1";
      toast("Image uploaded");
    } catch (err) {
      toast(err.message, true);
    } finally {
      uploadBtn.textContent = "Upload image";
      fileInput.value = "";
    }
  });
  return el("div", { class: "img-field" },
    preview,
    el("div", { class: "img-controls" }, pathInput, uploadBtn, fileInput)
  );
}

function fieldRow(value, field, onChange) {
  return el("div", { class: "field" }, el("label", {}, field.label, fieldInput(value, field, onChange)));
}

// ---------- list section (divisions, events) ----------
function renderListSection(section) {
  const wrap = el("div", { class: "section", id: "sec-" + section.key });
  const items = Array.isArray(content[section.key]) ? content[section.key] : (content[section.key] = []);
  const state = { query: "", sort: "manual" };

  const countPill = el("span", { class: "count-pill" });
  const itemsWrap = el("div", {});

  // toolbar
  const search = el("input", { type: "text", placeholder: "Search " + section.label.replace(/—.*/, "").trim() + "…" });
  search.addEventListener("input", () => { state.query = search.value.toLowerCase(); draw(); });

  const sortSel = el("select", {},
    el("option", { value: "manual" }, "Manual order"),
    el("option", { value: "az" }, "Name A → Z"),
    el("option", { value: "za" }, "Name Z → A"),
  );
  sortSel.addEventListener("change", () => {
    state.sort = sortSel.value;
    if (state.sort !== "manual") {
      const key = section.itemLabel;
      items.sort((a, b) => (a[key] || "").localeCompare(b[key] || ""));
      if (state.sort === "za") items.reverse();
      markDirty();
    }
    draw();
  });

  const collapseAll = el("button", { class: "btn-ghost btn-tiny", type: "button" }, "Collapse all");
  collapseAll.addEventListener("click", () => {
    const anyOpen = items.some((it) => !collapsed.has(it));
    items.forEach((it) => (anyOpen ? collapsed.add(it) : collapsed.delete(it)));
    collapseAll.textContent = anyOpen ? "Expand all" : "Collapse all";
    draw();
  });

  const addBtn = el("button", { class: "btn-primary btn-tiny", type: "button" },
    "+ Add " + section.label.replace(/—.*/, "").trim().replace(/s$/, ""));
  addBtn.addEventListener("click", () => {
    const blank = {};
    section.fields.forEach((f) => (blank[f.key] = ""));
    items.push(blank);
    state.query = "";
    search.value = "";
    markDirty();
    draw();
    itemsWrap.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  const toolbar = el("div", { class: "list-toolbar" },
    el("div", { class: "tb-search" }, search),
    sortSel, collapseAll, countPill, addBtn);

  // drag-and-drop reordering
  let dragIdx = null;
  function attachDrag(card, idx) {
    card.setAttribute("draggable", "true");
    card.addEventListener("dragstart", (e) => { dragIdx = idx; card.classList.add("dragging"); e.dataTransfer.effectAllowed = "move"; });
    card.addEventListener("dragend", () => { dragIdx = null; card.classList.remove("dragging"); itemsWrap.querySelectorAll(".drag-over").forEach((c) => c.classList.remove("drag-over")); });
    card.addEventListener("dragover", (e) => { e.preventDefault(); card.classList.add("drag-over"); });
    card.addEventListener("dragleave", () => card.classList.remove("drag-over"));
    card.addEventListener("drop", (e) => {
      e.preventDefault();
      card.classList.remove("drag-over");
      if (dragIdx === null || dragIdx === idx) return;
      const [moved] = items.splice(dragIdx, 1);
      items.splice(idx, 0, moved);
      sortSel.value = state.sort = "manual";
      markDirty();
      draw();
    });
  }

  function move(idx, dir) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    [items[idx], items[j]] = [items[j], items[idx]];
    sortSel.value = state.sort = "manual";
    markDirty();
    draw();
  }

  function draw() {
    itemsWrap.innerHTML = "";
    const dragEnabled = !state.query;
    let shown = 0;
    items.forEach((item, idx) => {
      const title = item[section.itemLabel] || "Untitled";
      if (state.query && !JSON.stringify(item).toLowerCase().includes(state.query)) return;
      shown++;
      const isCollapsed = collapsed.has(item);
      const card = el("div", { class: "list-item" + (isCollapsed ? " collapsed" : "") });

      const toggleBtn = el("button", { class: "icon-btn", type: "button", title: "Collapse / expand" }, isCollapsed ? "▸" : "▾");
      toggleBtn.addEventListener("click", () => { isCollapsed ? collapsed.delete(item) : collapsed.add(item); draw(); });

      const up = el("button", { class: "icon-btn", type: "button", title: "Move up" }, "↑");
      up.disabled = idx === 0 || !dragEnabled;
      up.addEventListener("click", () => move(idx, -1));
      const down = el("button", { class: "icon-btn", type: "button", title: "Move down" }, "↓");
      down.disabled = idx === items.length - 1 || !dragEnabled;
      down.addEventListener("click", () => move(idx, 1));

      const dup = el("button", { class: "icon-btn", type: "button", title: "Duplicate" }, "⧉");
      dup.addEventListener("click", () => { items.splice(idx + 1, 0, JSON.parse(JSON.stringify(item))); markDirty(); draw(); });

      const del = el("button", { class: "icon-btn danger", type: "button", title: "Remove" }, "✕");
      del.addEventListener("click", () => { if (confirm('Remove "' + title + '"?')) { items.splice(idx, 1); markDirty(); draw(); } });

      const head = el("div", { class: "list-item-head" },
        el("div", { class: "li-left" },
          el("span", { class: "icon-btn grab", title: "Drag to reorder" }, "≡"),
          el("span", { class: "li-index" }, "#" + (idx + 1)),
          el("span", { class: "li-title" }, title)),
        el("div", { class: "li-actions" }, toggleBtn, up, down, dup, del));

      const body = el("div", { class: "list-body" });
      section.fields.forEach((f) => {
        body.append(fieldRow(item[f.key], f, (v) => {
          item[f.key] = v;
          markDirty();
          if (f.key === section.itemLabel) card.querySelector(".li-title").textContent = v || "Untitled";
        }));
      });

      card.append(head, body);
      if (dragEnabled) attachDrag(card, idx);
      itemsWrap.append(card);
    });

    if (!shown) {
      itemsWrap.append(el("div", { class: "empty-state" },
        state.query ? "No items match your search." : "No items yet — click “Add” to create one."));
    }
    countPill.textContent = (state.query ? shown + " of " + items.length : items.length) + " item" + (items.length === 1 ? "" : "s");
  }

  wrap.append(
    el("h2", {}, section.label),
    toolbar,
    itemsWrap
  );
  draw();
  return wrap;
}

// ---------- object section ----------
function renderObjectSection(section) {
  const wrap = el("div", { class: "section", id: "sec-" + section.key });
  wrap.append(el("h2", {}, section.label));
  section.fields.forEach((f) => {
    wrap.append(fieldRow(getVal(content, section.key, f.key), f, (v) => setVal(section.key, f.key, v)));
  });
  return wrap;
}

// ---------- render everything ----------
function render() {
  const navLinks = $("#section-links");
  const editor = $("#editor");
  navLinks.innerHTML = "";
  editor.innerHTML = "";

  schema.sections.forEach((section) => {
    const link = el("a", { href: "#sec-" + section.key, "data-key": section.key }, section.label);
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("sec-" + section.key).scrollIntoView({ behavior: "smooth", block: "start" });
    });
    navLinks.append(link);
    editor.append(section.type === "list" ? renderListSection(section) : renderObjectSection(section));
  });

  setupScrollSpy();
}

// scrollspy: highlight the nav link of the section in view
function setupScrollSpy() {
  const links = {};
  $("#section-links").querySelectorAll("a").forEach((a) => (links[a.dataset.key] = a));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        Object.values(links).forEach((a) => a.classList.remove("active"));
        const key = e.target.id.replace("sec-", "");
        links[key]?.classList.add("active");
      }
    });
  }, { rootMargin: "-10% 0px -75% 0px", threshold: 0 });
  document.querySelectorAll(".section").forEach((s) => io.observe(s));
}

// section filter box
$("#section-filter").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  $("#section-links").querySelectorAll("a").forEach((a) => {
    a.style.display = a.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

// ---------- save / reset ----------
async function save() {
  if ($("#save-btn").disabled) return;
  try {
    await api("/api/content/" + PAGE, { method: "PUT", body: JSON.stringify(content) });
    markClean();
    toast("Saved — refresh the site to see changes");
  } catch (err) {
    toast(err.message, true);
  }
}
$("#save-btn").addEventListener("click", save);
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); save(); }
});

$("#reset-btn").addEventListener("click", async () => {
  if (!confirm("Reset this page to the original built-in content? This discards your edits.")) return;
  try {
    const { data } = await api("/api/content/" + PAGE + "/reset", { method: "POST" });
    content = data;
    render();
    markClean();
    toast("Reset to default");
  } catch (err) {
    toast(err.message, true);
  }
});

// ---------- page switching ----------
function setChrome(mode) {
  const isMsg = mode === "messages";
  $("#save-btn").style.display = isMsg ? "none" : "";
  $("#reset-btn").style.display = isMsg ? "none" : "";
  document.querySelector(".section-nav").style.display = isMsg ? "none" : "";
  // With the nav hidden, force a single-column grid so the editor fills the width
  // (otherwise it auto-places into the empty 220px nav column).
  document.querySelector(".layout").style.gridTemplateColumns = isMsg ? "1fr" : "";
  if (isMsg) { $("#dirty").classList.add("hidden"); $("#saved").classList.add("hidden"); }
}

async function loadPage(page) {
  PAGE = page;
  $("#page-select").value = page;
  if (page === "__messages__") {
    setChrome("messages");
    $("#view-site").href = "/pages/contact.html";
    await renderMessages();
    markClean();
    return;
  }
  setChrome("content");
  [schema, content] = await Promise.all([api("/api/schema/" + page), api("/api/content/" + page)]);
  $("#view-site").href = PAGE_URL(page);
  render();
  markClean();
}

$("#page-select").addEventListener("change", async (e) => {
  const next = e.target.value;
  if (dirty && !confirm("You have unsaved changes. Discard them and switch pages?")) {
    e.target.value = PAGE;
    return;
  }
  await loadPage(next);
});

// ---------- messages inbox ----------
async function refreshUnreadBadge() {
  try {
    const { count } = await api("/api/messages/unread-count");
    const opt = $("#page-select").querySelector('option[value="__messages__"]');
    if (opt) opt.textContent = "\u{1F4EC} Messages" + (count ? ` (${count})` : "");
  } catch {}
}

async function renderMessages() {
  const editor = $("#editor");
  editor.innerHTML = "";
  const wrap = el("div", { class: "section" });
  const refresh = el("button", { class: "btn-ghost btn-tiny", type: "button" }, "Refresh");
  refresh.addEventListener("click", () => { renderMessages(); refreshUnreadBadge(); });
  wrap.append(el("div", { class: "msg-head" }, el("h2", {}, "Messages"), refresh));

  let msgs;
  try { msgs = await api("/api/messages"); }
  catch (err) { wrap.append(el("div", { class: "empty-state" }, err.message)); editor.append(wrap); return; }

  if (!msgs.length) {
    wrap.append(el("div", { class: "empty-state" }, "No messages yet. Contact-form submissions will appear here."));
    editor.append(wrap);
    return;
  }

  msgs.forEach((m) => {
    const card = el("div", { class: "msg-card" + (m.read ? "" : " unread") });
    const dateStr = (() => { try { return new Date(m.created_at).toLocaleString(); } catch { return m.created_at; } })();
    const reply = el("a", { class: "btn-ghost btn-tiny", href: "mailto:" + m.email + "?subject=" + encodeURIComponent("Re: your message to Transform Ventures") }, "Reply");
    const readBtn = el("button", { class: "btn-ghost btn-tiny", type: "button" }, m.read ? "Mark unread" : "Mark read");
    readBtn.addEventListener("click", async () => {
      await api("/api/messages/" + m.id + "/read", { method: "POST", body: JSON.stringify({ read: !m.read }) }).catch(() => {});
      renderMessages(); refreshUnreadBadge();
    });
    const del = el("button", { class: "btn-ghost btn-danger btn-tiny", type: "button" }, "Delete");
    del.addEventListener("click", async () => {
      if (!confirm("Delete this message?")) return;
      await api("/api/messages/" + m.id, { method: "DELETE" }).catch(() => {});
      renderMessages(); refreshUnreadBadge();
    });
    card.append(
      el("div", { class: "msg-top" },
        el("div", { class: "msg-from" },
          el("span", { class: "msg-name" }, m.name || "(no name)"),
          el("a", { class: "msg-email", href: "mailto:" + m.email }, m.email)),
        el("span", { class: "msg-date" }, dateStr)),
      m.topic ? el("div", { class: "msg-topic" }, m.topic) : null,
      el("div", { class: "msg-body" }, m.message),
      el("div", { class: "msg-actions" }, reply, readBtn, del)
    );
    wrap.append(card);
  });
  editor.append(wrap);
}

// ---------- boot ----------
async function boot() {
  $("#login").classList.add("hidden");
  $("#app").classList.remove("hidden");
  const pages = await api("/api/pages");
  const sel = $("#page-select");
  sel.innerHTML = "";
  pages.forEach((p) => sel.append(el("option", { value: p.key }, p.label)));
  sel.append(el("option", { value: "__messages__" }, "\u{1F4EC} Messages"));
  refreshUnreadBadge();
  await loadPage("home");
}

(async function init() {
  if (await checkAuth()) boot();
  else {
    $("#login").classList.remove("hidden");
    $("#app").classList.add("hidden");
  }
})();
