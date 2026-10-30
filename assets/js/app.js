/* Punyaraj Sonawane — portfolio app (React + Framer Motion + htm, no build step) */
(function(){
"use strict";
var e = React.createElement;
var html = htm.bind(e);
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useMemo = React.useMemo, useCallback = React.useCallback;
var M = Motion;
var motion = M.motion, AnimatePresence = M.AnimatePresence, useScroll = M.useScroll, useSpring = M.useSpring, useTransform = M.useTransform,
    useMotionValue = M.useMotionValue, useMotionTemplate = M.useMotionTemplate, useInView = M.useInView, animate = M.animate,
    useReducedMotion = M.useReducedMotion, LayoutGroup = M.LayoutGroup, MotionConfig = M.MotionConfig;

var EASE = [0.16, 1, 0.3, 1];
var EMAIL = "Punyaraj7122004@gmail.com";
var GITHUB = "https://github.com/Punyaraj7";
var LINKEDIN = "https://www.linkedin.com/in/punyaraj7122004";
var FINE = typeof matchMedia === "function" && matchMedia("(pointer: fine)").matches;

/* ================= data ================= */
var SECTIONS = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "powerbi", label: "Power BI" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" }
];
var NAV = ["work", "powerbi", "skills", "experience", "education", "certifications", "contact"];

var TYPED = [
  "building Power BI reports on live API data",
  "writing SQL that answers business questions",
  "automating Python → SQL → Power BI refreshes",
  "turning stakeholder feedback into a backlog"
];

var TOOLS_A = ["Python", "pandas", "NumPy", "SQL", "PostgreSQL", "SQL Server", "MySQL", "Power BI", "DAX", "Power Query", "Excel"];
var TOOLS_B = ["Matplotlib", "Seaborn", "scikit-learn", "Jupyter", "pytest", "SQLite", "GitHub", "Jira", "Confluence", "Claude", "MCP connectors"];

var PROJECTS = [
  {
    id: "fusionlive", featured: true, title: "FusionLive analytics: ETL pipeline and Power BI dashboard", cats: ["Python", "SQL", "Power BI"], year: "2026", org: "Idox Group",
    stack: ["Python", "pandas", "Requests", "SQLite", "Power BI", "DAX", "Power Query"],
    blurb: "An end-to-end analytics solution for the FusionLive platform. Data is extracted from the REST API, transformed in Python and loaded into SQLite, then modelled in Power BI to report on workspace status, user activity and module adoption.",
    what: "Give stakeholders a single, reliable view of platform usage: which workspaces are active, how users engage, and which modules are adopted across the customer base.",
    how: "Designed and built a Python ETL pipeline that extracts JSON from the FusionLive REST API, transforms it into structured tables and loads it into SQLite. Connected Power BI to the database and built the data model, DAX measures and report pages.",
    result: "An eight-page Power BI dashboard covering workspaces, companies, users and module adoption, supported by documented metric definitions that keep reporting consistent across teams.",
    flow: ["REST API", "Python ETL", "SQLite", "Power BI"],
    steps: [
      ["Extract", "Python (Requests) retrieves workspace, company, user and module data from the FusionLive REST API in JSON format."],
      ["Transform", "pandas flattens the nested JSON into structured tables, then cleans and preprocesses them to standardise fields and prepare the data for analysis. Intermediate outputs are stored as CSV."],
      ["Load", "The transformed tables are loaded into a SQLite database, providing a single, queryable source of truth for reporting."],
      ["Model and visualise", "Power BI connects directly to SQLite. Power Query shapes the tables, DAX measures define the KPIs, and the report pages present the results."]
    ],
    pages: [
      ["Workspace overview", "Workspace status (live, rollout, offline, expired), top owners and creation trend"],
      ["Companies", "Company and system types, with SSO and MFA coverage"],
      ["Users", "Active, inactive and barred users by company"],
      ["Module adoption", "Module enablement by workspace and by module"],
      ["Adoption tiers", "Modules grouped as core (40%+), moderate (10–40%), low (<10%) and dormant (≤2%)"],
      ["Workspace × module", "Heatmap of enabled and disabled modules per workspace"],
      ["Workspace × feature type", "Adoption by feature family"],
      ["Module co-occurrence", "Modules most frequently enabled together"]
    ],
    defs: [
      ["Active workspace", "Status is Live and the end date has not passed."],
      ["Active user", "Not barred, with a login in the last 60 days."],
      ["Adoption %", "Enabled workspace–module combinations as a share of all possible combinations."]
    ],
    security: [
      "API credentials are stored in environment variables (.env) and never committed.",
      "Production data files (database, CSV and raw JSON) are excluded from version control.",
      "The dashboard is distributed as a .pbit template that contains no data."
    ],
    roadmap: ["Scheduled, automated refresh", "Migration to a cloud database (SQL Server or Microsoft Fabric)", "Historical trend tracking"],
    link: "https://github.com/Punyaraj7/Fusion-Live-Analytics-Pipeline-Dashboard", preview: "pipe"
  },
  {
    id: "netflix", title: "Netflix catalogue SQL analysis", cats: ["SQL"], year: "2025", org: "Personal project",
    stack: ["PostgreSQL"],
    blurb: "Fifteen business questions answered against the Netflix titles catalogue.",
    stats: [{ v: "15", l: "business questions" }, { v: "12", l: "column schema" }],
    what: "Questions about content mix, ratings, genres, country coverage, directors and cast.",
    how: "Designed the table schema, then used UNNEST with STRING_TO_ARRAY to split multi-value fields, plus SPLIT_PART, date functions, subqueries and CASE classification.",
    result: "Top countries and genres by volume, India’s release trend by year, the most-featured actors, and a keyword-based content classification.",
    link: "https://github.com/Punyaraj7/Netflix_SQL_Project", preview: "table"
  },
  {
    id: "aerofit", title: "Aerofit treadmill customer analysis", cats: ["Python"], year: "2025", org: "Personal project",
    stack: ["Python", "pandas", "Matplotlib", "Seaborn"],
    blurb: "Exploratory analysis of who buys which treadmill, to guide marketing and product positioning.",
    stats: [{ v: "3", l: "product tiers" }, { v: "4", l: "segment dimensions" }],
    what: "Understand the customer profile behind each of Aerofit’s three treadmills: KP281, KP481 and KP781.",
    how: "Descriptive, univariate and bivariate analysis, segmenting buyers by income, age, education and fitness level.",
    result: "KP281 is the most popular model; higher income and education go with the premium KP781; partnered customers buy more across every model.",
    link: "https://github.com/Punyaraj7/Data-Analyst-Project-EDA-on-AeroFit-Treadmill-Buyer", preview: "scatter"
  }
];
var FILTERS = ["All", "Power BI", "SQL", "Python"];

var QUERIES = [
  {
    file: "top_countries.sql",
    question: "Which five countries have the most content on Netflix?",
    why: "The country column holds several countries in one cell, so a plain GROUP BY undercounts. Splitting it into an array and unnesting gives one row per country before counting.",
    tech: ["UNNEST", "STRING_TO_ARRAY", "GROUP BY ordinal", "LIMIT"],
    code: "-- One row per country, then count titles\nSELECT\n  UNNEST(STRING_TO_ARRAY(country, ',')) AS new_country,\n  COUNT(show_id) AS total_content\nFROM netflix\nGROUP BY 1\nORDER BY 2 DESC\nLIMIT 5;"
  },
  {
    file: "long_running_shows.sql",
    question: "Which TV shows have more than five seasons?",
    why: "Duration is stored as text like “7 Seasons”. Taking the first token and casting it to an integer turns it into something you can compare.",
    tech: ["SPLIT_PART", "Type casting", "Filtering"],
    code: "-- Duration is text, e.g. '7 Seasons'\nSELECT *\nFROM netflix\nWHERE type = 'TV Show'\n  AND SPLIT_PART(duration, ' ', 1)::INT > 5;"
  },
  {
    file: "content_tone.sql",
    question: "How much of the catalogue mentions violence?",
    why: "A CASE expression labels each title from keywords in its description; the outer query counts each label. A simple, explainable classification without any model.",
    tech: ["CASE", "ILIKE", "Subquery", "Aggregation"],
    code: "SELECT category, COUNT(*) AS content_count\nFROM (\n  SELECT\n    CASE\n      WHEN description ILIKE '%kill%'\n        OR description ILIKE '%violence%' THEN 'Bad'\n      ELSE 'Good'\n    END AS category\n  FROM netflix\n) AS categorized_content\nGROUP BY category;"
  }
];

var SKILLS = [
  { s: "Power BI", n: "Reports, drill-through, filters", w: 1, p: 0, c: 0 },
  { s: "DAX and Power Query", n: "Measures and data shaping", w: 1, p: 0, c: 0 },
  { s: "SQL", n: "PostgreSQL, SQL Server, MySQL, SQLite", w: 1, p: 1, c: 0 },
  { s: "Python and pandas", n: "Extraction, cleaning, analysis", w: 1, p: 1, c: 1 },
  { s: "Matplotlib and Seaborn", n: "Exploratory charts", w: 0, p: 1, c: 1 },
  { s: "Machine learning", n: "Regression, classification, evaluation", w: 0, p: 1, c: 1 },
  { s: "Testing with pytest", n: "Unit tests for extraction scripts", w: 1, p: 0, c: 0 },
  { s: "Claude and MCP connectors", n: "Jira and Confluence context, prototyping", w: 1, p: 0, c: 1 },
  { s: "Requirements and documentation", n: "Metric definitions, field mappings, specs", w: 1, p: 0, c: 0 }
];

var EXPERIENCE = [
  {
    when: "2026 — present", title: "Data Analyst Apprentice", org: "Idox Group, Pune · FusionLive Analytics",
    items: [
      "Delivered a Power BI report with Summary and Verbose views on live API data, with interactive filters and drill-through.",
      "Built a monthly Python → SQL → Power BI refresh with version-controlled scripts, pytest unit tests and a SQL schema for history.",
      "Created Support Ticket Intelligence, Module Adoption, Feature Usage Heatmap and Workspace Lifecycle pages.",
      "Used Claude with Jira and Confluence MCP connectors to pull project context, prototype data views and speed up documentation.",
      "Authored requirements, metric definitions, API field mappings and data source maps.",
      "Wrote a module integration spec on my own and turned team feedback into a prioritised backlog."
    ]
  }
];
var EDUCATION = [
  { when: "2025 — 2027", title: "Master of Computer Applications", org: "Uttaranchal University · in progress" },
  { when: "2022 — 2025", title: "Bachelor of Computer Applications", org: "Sri Balaji University, Pune · CGPA 7.86 / 10" },
  { when: "2021 — 2022", title: "Higher Secondary Certificate (12th)", org: "Kendriya Vidyalaya, Bhusawal · 70%" }
];
var CERTIFICATIONS = [
  { when: "2026", title: "Claude course", org: "Anthropic Academy" },
  { when: "2025", title: "Advanced Certification in Data Science and AI", org: "3RI Technologies" },
  { when: "2024", title: "Python Programming", org: "LinkedIn Learning" }
];

/* ================= helpers ================= */
function cx() { return Array.prototype.slice.call(arguments).filter(Boolean).join(" "); }
function goTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}
function openExternal(url) { window.open(url, "_blank", "noopener"); }

var RESUME_URL = "assets/resume/Punyaraj_Sonawane_CV_Data_Analyst.pdf";
function downloadResume() {
  var a = document.createElement("a");
  a.href = RESUME_URL; a.download = "Punyaraj_Sonawane_CV_Data_Analyst.pdf";
  document.body.appendChild(a); a.click(); a.remove();
}
function copyText(text, toast) {
  var done = function () { toast("Email copied to clipboard"); };
  var fallback = function () {
    try {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      var ok = document.execCommand("copy"); ta.remove();
      ok ? done() : toast(text);
    } catch (e) { toast(text); }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
  else fallback();
}

/* ================= icons ================= */
function Icon(props) {
  var p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  var paths = {
    arrow: html`<path d="M5 12h14M13 6l6 6-6 6"/>`,
    down: html`<path d="M12 4v12M6 11l6 6 6-6M5 20h14"/>`,
    mail: html`<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>`,
    copy: html`<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>`,
    github: html`<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>`,
    linkedin: html`<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/>`,
    sun: html`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`,
    moon: html`<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>`,
    search: html`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`,
    hash: html`<path d="M5 9h14M5 15h14M10 3 8 21M16 3l-2 18"/>`,
    close: html`<path d="M6 6l12 12M18 6 6 18"/>`,
    play: html`<path d="M7 5v14l11-7z"/>`,
    pause: html`<path d="M8 5v14M16 5v14"/>`,
    ext: html`<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>`
  };
  return e("svg", Object.assign(p, { width: props.size || 18, height: props.size || 18 }), paths[props.name]);
}

/* ================= toast ================= */
function useToast() {
  var s = useState(null), msg = s[0], setMsg = s[1];
  var t = useRef(0);
  var show = useCallback(function (m) {
    setMsg(m); clearTimeout(t.current);
    t.current = setTimeout(function () { setMsg(null); }, 2600);
  }, []);
  var node = html`<${AnimatePresence}>${msg && html`<${motion.div} key=${msg} className="toast" role="status"
      style=${{ x: "-50%" }} initial=${{ opacity: 0, y: 16, scale: .96 }} animate=${{ opacity: 1, y: 0, scale: 1 }} exit=${{ opacity: 0, y: 10 }}
      transition=${{ duration: .35, ease: EASE }}>${msg}<//>`}<//>`;
  return [show, node];
}

/* ================= theme ================= */
function useTheme() {
  var s = useState(function () { return document.documentElement.getAttribute("data-theme") || "dark"; });
  var theme = s[0], setTheme = s[1];
  useEffect(function () {
    document.documentElement.setAttribute("data-theme", theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", theme === "dark" ? "#06080F" : "#F3F4F9");
    try { localStorage.setItem("ps-theme", theme); } catch (err) {}
  }, [theme]);
  var toggle = useCallback(function () { setTheme(function (t) { return t === "dark" ? "light" : "dark"; }); }, []);
  return [theme, toggle];
}

/* ================= loader ================= */
function Loader(props) {
  var s = useState(0), pct = s[0], setPct = s[1];
  var heights = [.35, .6, .45, .8, .55, .95, .7, 1];
  useEffect(function () {
    var c = animate(0, 100, { duration: 1.25, ease: [0.65, 0, 0.35, 1], onUpdate: function (v) { setPct(Math.round(v)); },
      onComplete: function () { setTimeout(props.onDone, 180); } });
    return function () { c.stop(); };
  }, []);
  return html`<${motion.div} className="loader" aria-hidden="true"
      exit=${{ clipPath: "inset(0 0 100% 0)" }} initial=${{ clipPath: "inset(0 0 0% 0)" }}
      transition=${{ duration: .8, ease: [0.76, 0, 0.24, 1] }}>
    <div className="loader-in">
      <div className="bars">${heights.map(function (h, i) {
        return html`<${motion.span} key=${i} style=${{ height: (h * 64) + "px" }}
          initial=${{ scaleY: 0 }} animate=${{ scaleY: 1 }} transition=${{ delay: i * .08, duration: .7, ease: EASE }} />`;
      })}</div>
      <div className="loader-pct mono">Loading portfolio ${pct}%</div>
    </div>
  <//>`;
}

/* ================= cursor + spotlight ================= */
function Cursor() {
  var x = useMotionValue(-100), y = useMotionValue(-100);
  var rx = useSpring(x, { stiffness: 380, damping: 32, mass: .4 }), ry = useSpring(y, { stiffness: 380, damping: 32, mass: .4 });
  var s = useState({ hover: false, label: "", down: false, hidden: true }), st = s[0], set = s[1];
  useEffect(function () {
    document.body.classList.add("has-cursor");
    var root = document.documentElement, raf = 0, lx = 0, ly = 0;
    function move(ev) {
      x.set(ev.clientX); y.set(ev.clientY); lx = ev.clientX; ly = ev.clientY;
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; root.style.setProperty("--mx", lx + "px"); root.style.setProperty("--my", ly + "px"); });
      var t = ev.target && ev.target.closest ? ev.target.closest("a,button,[data-cursor],input") : null;
      var label = t && t.getAttribute("data-cursor") || "";
      set(function (p) { return (p.hover === !!t && p.label === label && !p.hidden) ? p : Object.assign({}, p, { hover: !!t, label: label, hidden: false }); });
    }
    function down() { set(function (p) { return Object.assign({}, p, { down: true }); }); }
    function up() { set(function (p) { return Object.assign({}, p, { down: false }); }); }
    function leave() { set(function (p) { return Object.assign({}, p, { hidden: true }); }); }
    addEventListener("mousemove", move, { passive: true });
    addEventListener("mousedown", down); addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return function () {
      document.body.classList.remove("has-cursor");
      removeEventListener("mousemove", move); removeEventListener("mousedown", down); removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);
  var size = st.label ? 84 : st.hover ? 56 : 36;
  return html`<${React.Fragment}>
    <${motion.div} className="cursor-ring" aria-hidden="true" style=${{ x: rx, y: ry }}
      animate=${{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, opacity: st.hidden ? 0 : 1,
        scale: st.down ? .85 : 1, backgroundColor: st.label ? "var(--ink)" : "rgba(0,0,0,0)", borderColor: st.hover ? "var(--a2)" : "var(--line-2)" }}
      transition=${{ type: "spring", stiffness: 300, damping: 26 }}>${st.label}<//>
    <${motion.div} className="cursor-dot" aria-hidden="true" style=${{ x: x, y: y }} animate=${{ opacity: st.hidden || st.label ? 0 : 1 }} />
  <//>`;
}

/* ================= magnetic ================= */
function Magnetic(props) {
  var ref = useRef(null);
  var x = useMotionValue(0), y = useMotionValue(0);
  var sx = useSpring(x, { stiffness: 220, damping: 14, mass: .25 }), sy = useSpring(y, { stiffness: 220, damping: 14, mass: .25 });
  var strength = props.strength || .3;
  function onMove(ev) {
    if (!FINE) return;
    var r = ref.current.getBoundingClientRect();
    x.set((ev.clientX - (r.left + r.width / 2)) * strength);
    y.set((ev.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() { x.set(0); y.set(0); }
  return html`<${motion.div} ref=${ref} style=${{ x: sx, y: sy, display: "inline-flex" }} onMouseMove=${onMove} onMouseLeave=${reset}>${props.children}<//>`;
}

/* ================= reveal ================= */
function Reveal(props) {
  return html`<${motion.div} className=${props.className} style=${props.style}
    initial=${{ opacity: 0, y: 28, filter: "blur(6px)" }} whileInView=${{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport=${{ once: true, margin: "-80px" }} transition=${{ duration: .9, ease: EASE, delay: props.delay || 0 }}>${props.children}<//>`;
}

/* ================= three.js data field ================= */
function DataField(props) {
  var ref = useRef(null);
  var themeRef = useRef(props.theme);
  themeRef.current = props.theme;
  var reduced = props.reduced;
  useEffect(function () {
    var T = window.THREE, el = ref.current;
    if (!T || !el) return;
    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" }); }
    catch (err) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(48, 1, .1, 100);
    var small = window.innerWidth < 760;
    var NX = small ? 44 : 86, NZ = small ? 28 : 48, SP = small ? .2 : .17;
    var count = NX * NZ;
    var pos = new Float32Array(count * 3), col = new Float32Array(count * 3), bx = new Float32Array(count), bz = new Float32Array(count);
    var i = 0;
    for (var ix = 0; ix < NX; ix++) for (var iz = 0; iz < NZ; iz++) {
      bx[i] = (ix - NX / 2) * SP; bz[i] = (iz - NZ / 2) * SP;
      pos[i * 3] = bx[i]; pos[i * 3 + 2] = bz[i]; i++;
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.BufferAttribute(pos, 3));
    geo.setAttribute("color", new T.BufferAttribute(col, 3));
    var mat = new T.PointsMaterial({ size: small ? .055 : .05, vertexColors: true, transparent: true, opacity: .95, depthWrite: false, sizeAttenuation: true });
    var pts = new T.Points(geo, mat);
    pts.rotation.y = -.35;
    scene.add(pts);
    var cA = new T.Color(), cB = new T.Color(), cC = new T.Color(), tmp = new T.Color();
    var lastTheme = null;
    function setPalette() {
      var dark = themeRef.current === "dark";
      cA.set(dark ? "#45D9C6" : "#0A8C7D"); cB.set(dark ? "#8F93FF" : "#4B51DE"); cC.set(dark ? "#F07AB0" : "#C43D7A");
      mat.blending = dark ? T.AdditiveBlending : T.NormalBlending; mat.opacity = dark ? .95 : .8; mat.needsUpdate = true;
      lastTheme = themeRef.current;
    }
    setPalette();
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    function onMove(ev) { mouse.tx = (ev.clientX / window.innerWidth) * 2 - 1; mouse.ty = (ev.clientY / window.innerHeight) * 2 - 1; }
    window.addEventListener("mousemove", onMove, { passive: true });
    function resize() {
      var w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.set(w < 760 ? 0 : -1.2, 3.1, w < 760 ? 10.5 : 8.6);
      camera.lookAt(w < 760 ? 0 : -1.2, -.2, 0);
      camera.updateProjectionMatrix();
    }
    var ro = new ResizeObserver(resize); ro.observe(el); resize();
    var visible = true, raf = 0, t0 = performance.now();
    function frame(now) {
      var t = (now - t0) / 1000;
      if (lastTheme !== themeRef.current) setPalette();
      mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
      var mxw = mouse.x * (NX * SP) * .45, mzw = mouse.y * (NZ * SP) * .45;
      for (var k = 0; k < count; k++) {
        var x = bx[k], z = bz[k];
        var dx = x - mxw, dz = z - mzw, d2 = dx * dx + dz * dz;
        var y = .32 * Math.sin(x * .55 + t * .7) * Math.cos(z * .45 + t * .5) + .18 * Math.sin((x + z) * .9 - t * 1.1) + 1.05 * Math.exp(-d2 / 2.2);
        pos[k * 3 + 1] = y;
        var h = Math.max(0, Math.min(1, (y + .5) / 1.6));
        if (h < .5) tmp.copy(cA).lerp(cB, h * 2); else tmp.copy(cB).lerp(cC, (h - .5) * 2);
        var fade = 1 - Math.min(1, Math.abs(z) / (NZ * SP * .55)) * .55;
        col[k * 3] = tmp.r * fade; col[k * 3 + 1] = tmp.g * fade; col[k * 3 + 2] = tmp.b * fade;
      }
      geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
      pts.rotation.y = -.35 + mouse.x * .12; pts.rotation.x = mouse.y * .05;
      renderer.render(scene, camera);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame); else raf = 0;
    }
    var io = new IntersectionObserver(function (en) {
      visible = en[0].isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    function vis() { if (!document.hidden && visible && !raf && !reduced) raf = requestAnimationFrame(frame); }
    document.addEventListener("visibilitychange", vis);
    raf = requestAnimationFrame(frame);
    var themeTimer = reduced ? setInterval(function () { if (lastTheme !== themeRef.current) frame(performance.now()); }, 300) : 0;
    return function () {
      cancelAnimationFrame(raf); clearInterval(themeTimer); io.disconnect(); ro.disconnect();
      window.removeEventListener("mousemove", onMove); document.removeEventListener("visibilitychange", vis);
      geo.dispose(); mat.dispose(); renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [reduced, props.three]);
  return html`<div className="field" ref=${ref} aria-hidden="true"></div>`;
}

/* ================= split text ================= */
function SplitText(props) {
  var words = props.text.split(" "), n = 0;
  return html`<span>
    <span className="sr-only">${props.text}</span>
    <span aria-hidden="true">${words.map(function (w, wi) {
      return html`<span className="word" key=${wi}>${w.split("").map(function (c, ci) {
        var idx = n++;
        return html`<${motion.span} key=${ci} className="ch"
          initial=${{ y: "105%", rotate: 8, opacity: 0 }}
          animate=${props.play ? { y: "0%", rotate: 0, opacity: 1 } : { y: "105%", rotate: 8, opacity: 0 }}
          transition=${{ delay: (props.delay || 0) + idx * .035, duration: .9, ease: EASE }}>${c}<//>`;
      })}</span>${wi < words.length - 1 ? " " : ""}`;
    })}</span>
  </span>`;
}

/* ================= typer ================= */
function Typer(props) {
  var reduced = props.reduced;
  var s1 = useState(0), idx = s1[0], setIdx = s1[1];
  var s2 = useState(0), n = s2[0], setN = s2[1];
  var s3 = useState(false), del = s3[0], setDel = s3[1];
  useEffect(function () {
    if (reduced || !props.play) return;
    var full = TYPED[idx], t;
    if (!del && n < full.length) t = setTimeout(function () { setN(n + 1); }, 34 + Math.random() * 30);
    else if (!del) t = setTimeout(function () { setDel(true); }, 1900);
    else if (n > 0) t = setTimeout(function () { setN(n - 1); }, 16);
    else t = setTimeout(function () { setDel(false); setIdx((idx + 1) % TYPED.length); }, 280);
    return function () { clearTimeout(t); };
  }, [n, del, idx, reduced, props.play]);
  var text = reduced ? TYPED[0] : TYPED[idx].slice(0, n);
  return html`<p className="typer mono">
    <span className="sr-only">Currently ${TYPED.join(", ")}.</span>
    <span aria-hidden="true"><span className="prompt">›</span> Currently ${text}<span className="caret"></span></span>
  </p>`;
}

/* ================= hero ================= */
function FloatingChips() {
  var mx = useMotionValue(0), my = useMotionValue(0);
  var sx = useSpring(mx, { stiffness: 50, damping: 18 }), sy = useSpring(my, { stiffness: 50, damping: 18 });
  useEffect(function () {
    function m(ev) { mx.set(ev.clientX / innerWidth - .5); my.set(ev.clientY / innerHeight - .5); }
    addEventListener("mousemove", m, { passive: true });
    return function () { removeEventListener("mousemove", m); };
  }, []);
  var chips = [
    { t: "Power BI", c: "var(--a3)", x: "8%", y: "4%", d: 40, dl: 0 },
    { t: "SQL", c: "var(--a1)", x: "58%", y: "16%", d: -60, dl: 1.2 },
    { t: "Python", c: "var(--a2)", x: "22%", y: "38%", d: 80, dl: .6 },
    { t: "DAX", c: "var(--a4)", x: "66%", y: "52%", d: -30, dl: 2 },
    { t: "pandas", c: "var(--a2)", x: "4%", y: "70%", d: 55, dl: 1.6 },
    { t: "Power Query", c: "var(--a3)", x: "40%", y: "84%", d: -45, dl: .3 }
  ];
  return html`<div className="chips" aria-hidden="true">${chips.map(function (c, i) {
    return html`<${Chip} key=${c.t} c=${c} i=${i} sx=${sx} sy=${sy} />`;
  })}</div>`;
}
function Chip(props) {
  var c = props.c;
  var x = useTransform(props.sx, function (v) { return v * c.d; });
  var y = useTransform(props.sy, function (v) { return v * c.d; });
  return html`<${motion.div} style=${{ position: "absolute", left: c.x, top: c.y, x: x, y: y }}
      initial=${{ opacity: 0, scale: .8 }} animate=${{ opacity: 1, scale: 1 }} transition=${{ delay: 1.1 + props.i * .1, duration: .8, ease: EASE }}>
    <div className="chip glass chip-float" style=${{ animationDelay: c.dl + "s", position: "relative" }}><i style=${{ background: c.c }}></i>${c.t}</div>
  <//>`;
}

function Hero(props) {
  var ref = useRef(null);
  var sc = useScroll({ target: ref, offset: ["start start", "end start"] });
  var y = useTransform(sc.scrollYProgress, [0, 1], [0, 140]);
  var op = useTransform(sc.scrollYProgress, [0, .8], [1, 0]);
  var play = props.ready;
  var show = function (d) {
    return { initial: { opacity: 0, y: 18 }, animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }, transition: { delay: d, duration: .9, ease: EASE } };
  };
  return html`<section className="hero" id="top" ref=${ref} aria-label="Introduction">
    <${DataField} theme=${props.theme} reduced=${props.reduced} three=${props.three} />
    <${motion.div} className="wrap hero-inner" style=${{ y: y, opacity: op }}>
      <div>
        <h1 className="hero-name"><${SplitText} text="Punyaraj Sonawane" play=${play} delay=${.15} /></h1>
        <${motion.p} className="hero-role" ...${show(.7)}>Data Analyst Apprentice at Idox Group, Pune<//>
        <${motion.div} ...${show(.9)}><${Typer} reduced=${props.reduced} play=${play} /><//>
        <${motion.div} className="hero-cta" ...${show(1.05)}>
          <${Magnetic}><button className="btn btn-primary" onClick=${function () { goTo("work"); }} data-cursor="View">See my work <${Icon} name="arrow" /></button><//>
          <${Magnetic}><button className="btn" onClick=${props.onResume}><${Icon} name="down" /> Download résumé</button><//>
        <//>
      </div>
      <${FloatingChips} />
    <//>
    <${motion.div} className="scroll-cue" aria-hidden="true" initial=${{ opacity: 0 }} animate=${{ opacity: play ? 1 : 0 }} transition=${{ delay: 1.6 }}><span></span>Scroll<//>
  </section>`;
}

/* ================= marquee ================= */
function Marquee() {
  function row(list, rev) {
    var all = list.concat(list);
    return html`<div className=${cx("marquee-row", rev && "rev")}>${all.map(function (t, i) {
      return html`<span className="tag" key=${i} aria-hidden=${i >= list.length ? "true" : null}><i></i>${t}</span>`;
    })}</div>`;
  }
  return html`<div className="marquee" role="region" aria-label="Tools I work with">${row(TOOLS_A)}${row(TOOLS_B, true)}</div>`;
}

/* ================= KPIs ================= */
function Counter(props) {
  var ref = useRef(null);
  var inView = useInView(ref, { once: true, margin: "-60px" });
  var s = useState(props.reduced ? props.to : 0), v = s[0], setV = s[1];
  useEffect(function () {
    if (!inView || props.reduced) return;
    var c = animate(0, props.to, { duration: 1.8, ease: EASE, onUpdate: function (x) { setV(Math.round(x)); } });
    return function () { c.stop(); };
  }, [inView]);
  return html`<span ref=${ref}>${v}</span>`;
}
function Spark(props) {
  var ref = useRef(null);
  var inView = useInView(ref, { once: true });
  return html`<svg className="kpi-spark" viewBox="0 0 70 28" ref=${ref} aria-hidden="true">
    <${motion.path} d=${props.d} fill="none" stroke=${props.c} strokeWidth="2" strokeLinecap="round"
      initial=${{ pathLength: 0 }} animate=${{ pathLength: inView ? 1 : 0 }} transition=${{ duration: 1.6, ease: EASE, delay: .2 }} />
  </svg>`;
}
function KPIs(props) {
  var items = [
    { n: 15, l: "SQL business questions answered", d: "M2 24 L14 18 L26 20 L38 10 L50 13 L68 3", c: "var(--a1)" },
    { n: 8, l: "pages in the FusionLive Power BI report", d: "M2 22 L12 22 L12 14 L24 14 L24 18 L36 18 L36 8 L48 8 L48 4 L68 4", c: "var(--a3)" },
    { n: 8, l: "public repositories on GitHub", d: "M2 20 Q18 2 34 14 T68 6", c: "var(--a2)" },
    { n: 3, l: "certifications in data, Python and AI", d: "M2 24 L24 16 L46 10 L68 3", c: "var(--a4)" }
  ];
  return html`<section aria-label="Highlights" style=${{ paddingTop: "clamp(64px,8vw,96px)", paddingBottom: 0 }}>
    <div className="wrap kpis">${items.map(function (k, i) {
      return html`<${Reveal} key=${i} delay=${i * .08} className="glass kpi">
        <${Spark} d=${k.d} c=${k.c} />
        <div className="kpi-num"><${Counter} to=${k.n} reduced=${props.reduced} /></div>
        <div className="kpi-label">${k.l}</div>
      <//>`;
    })}</div>
  </section>`;
}

/* ================= dashboard showcase ================= */
var PAGES = ["Workspace overview", "Companies", "Users", "Module adoption", "Adoption tiers", "Workspace × modules", "Workspace × feature type"];
function fmt(n) { return Number(n).toLocaleString("en-US"); }
function seeded(n) { var x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x); }

function Tiles(props) {
  return html`<div className="tiles" style=${{ gridTemplateColumns: "repeat(auto-fit,minmax(128px,1fr))" }}>${props.items.map(function (t, i) {
    return html`<${motion.div} key=${t.l} className="tile" initial=${{ opacity: 0, y: 10 }} animate=${{ opacity: 1, y: 0 }} transition=${{ delay: i * .05 }}><b>${t.v}</b><span>${t.l}</span><//>`;
  })}</div>`;
}

function Donut(props) {
  var data = props.data, total = data.reduce(function (a, d) { return a + d.v; }, 0);
  var R = 52, C = 2 * Math.PI * R, acc = 0;
  var f = props.focus ? data.filter(function (d) { return d.k === props.focus; })[0] : null;
  var c = f || data[0];
  var pct = function (v) { return (v / total * 100).toFixed(1) + "%"; };
  var label = props.title + ": " + data.map(function (d) { return d.k + " " + fmt(d.v) + " (" + pct(d.v) + ")"; }).join(", ");
  return html`<div>
    <svg viewBox="0 0 140 140" width="100%" style=${{ maxWidth: 180, display: "block", margin: "0 auto" }} role="img" aria-label=${label}>
      <g transform="rotate(-90 70 70)">${data.map(function (s, i) {
        var len = s.v / total * C, off = acc; acc += len;
        var active = !f || f.k === s.k;
        return html`<${motion.circle} key=${s.k} cx="70" cy="70" r=${R} fill="none" stroke=${s.c} strokeDashoffset=${-off}
          initial=${{ strokeDasharray: "0 " + C, opacity: 0, strokeWidth: 12 }}
          animate=${{ strokeDasharray: len + " " + (C - len), opacity: active ? 1 : .22, strokeWidth: active ? 16 : 11 }}
          transition=${{ duration: .9, delay: i * .12, ease: EASE }} />`;
      })}</g>
      <text x="70" y="68" textAnchor="middle" fontSize="20" fontWeight="650" fill="var(--ink)">${pct(c.v)}</text>
      <text x="70" y="85" textAnchor="middle" fontSize="9.5" fill="var(--muted)">${c.k} · ${fmt(c.v)}</text>
    </svg>
    <div className="legend" style=${{ justifyContent: "center" }}>${data.map(function (s) { return html`<span key=${s.k}><i style=${{ background: s.c }}></i>${s.k} ${fmt(s.v)}</span>`; })}</div>
  </div>`;
}

function HBar(props) {
  var max = props.max || Math.max.apply(null, props.items.map(function (x) { return x[1]; }));
  var f = props.fmt || fmt;
  var body = html`<div role="img" aria-label=${props.title + ": " + props.items.map(function (x) { return x[0] + " " + f(x[1]); }).join(", ")}>${props.items.map(function (it, i) {
    return html`<div key=${it[0] + i} className="hbar" style=${{ gridTemplateColumns: (props.labelW || 150) + "px minmax(0,1fr) 46px" }}>
      <span className="hbar-l" title=${it[0]}>${it[0]}</span>
      <div className="hbar-t"><${motion.div} className="hbar-f" style=${{ width: (it[1] / max * 100) + "%", background: props.color || "linear-gradient(90deg,var(--a2),var(--a1))" }}
        initial=${{ scaleX: 0 }} animate=${{ scaleX: 1 }} transition=${{ delay: Math.min(i * .04, .6), duration: .8, ease: EASE }} /></div>
      <span className="hbar-v mono">${f(it[1])}</span>
    </div>`;
  })}</div>`;
  return props.scroll ? html`<div className="scroll" style=${{ maxHeight: props.scroll }}>${body}</div>` : body;
}

function DTable(props) {
  return html`<div className="scroll" style=${{ maxHeight: props.maxH || 300 }}>
    <table className="dtable">
      <thead><tr>${props.cols.map(function (c, i) { return html`<th key=${c} scope="col" className=${i > 0 ? "n" : ""}>${c}</th>`; })}</tr></thead>
      <tbody>${props.rows.map(function (r, ri) { return html`<tr key=${ri}>${r.map(function (v, i) { return html`<td key=${i} className=${i > 0 ? "n" : ""}>${typeof v === "number" ? fmt(v) : v}</td>`; })}</tr>`; })}</tbody>
      ${props.total && html`<tfoot><tr>${props.total.map(function (v, i) { return html`<td key=${i} className=${i > 0 ? "n" : ""}>${typeof v === "number" ? fmt(v) : v}</td>`; })}</tr></tfoot>`}
    </table>
  </div>`;
}

function CreationTrend() {
  var v = [2, 9, 4, 3, 6, 2, 5, 3, 2, 4, 3, 6, 3, 2, 5, 4, 3, 7, 4, 3, 5, 9, 4, 6, 12, 5, 20, 8, 15, 6, 48, 10, 22, 14, 60, 18, 8, 290, 6];
  var W = 420, H = 170, P = 12, max = 300;
  var pts = v.map(function (y, i) { return [P + i * (W - 2 * P) / (v.length - 1), H - 22 - y / max * (H - 34)]; });
  var d = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
  var years = ["2022", "2023", "2024", "2025", "2026"];
  return html`<svg viewBox=${"0 0 " + W + " " + H} width="100%" role="img" aria-label="Workspace creation over time, 2022 to 2026: low and steady until 2025, then a sharp spike in 2026">
    ${[0, 1, 2, 3].map(function (g) { var yy = 12 + g * (H - 34) / 3; return html`<line key=${g} x1=${P} x2=${W - P} y1=${yy} y2=${yy} stroke="var(--line)" />`; })}
    <${motion.path} d=${d} fill="none" stroke="var(--a1)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
      initial=${{ pathLength: 0 }} animate=${{ pathLength: 1 }} transition=${{ duration: 1.6, ease: EASE }} />
    ${years.map(function (y, i) { return html`<text key=${y} x=${P + i * (W - 2 * P) / 4.4 + 10} y=${H - 4} fontSize="10" fill="var(--faint)">${y}</text>`; })}
  </svg>`;
}

function StatusBar(props) {
  var total = props.data.reduce(function (a, d) { return a + d.v; }, 0);
  return html`<div>
    <div className="sbar" role="img" aria-label=${props.data.map(function (d) { return d.k + " " + fmt(d.v); }).join(", ")}>${props.data.map(function (d, i) {
      return html`<${motion.span} key=${d.k} style=${{ width: (d.v / total * 100) + "%", background: d.c }} initial=${{ scaleX: 0 }} animate=${{ scaleX: 1 }} transition=${{ delay: i * .15, duration: .8, ease: EASE }} />`;
    })}</div>
    <div className="legend">${props.data.map(function (d) { return html`<span key=${d.k}><i style=${{ background: d.c }}></i>${d.k} ${(d.v / total * 100).toFixed(1)}%</span>`; })}</div>
  </div>`;
}

var HM_COLS = ["WS 01", "WS 02", "WS 03", "WS 04", "WS 05", "WS 06", "WS 07", "WS 08"];
var HM_ROWS = [
  ["Workspace Level Upload", "01100100"], ["Work Packages", "00010000"], ["Validate Revision", "01100100"],
  ["Unique Reference Number", "11101111"], ["Transmittal", "11111111"], ["Technical Query Viewer/Admin Role", "00000010"],
  ["Technical Query", "00000110"], ["Tasks and Roles", "00000011"], ["Tag management", "00010100"], ["Tag Extraction", "00010100"],
  ["Sub Projects", "00000111"], ["Show Approval status in document list", "00000010"], ["RFI Viewer/Admin Role", "01100100"],
  ["RFI", "01101110"], ["Revise without attachments (web service)", "00000000"], ["Reviews", "01100100"],
  ["Restrict Issue Transmittals for empty Revision", "00000000"], ["Restrict Document Revision to Originating Company", "00000000"],
  ["Restrict attachment access", "00000010"], ["Reprographics", "01100111"], ["Rendition Security", "10010000"],
  ["Rendition", "11110010"], ["Property Constraints", "11110111"], ["Projects Online", "11111111"]
];
var HM_TOTALS = [14, 41, 41, 24, 13, 45, 30, 19];

function ModuleHeatmap() {
  return html`<div className="hm">
    <table>
      <caption className="sr-only">Modules enabled per workspace. 1 means enabled, 0 means disabled.</caption>
      <thead><tr><th className="row" scope="col">Module</th>${HM_COLS.map(function (c) { return html`<th key=${c} scope="col">${c}</th>`; })}</tr></thead>
      <tbody>${HM_ROWS.map(function (r, ri) {
        return html`<tr key=${r[0]}><th className="row" scope="row" title=${r[0]}>${r[0]}</th>${r[1].split("").map(function (b, ci) {
          var on = b === "1";
          return html`<${motion.td} key=${ci} className="mono" style=${{ background: on ? "var(--hm-on)" : "var(--hm-off)", color: on ? "var(--hm-on-ink)" : "var(--muted)" }}
            initial=${{ opacity: 0, scale: .6 }} animate=${{ opacity: 1, scale: 1 }} transition=${{ delay: Math.min((ri + ci) * .015, .7), duration: .3 }}>${b}<//>`;
        })}</tr>`;
      })}</tbody>
      <tfoot><tr><th className="row" scope="row">Enabled, all 92 modules</th>${HM_TOTALS.map(function (t, i) { return html`<td key=${i} className="mono" style=${{ fontWeight: 600, color: "var(--ink)" }}>${t}</td>`; })}</tr></tfoot>
    </table>
    <div className="legend"><span><i style=${{ background: "var(--hm-on)" }}></i>Enabled</span><span><i style=${{ background: "var(--hm-off)" }}></i>Disabled</span><span>Showing 24 of 92 modules and 8 of 596 workspaces</span></div>
  </div>`;
}

var FT_COLS = ["BI_SUITE", "BIM_INTEGRATION", "BULK_REVISION", "CAD", "CONTACT_VISIBILITY", "CONTACTS", "DMS_INTEGRATION", "DOCUMENT_MANAGER", "EMAIL_OUT"];
var FT_ROWS = [
  [0, 0, 0, 0, 0, 1, 0, .18, 0], [1, 0, 0, 0, 1, 1, 0, .54, 1], [1, 0, 0, 0, 1, 1, 0, .54, 1], [0, 0, 0, 1, 0, 1, 0, .28, 1],
  [0, 0, 0, 0, 0, 1, 0, .10, 0], [1, .33, 1, 0, 1, 1, 0, .62, 1], [1, 0, 0, 1, 0, 1, 0, .26, 1], [1, 0, 0, 0, 0, 1, 0, .23, 1],
  [1, 0, 0, 0, 0, 1, 0, .21, 1], [1, 0, 0, 0, 0, 1, 0, .44, 1], [1, .33, 0, 1, 0, 1, 0, .44, 1], [0, 0, 0, 1, 0, 1, 0, .21, 1]
];
var FT_TOTALS = [.23, .06, .01, .13, .03, 1, 0, .22, .88];

function FeatureMatrix() {
  return html`<div className="hm">
    <table>
      <caption className="sr-only">Share of each feature family enabled per workspace, from 0 to 1.</caption>
      <thead><tr><th className="row" scope="col">Workspace</th>${FT_COLS.map(function (c) { return html`<th key=${c} scope="col" className="ft-h">${c.replace(/_/g, " ").toLowerCase()}</th>`; })}</tr></thead>
      <tbody>${FT_ROWS.map(function (r, ri) {
        return html`<tr key=${ri}><th className="row" scope="row">Workspace ${String(ri + 1).padStart(2, "0")}</th>${r.map(function (v, ci) {
          return html`<${motion.td} key=${ci} className="mono" style=${{ background: "rgba(var(--ft-rgb)," + (v === 0 ? .07 : .22 + v * .68) + ")", color: v >= .5 ? "#fff" : "var(--muted)" }}
            initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} transition=${{ delay: Math.min((ri + ci) * .015, .6) }}>${v.toFixed(2)}<//>`;
        })}</tr>`;
      })}</tbody>
      <tfoot><tr><th className="row" scope="row">Average, all workspaces</th>${FT_TOTALS.map(function (t, i) { return html`<td key=${i} className="mono" style=${{ fontWeight: 600, color: "var(--ink)" }}>${t.toFixed(2)}</td>`; })}</tr></tfoot>
    </table>
    <div className="legend"><span>Showing 9 of 25 feature types and 12 workspaces. Stronger colour means a larger share of that feature family is enabled.</span></div>
  </div>`;
}

function Dashboard(props) {
  var s1 = useState(0), page = s1[0], setPage = s1[1];
  var s2 = useState(!props.reduced), auto = s2[0], setAuto = s2[1];
  var s3 = useState(null), focus = s3[0], setFocus = s3[1];
  var s4 = useState(false), hover = s4[0], setHover = s4[1];
  var ref = useRef(null);
  var inView = useInView(ref, { margin: "-120px" });
  var DUR = 7;
  var prog = useMotionValue(0);
  useEffect(function () {
    if (!auto || !inView || hover) return;
    prog.set(0);
    var c = animate(prog, 1, { duration: DUR, ease: "linear", onComplete: function () { setPage(function (p) { return (p + 1) % PAGES.length; }); } });
    return function () { c.stop(); };
  }, [page, auto, inView, hover]);
  function pick(i) { setPage(i); setAuto(false); }
  var STATUS = [{ k: "Live", v: 435, c: "var(--a2)" }, { k: "Rollout", v: 99, c: "var(--a1)" }, { k: "Offline", v: 62, c: "var(--a3)" }];
  var body;
  if (page === 0) body = html`<div>
      <${Tiles} items=${[{ v: "596", l: "Total workspaces" }, { v: "381", l: "Active workspaces" }, { v: "52", l: "Rollout workspaces" }, { v: "62", l: "Offline workspaces" }]} />
      <div className="panels even">
        <div className="panel"><h4>Workspace status</h4><${Donut} title="Workspace status" data=${STATUS} focus=${focus} /></div>
        <div className="panel"><h4>Expired live vs expired rollout</h4><${Donut} title="Expired workspaces" data=${[{ k: "Expired live", v: 54, c: "var(--a4)" }, { k: "Expired rollout", v: 47, c: "var(--a1)" }]} /></div>
      </div>
      <div className="panels even">
        <div className="panel"><h4>Top companies by workspaces</h4><${DTable} maxH=${230} cols=${["Owning company", "Workspaces"]}
          rows=${[["Company A", 261], ["Company B", 85], ["Company C", 78], ["Company D", 73], ["Company E", 17], ["Company F", 12], ["Company G", 7], ["Company H", 6], ["Company I", 4], ["Company J", 4], ["Company K", 4], ["Company L", 3], ["Company M", 3], ["Company N", 3]]}
          total=${["Total", 596]} /></div>
        <div className="panel"><h4>Workspace creation over time</h4><${CreationTrend} /></div>
      </div>
    </div>`;
  else if (page === 1) body = html`<div>
      <${Tiles} items=${[{ v: "965", l: "Total companies" }, { v: "965", l: "Active companies" }, { v: "6", l: "SSO enabled" }, { v: "0", l: "MFA enabled" }]} />
      <div className="panels even">
        <div className="panel"><h4>Company structure</h4><${HBar} title="Company structure" labelW=${168}
          items=${[["Standard company", 884], ["Owner operator", 31], ["Enterprise company", 24], ["External company", 23], ["System owner company", 3]]} color="var(--a3)" /></div>
        <div className="panel"><h4>Company type analysis</h4><${DTable} maxH=${250} cols=${["Company type", "Count"]}
          rows=${[["Client", 508], ["Building Contractor", 171], ["Other", 133], ["Public Sector", 16], ["Government Body", 12], ["Sub Contractor", 12], ["Engineering", 11], ["Project Management", 11], ["Architectural Practice", 10], ["Reprographics House", 7], ["Civil Engineering Contractor", 6], ["Commercial Developer", 6], ["Quantity Surveyor", 6]]}
          total=${["Total", 965]} /></div>
      </div>
    </div>`;
  else if (page === 2) body = html`<div>
      <${Tiles} items=${[{ v: "31", l: "Active users" }, { v: "2,911", l: "Inactive users" }, { v: "92", l: "Barred users" }, { v: "3,034", l: "Total users" }]} />
      <div className="panels even">
        <div className="panel"><h4>User activity status</h4><${Donut} title="User activity status" data=${[{ k: "Inactive", v: 2911, c: "var(--a1)" }, { k: "Barred", v: 92, c: "var(--a4)" }, { k: "Active", v: 31, c: "var(--a2)" }]} /></div>
        <div className="panel"><h4>Status counts</h4>
          <${StatusBar} data=${[{ k: "Active", v: 31, c: "var(--a2)" }, { k: "Inactive", v: 2911, c: "var(--a1)" }, { k: "Barred", v: 92, c: "var(--a4)" }]} />
          <div style=${{ marginTop: 14 }}><${DTable} cols=${["User activity status", "Users"]} rows=${[["Active user", 31], ["Barred user", 92], ["Inactive user", 2911]]} total=${["Total", 3034]} /></div>
        </div>
      </div>
    </div>`;
  else if (page === 3) body = html`<div>
      <${Tiles} items=${[{ v: "596", l: "Total workspaces" }, { v: "92", l: "Total modules" }]} />
      <div className="panels even">
        <div className="panel"><h4>Module adoption across workspaces</h4><${HBar} title="Workspaces with each module enabled" scroll=${300} labelW=${170} max=${596}
          items=${[["Contacts", 596], ["Document Manager", 596], ["Projects Online", 596], ["Document Lifecycle", 555], ["Unique Reference Number", 542], ["Email Out", 527], ["Make PDFTron default viewer", 491], ["Document Category", 274], ["Process Manager", 266], ["Document Pre-registration", 260], ["Document Numbering", 258], ["Document Linking", 245], ["Transmittal", 238], ["Property Constraints", 231], ["Approval", 219], ["Rendition", 218]]} /></div>
        <div className="panel"><h4>Modules enabled per workspace</h4><${HBar} title="Modules enabled per workspace" scroll=${300} labelW=${110} max=${48} color="var(--a3)"
          items=${[48, 47, 47, 47, 47, 46, 46, 46, 45, 45, 45, 45, 45, 45, 45, 45].map(function (v, i) { return ["Workspace " + String(i + 1).padStart(2, "0"), v]; })} /></div>
      </div>
    </div>`;
  else if (page === 4) body = html`<div>
      <${Tiles} items=${[{ v: "92", l: "Total modules" }, { v: "12", l: "Core, 40%+" }, { v: "34", l: "Moderate, 10–40%" }, { v: "46", l: "Low, under 10%" }, { v: "17.26%", l: "Overall adoption" }]} />
      <div className="panels even">
        <div className="panel"><h4>Module concentration by adoption tier</h4><${HBar} title="Adoption rate by module" scroll=${300} labelW=${170} max=${1} fmt=${function (x) { return x.toFixed(2); }}
          items=${[["Contacts", 1], ["Document Manager", 1], ["Projects Online", 1], ["Document Lifecycle", .93], ["Unique Reference Number", .91], ["Email Out", .88], ["Make PDFTron default viewer", .82], ["Document Category", .46], ["Process Manager", .45], ["Document Pre-registration", .44], ["Document Numbering", .43], ["Document Linking", .41], ["Transmittal", .40], ["Property Constraints", .39], ["Approval", .37], ["Rendition", .37], ["Deliverables Management", .36], ["RFI", .33], ["Technical Query", .28], ["Work Packages", .24], ["Folder Management", .24]]} /></div>
        <div className="panel"><h4>Dormant modules, 2% adoption or less</h4><${DTable} maxH=${300} cols=${["Module", "Enabled"]}
          rows=${[["Restrict Issue Transmittals for empty Revision or Reason for Issue", 7], ["Restrict Document Revision to Originating Company", 1], ["Project Direct Document Search Role", 4], ["No match", 0], ["module_view_charts", 0], ["module_imports_from_xml", 1], ["module_flint", 10], ["Forced Alerting", 11], ["DMS Integration", 0]]}
          total=${["Total, all dormant modules", 63]} /></div>
      </div>
    </div>`;
  else if (page === 5) body = html`<div className="panel"><h4>Which modules each workspace has enabled</h4><${ModuleHeatmap} /></div>`;
  else body = html`<div>
      <${Tiles} items=${[{ v: "25", l: "Feature types" }, { v: "1.00", l: "Contacts adoption" }, { v: "0.88", l: "Email Out adoption" }, { v: "0.22", l: "Document Manager adoption" }]} />
      <div className="panel"><h4>Adoption by feature family per workspace</h4><${FeatureMatrix} /></div>
    </div>`;
  return html`<section id="powerbi" aria-labelledby="pbi-h">
    <div className="wrap">
      <${Reveal} className="sec-head">
        <h2 className="sec-title" id="pbi-h">Inside a Power BI report I built</h2>
        <p className="sec-lead">Seven pages from the FusionLive report, rebuilt from the original. They track workspaces, companies, users and module adoption across the platform.</p>
      <//>
      <${Reveal} delay=${.1}>
        <div className="glass dash" ref=${ref} onMouseEnter=${function () { setHover(true); }} onMouseLeave=${function () { setHover(false); }}>
          <div className="dash-side" role="tablist" aria-label="Report pages">
            <div className="dash-file mono"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="11" width="4" height="10" rx="1" fill="var(--a3)"/><rect x="10" y="6" width="4" height="15" rx="1" fill="var(--a3)" opacity=".75"/><rect x="17" y="2" width="4" height="19" rx="1" fill="var(--a3)" opacity=".5"/></svg>FusionLive.pbix</div>
            ${PAGES.map(function (p, i) {
              var on = i === page;
              return html`<button key=${p} className="dash-tab" role="tab" aria-selected=${on} onClick=${function () { pick(i); }}>
                ${on && html`<${motion.span} layoutId="dash-bg" className="dash-tab-bg" transition=${{ type: "spring", stiffness: 400, damping: 34 }} />`}
                <span className="mono dash-num">${i + 1}</span>${p}
                ${on && auto && html`<${motion.span} className="dash-tab-bar" style=${{ scaleX: prog }} />`}
              </button>`;
            })}
            <button className="dash-tab" onClick=${function () { setAuto(!auto); }} style=${{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <${Icon} name=${auto ? "pause" : "play"} size=${15} />${auto ? "Pause tour" : "Play tour"}
            </button>
          </div>
          <div className="dash-main" role="tabpanel" aria-label=${PAGES[page]}>
            <div className="dash-top">
              <h3 className="dash-title">${PAGES[page]}</h3>
              ${page === 0 && html`<div className="seg" role="group" aria-label="Highlight a workspace status">${[null, "Live", "Rollout", "Offline"].map(function (k) {
                var on = focus === k;
                return html`<button key=${k || "all"} aria-pressed=${on} onClick=${function () { setFocus(k); setAuto(false); }}>
                  ${on && html`<${motion.span} layoutId="seg-bg" className="seg-bg" transition=${{ type: "spring", stiffness: 400, damping: 34 }} />`}${k || "All"}</button>`;
              })}</div>`}
            </div>
            <${AnimatePresence} mode="wait">
              <${motion.div} key=${page} initial=${{ opacity: 0, y: 12, filter: "blur(4px)" }} animate=${{ opacity: 1, y: 0, filter: "blur(0px)" }} exit=${{ opacity: 0, y: -8, filter: "blur(4px)" }} transition=${{ duration: .45, ease: EASE }}>${body}<//>
            <//>
            <p className="dash-note">Figures come from the FusionLive report. Company and workspace names are anonymised to protect client data.</p>
          </div>
        </div>
      <//>
    </div>
  </section>`;
}

/* ================= project previews (animated, auto-playing) ================= */
function Preview(props) {
  var kind = props.kind, hot = props.hot;
  var dur = hot ? 1.6 : 4;
  if (kind === "dash") {
    var hs = [40, 64, 52, 80, 58, 92, 70];
    return html`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect x="16" y="16" width="288" height="148" rx="12" fill="var(--glass)" stroke="var(--line)" />
      <rect x="30" y="30" width="60" height="22" rx="6" fill="var(--line)" /><rect x="98" y="30" width="60" height="22" rx="6" fill="var(--line)" /><rect x="166" y="30" width="60" height="22" rx="6" fill="var(--line)" />
      ${hs.map(function (h, i) {
        return html`<${motion.rect} key=${i} x=${34 + i * 20} y=${150 - h * .5} height=${h * .5} width="12" rx="3" fill="var(--a3)" initial=${false}
          animate=${{ height: [h * .5, h * .9, h * .6, h * .5], attrY: [150 - h * .5, 150 - h * .9, 150 - h * .6, 150 - h * .5] }}
          transition=${{ duration: dur, repeat: Infinity, delay: i * .12, ease: "easeInOut" }} />`;
      })}
      <${motion.circle} cx="250" cy="110" r="30" fill="none" stroke="var(--a2)" strokeWidth="10" strokeDasharray="120 200" animate=${{ rotate: 360 }} transition=${{ duration: hot ? 3 : 8, repeat: Infinity, ease: "linear" }} />
      <circle cx="250" cy="110" r="30" fill="none" stroke="var(--line)" strokeWidth="10" opacity=".6" />
    </svg>`;
  }
  if (kind === "pipe") {
    var nodes = [["API", 46], ["Python", 124], ["SQLite", 202], ["Power BI", 280]];
    return html`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d="M46 90 H280" stroke="var(--line-2)" strokeWidth="2" strokeDasharray="4 6" />
      ${[0, 1, 2].map(function (k) {
        return html`<${motion.circle} key=${k} r="5" cy="90" fill="var(--a2)" style=${{ filter: "drop-shadow(0 0 6px var(--a2))" }}
          animate=${{ cx: [46, 280], opacity: [0, 1, 1, 0] }} transition=${{ duration: hot ? 1.4 : 3, repeat: Infinity, delay: k * (hot ? .45 : 1), ease: "easeInOut" }} />`;
      })}
      ${nodes.map(function (n, i) {
        return html`<g key=${n[0]}>
          <${motion.circle} cx=${n[1]} cy="90" r="22" fill="var(--bg-2)" stroke=${i === 3 ? "var(--a3)" : "var(--a1)"} strokeWidth="2"
            animate=${{ scale: [1, 1.08, 1] }} transition=${{ duration: 2, repeat: Infinity, delay: i * .5 }} />
          <text x=${n[1]} y="130" textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="Geist Mono, monospace">${n[0]}</text>
        </g>`;
      })}
    </svg>`;
  }
  if (kind === "table") {
    return html`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect x="24" y="20" width="272" height="140" rx="10" fill="var(--glass)" stroke="var(--line)" />
      <rect x="24" y="20" width="272" height="24" rx="10" fill="var(--line)" />
      ${[0, 1, 2, 3, 4].map(function (r) {
        return html`<g key=${r}>
          <rect x="36" y=${54 + r * 20} width=${60 + seeded(r) * 30} height="8" rx="4" fill="var(--line-2)" />
          <rect x="150" y=${54 + r * 20} width=${30 + seeded(r + 9) * 40} height="8" rx="4" fill="var(--line-2)" />
          <rect x="236" y=${54 + r * 20} width="40" height="8" rx="4" fill="var(--a1)" opacity=".6" />
        </g>`;
      })}
      <${motion.rect} x="28" width="264" height="18" rx="5" fill="var(--a2)" opacity=".18"
        y="49" animate=${{ attrY: [49, 69, 89, 109, 129, 49] }} transition=${{ duration: hot ? 2.2 : 5, repeat: Infinity, ease: "easeInOut" }} />
    </svg>`;
  }
  var clusters = [[90, 110, "var(--a2)"], [170, 70, "var(--a1)"], [240, 120, "var(--a4)"]];
  return html`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <path d="M30 156 H296 M30 156 V20" stroke="var(--line-2)" />
    ${clusters.map(function (c, ci) {
      return Array.from({ length: 11 }).map(function (_, i) {
        var a = seeded(ci * 31 + i) * Math.PI * 2, r = 6 + seeded(ci * 17 + i * 3) * 26;
        return html`<${motion.circle} key=${ci + "-" + i} cx=${c[0] + Math.cos(a) * r} cy=${c[1] + Math.sin(a) * r * .7} r="4" fill=${c[2]}
          animate=${{ scale: [1, 1.5, 1], opacity: [.6, 1, .6] }}
          transition=${{ duration: hot ? 1.2 : 3, repeat: Infinity, delay: (i + ci * 3) * .12 }} />`;
      });
    })}
  </svg>`;
}

/* ================= project card + modal ================= */
function ProjectCard(props) {
  var p = props.p;
  var ref = useRef(null);
  var rx = useMotionValue(0), ry = useMotionValue(0), mx = useMotionValue(50), my = useMotionValue(50);
  var srx = useSpring(rx, { stiffness: 160, damping: 18 }), sry = useSpring(ry, { stiffness: 160, damping: 18 });
  var spot = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, var(--glow), transparent 55%)`;
  var s = useState(false), hot = s[0], setHot = s[1];
  function move(ev) {
    if (!FINE || props.reduced) return;
    var r = ref.current.getBoundingClientRect();
    var px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
    ry.set((px - .5) * 10); rx.set((.5 - py) * 10); mx.set(px * 100); my.set(py * 100);
  }
  function leave() { rx.set(0); ry.set(0); setHot(false); }
  return html`<${motion.div} layout className=${cx("card", p.featured && "featured")} key=${p.id}
      initial=${{ opacity: 0, y: 30, scale: .97 }} animate=${{ opacity: 1, y: 0, scale: 1 }} exit=${{ opacity: 0, scale: .94, transition: { duration: .25 } }}
      transition=${{ duration: .6, ease: EASE }}>
    <${motion.div} ref=${ref} style=${{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", height: "100%" }}
      onMouseMove=${move} onMouseEnter=${function () { setHot(true); }} onMouseLeave=${leave}>
      <${motion.button} layoutId=${"card-" + p.id} className="card-btn" onClick=${function () { props.onOpen(p); }} onFocus=${function () { setHot(true); }} onBlur=${function () { setHot(false); }}
        data-cursor="Open" aria-label=${"Open case study: " + p.title}>
        <${motion.div} className="card-spot" style=${{ background: spot, opacity: hot ? 1 : 0 }} />
        <div className="preview"><${Preview} kind=${p.preview} hot=${hot} /></div>
        <div className="card-body">
          <div className="card-meta">${p.cats.concat([p.year]).map(function (c) { return html`<span className="pill" key=${c}>${c}</span>`; })}</div>
          <h3>${p.title}</h3>
          <p>${p.blurb}</p>
          ${p.flow && html`<div className="flow" aria-label=${"Pipeline: " + p.flow.join(" to ")}>${p.flow.map(function (f, i) {
            return html`<${React.Fragment} key=${f}>${i > 0 && html`<span className="arr" aria-hidden="true">→</span>`}<span className="step mono">${f}</span><//>`;
          })}</div>`}
        </div>
      <//>
    <//>
  <//>`;
}

function CaseModal(props) {
  var p = props.p;
  var closeRef = useRef(null);
  useEffect(function () {
    var prev = document.activeElement;
    setTimeout(function () { closeRef.current && closeRef.current.focus(); }, 50);
    function key(ev) { if (ev.key === "Escape") props.onClose(); }
    addEventListener("keydown", key);
    var o = document.body.style.overflow; document.body.style.overflow = "hidden";
    return function () { removeEventListener("keydown", key); document.body.style.overflow = o;
      var a = document.activeElement;
      if (prev && prev.focus && (!a || a === document.body || (a.closest && a.closest(".modal")))) prev.focus({ preventScroll: true }); };
  }, []);
  return html`<${React.Fragment}>
    <${motion.div} className="overlay" initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} exit=${{ opacity: 0 }} onClick=${props.onClose} />
    <div className="modal-wrap">
      <${motion.div} layoutId=${"card-" + p.id} className="modal" role="dialog" aria-modal="true" aria-labelledby="cs-title" style=${{ position: "relative" }}>
        <button className="close" ref=${closeRef} onClick=${props.onClose} aria-label="Close case study"><${Icon} name="close" /></button>
        <div className="preview"><${Preview} kind=${p.preview} hot=${true} /></div>
        <${motion.div} className="modal-body" initial=${{ opacity: 0, y: 14 }} animate=${{ opacity: 1, y: 0 }} transition=${{ delay: .15, duration: .5, ease: EASE }}>
          <div className="card-meta">${[p.org, p.year].concat(p.stack).map(function (c) { return html`<span className="pill" key=${c}>${c}</span>`; })}</div>
          <h3 id="cs-title">${p.title}</h3>
          <div className="cs-grid">
            ${[["Objective", p.what], ["Approach", p.how], ["Outcome", p.result]].map(function (b, i) {
              return html`<${motion.div} className="cs" key=${b[0]} initial=${{ opacity: 0, y: 12 }} animate=${{ opacity: 1, y: 0 }} transition=${{ delay: .25 + i * .08, duration: .5, ease: EASE }}>
                <h4>${b[0]}</h4><p>${b[1]}</p><//>`;
            })}
          </div>
          ${p.steps && html`<div className="cs-sec"><h4>ETL pipeline</h4><ol className="steps">${p.steps.map(function (st) {
            return html`<li key=${st[0]}><b>${st[0]}</b><span>${st[1]}</span></li>`;
          })}</ol></div>`}
          ${p.pages && html`<div className="cs-sec"><h4>Dashboard pages</h4><div className="pg-grid">${p.pages.map(function (pg) {
            return html`<div className="pg" key=${pg[0]}><b>${pg[0]}</b><span>${pg[1]}</span></div>`;
          })}</div></div>`}
          ${p.defs && html`<div className="cs-sec"><h4>Key definitions</h4><dl className="defs">${p.defs.map(function (d) {
            return html`<div key=${d[0]}><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`;
          })}</dl></div>`}
          ${p.security && html`<div className="cs-sec two">
            <div><h4>Data security</h4><ul className="cs-list">${p.security.map(function (x) { return html`<li key=${x}>${x}</li>`; })}</ul></div>
            <div><h4>Next steps</h4><ul className="cs-list">${p.roadmap.map(function (x) { return html`<li key=${x}>${x}</li>`; })}</ul></div>
          </div>`}
          <div className="modal-actions">
            <${Magnetic}><a className="btn btn-primary" href=${p.link} target="_blank" rel="noopener"><${Icon} name="github" /> View the repository</a><//>
            <button className="btn" onClick=${props.onClose}>Close</button>
          </div>
        <//>
      <//>
    </div>
  <//>`;
}

function Work(props) {
  var s = useState("All"), filter = s[0], setFilter = s[1];
  var list = PROJECTS;
  return html`<section id="work" aria-labelledby="work-h">
    <div className="wrap">
      <${Reveal} className="sec-head">
        <div>
          <h2 className="sec-title" id="work-h">Selected work</h2>
          <p className="sec-lead" style=${{ marginTop: 16 }}>My main project from the Idox apprenticeship and two from my own practice. Open any card for the full case study.</p>
        </div>
      <//>
      <${LayoutGroup}>
        <${motion.div} layout className="projects">
          <${AnimatePresence} mode="popLayout">${list.map(function (p) {
            return html`<${ProjectCard} key=${p.id} p=${p} onOpen=${props.onOpen} reduced=${props.reduced} />`;
          })}<//>
        <//>
      <//>
    </div>
  </section>`;
}

/* ================= SQL showcase ================= */
var KW = /\b(SELECT|FROM|WHERE|GROUP|BY|ORDER|DESC|ASC|LIMIT|AS|AND|OR|CASE|WHEN|THEN|ELSE|END|INT|NOT|NULL|IS|IN|ILIKE|LIKE|DISTINCT)\b/;
var FN = /\b(UNNEST|STRING_TO_ARRAY|COUNT|SPLIT_PART|SUM|AVG|MAX|MIN|TO_DATE|EXTRACT|ROUND)\b/;
function highlight(code) {
  var out = [], re = /(--[^\n]*)|('[^'\n]*'?)|(\b\d+\b)|(\b[A-Za-z_]+\b)|(\s+|.)/g, m, k = 0;
  while ((m = re.exec(code))) {
    if (m[1]) out.push(e("span", { key: k++, className: "t-cm" }, m[1]));
    else if (m[2]) out.push(e("span", { key: k++, className: "t-str" }, m[2]));
    else if (m[3]) out.push(e("span", { key: k++, className: "t-num" }, m[3]));
    else if (m[4]) {
      var w = m[4];
      if (FN.test(w)) out.push(e("span", { key: k++, className: "t-fn" }, w));
      else if (KW.test(w)) out.push(e("span", { key: k++, className: "t-kw" }, w));
      else out.push(w);
    } else out.push(m[5]);
  }
  return out;
}
function SQLShowcase(props) {
  var s1 = useState(0), tab = s1[0], setTab = s1[1];
  var s2 = useState(props.reduced ? 1e9 : 0), n = s2[0], setN = s2[1];
  var ref = useRef(null);
  var inView = useInView(ref, { once: true, margin: "-120px" });
  var q = QUERIES[tab];
  useEffect(function () {
    if (props.reduced) { setN(1e9); return; }
    if (!inView) return;
    setN(0);
    var c = animate(0, q.code.length, { duration: Math.min(2.6, q.code.length / 90), ease: "linear", onUpdate: function (v) { setN(Math.round(v)); } });
    return function () { c.stop(); };
  }, [tab, inView]);
  var shown = q.code.slice(0, n);
  var lines = q.code.split("\n").length;
  var typing = n < q.code.length;
  return html`<section id="sql" aria-labelledby="sql-h">
    <div className="wrap">
      <${Reveal} className="sec-head">
        <h2 className="sec-title" id="sql-h">SQL that answers the question</h2>
        <p className="sec-lead">Three queries from my Netflix catalogue analysis in PostgreSQL. Each one handles a messy column the business question depends on.</p>
      <//>
      <div className="sql" ref=${ref}>
        <${Reveal} className="glass editor">
          <div className="ed-bar" role="tablist" aria-label="Queries">${QUERIES.map(function (qq, i) {
            var on = i === tab;
            return html`<button key=${qq.file} className="ed-tab mono" role="tab" aria-selected=${on} onClick=${function () { setTab(i); }}>
              ${qq.file}${on && html`<${motion.span} layoutId="ed-line" className="ed-tab-line" />`}</button>`;
          })}</div>
          <div className="ed-body mono" role="tabpanel" aria-label=${q.file}>
            <div className="ed-lines" aria-hidden="true">${Array.from({ length: lines }).map(function (_, i) { return html`<div key=${i}>${i + 1}</div>`; })}</div>
            <pre className="ed-code"><span className="sr-only">${q.code}</span><span aria-hidden="true">${highlight(shown)}${typing && html`<span className="caret"></span>`}</span></pre>
          </div>
          <div className="ed-foot mono"><span>PostgreSQL</span><a href="https://github.com/Punyaraj7/Netflix_SQL_Project" target="_blank" rel="noopener" style=${{ color: "var(--a2)", textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center", gap: 6 }}>All 15 queries on GitHub <${Icon} name="ext" size=${14} /></a></div>
        <//>
        <${Reveal} className="glass explain" delay=${.1}>
          <${AnimatePresence} mode="wait">
            <${motion.div} key=${tab} initial=${{ opacity: 0, x: 12 }} animate=${{ opacity: 1, x: 0 }} exit=${{ opacity: 0, x: -12 }} transition=${{ duration: .35, ease: EASE }}>
              <h3>Business question</h3>
              <p className="q">${q.question}</p>
              <h3>Why it’s written this way</h3>
              <p>${q.why}</p>
              <h3>Techniques</h3>
              <div className="chips-row">${q.tech.map(function (t) { return html`<span className="pill mono" key=${t}>${t}</span>`; })}</div>
            <//>
          <//>
        <//>
      </div>
    </div>
  </section>`;
}

/* ================= skill matrix ================= */
function Skills() {
  var ref = useRef(null);
  var inView = useInView(ref, { once: true, margin: "-100px" });
  function cell(on, r, c) {
    return html`<td className="c"><${motion.span} className=${cx("dot", !on && "off")} aria-hidden="true"
      initial=${{ scale: 0 }} animate=${{ scale: inView ? 1 : 0 }} transition=${{ delay: r * .06 + c * .12, type: "spring", stiffness: 300, damping: 18 }} />
      <span className="sr-only">${on ? "Yes" : "No"}</span></td>`;
  }
  return html`<section id="skills" aria-labelledby="sk-h">
    <div className="wrap">
      <${Reveal} className="sec-head">
        <h2 className="sec-title" id="sk-h">Where each skill comes from</h2>
        <p className="sec-lead">No self-rated progress bars. This shows where I’ve actually used each skill: on the job, in a public project, or through a certification.</p>
      <//>
      <${Reveal} className="glass matrix">
        <table ref=${ref}>
          <caption className="sr-only">Skills by where they were used</caption>
          <thead><tr><th scope="col">Skill</th><th scope="col" className="c">At Idox</th><th scope="col" className="c">In projects</th><th scope="col" className="c">Certified</th></tr></thead>
          <tbody>${SKILLS.map(function (s, r) {
            return html`<tr key=${s.s}><th scope="row" style=${{ fontWeight: 550, textAlign: "left" }}>${s.s}<span className="skill-note">${s.n}</span></th>${cell(s.w, r, 0)}${cell(s.p, r, 1)}${cell(s.c, r, 2)}</tr>`;
          })}</tbody>
        </table>
      <//>
    </div>
  </section>`;
}

/* ================= timeline ================= */
function Timeline(props) {
  var ref = useRef(null);
  var sc = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  var fill = useSpring(sc.scrollYProgress, { stiffness: 120, damping: 30 });
  var s = useState(props.openFirst ? 0 : -1), open = s[0], setOpen = s[1];
  return html`<section id=${props.id} aria-labelledby=${props.id + "-h"}>
    <div className="wrap">
      <${Reveal} className="sec-head">
        <h2 className="sec-title" id=${props.id + "-h"}>${props.title}</h2>
        <p className="sec-lead">${props.lead}</p>
      <//>
      <div className="tl" ref=${ref}>
        <div className="tl-track" aria-hidden="true"><${motion.div} className="tl-fill" style=${{ scaleY: fill }} /></div>
        ${props.items.map(function (t, i) {
          var expandable = !!t.items, isOpen = open === i;
          var inner = html`<${React.Fragment}>
            <div className="tl-when mono">${t.when}</div>
            <div className="tl-title">${t.title}${expandable && html`<${motion.span} className="tl-plus" aria-hidden="true" animate=${{ rotate: isOpen ? 45 : 0 }}>+<//>`}</div>
            <div className="tl-org">${t.org}</div>
            <${AnimatePresence} initial=${false}>${expandable && isOpen && html`<${motion.ul} className="tl-list" key="l"
              initial=${{ height: 0, opacity: 0 }} animate=${{ height: "auto", opacity: 1 }} exit=${{ height: 0, opacity: 0 }} transition=${{ duration: .45, ease: EASE }} style=${{ overflow: "hidden" }}>
              ${t.items.map(function (it, k) { return html`<${motion.li} key=${k} initial=${{ opacity: 0, x: -8 }} animate=${{ opacity: 1, x: 0 }} transition=${{ delay: .08 + k * .05 }}>${it}<//>`; })}
            <//>`}<//>
          <//>`;
          return html`<${motion.div} key=${i} className="tl-item" initial=${{ opacity: 0, x: -20 }} whileInView=${{ opacity: 1, x: 0 }} viewport=${{ once: true, margin: "-60px" }} transition=${{ duration: .7, ease: EASE, delay: i * .04 }}>
            <${motion.span} className="tl-node" aria-hidden="true" initial=${{ scale: 0 }} whileInView=${{ scale: 1 }} viewport=${{ once: true }} transition=${{ type: "spring", stiffness: 300, damping: 15, delay: .2 }} />
            ${expandable
              ? html`<button className="tl-card" aria-expanded=${isOpen} onClick=${function () { setOpen(isOpen ? -1 : i); }}>${inner}</button>`
              : html`<div className="tl-card">${inner}</div>`}
          <//>`;
        })}
      </div>
    </div>
  </section>`;
}

/* ================= contact ================= */
function Contact(props) {
  return html`<section id="contact" aria-labelledby="ct-h">
    <div className="wrap">
      <${Reveal} className="glass contact">
        <div className="contact-glow" aria-hidden="true"></div>
        <h2 id="ct-h">Have a question your data should answer?</h2>
        <p>I’m looking for entry-level analyst roles in business intelligence and consulting. Email is the fastest way to reach me.</p>
        <div className="contact-actions">
          <${Magnetic} strength=${.4}><a className="btn btn-primary" href=${"mailto:" + EMAIL} data-cursor="Write"><${Icon} name="mail" /> Email me</a><//>
          <${Magnetic}><button className="btn" onClick=${function () { copyText(EMAIL, props.toast); }}><${Icon} name="copy" /> Copy email address</button><//>
          <${Magnetic}><a className="btn" href=${LINKEDIN} target="_blank" rel="noopener"><${Icon} name="linkedin" /> LinkedIn</a><//>
          <${Magnetic}><a className="btn" href=${GITHUB} target="_blank" rel="noopener"><${Icon} name="github" /> GitHub</a><//>
        </div>
      <//>
    </div>
  </section>`;
}

/* ================= command palette ================= */
function Palette(props) {
  var s1 = useState(""), q = s1[0], setQ = s1[1];
  var s2 = useState(0), sel = s2[0], setSel = s2[1];
  var input = useRef(null);
  var actions = useMemo(function () {
    var go = SECTIONS.map(function (s) { return { g: "Go to", label: s.label, icon: "hash", run: function () { goTo(s.id); } }; });
    return go.concat([
      { g: "Actions", label: "Download résumé", icon: "down", run: props.onResume },
      { g: "Actions", label: "Copy email address", icon: "copy", run: function () { copyText(EMAIL, props.toast); } },
      { g: "Actions", label: "Send an email", icon: "mail", run: function () { location.href = "mailto:" + EMAIL; } },
      { g: "Actions", label: props.theme === "dark" ? "Switch to light theme" : "Switch to dark theme", icon: props.theme === "dark" ? "sun" : "moon", run: props.onTheme },
      { g: "Links", label: "Open GitHub", icon: "github", run: function () { openExternal(GITHUB); } },
      { g: "Links", label: "Open LinkedIn", icon: "linkedin", run: function () { openExternal(LINKEDIN); } }
    ]).concat(PROJECTS.map(function (p) { return { g: "Case studies", label: p.title, icon: "arrow", run: function () { props.onOpenProject(p); } }; }));
  }, [props.theme]);
  var list = actions.filter(function (a) { return a.label.toLowerCase().indexOf(q.toLowerCase().trim()) > -1; });
  useEffect(function () { setSel(0); }, [q]);
  useEffect(function () { setTimeout(function () { input.current && input.current.focus(); }, 30); }, []);
  function run(a) { props.onClose(); setTimeout(a.run, 60); }
  function key(ev) {
    if (ev.key === "ArrowDown") { ev.preventDefault(); setSel(function (s) { return Math.min(s + 1, list.length - 1); }); }
    else if (ev.key === "ArrowUp") { ev.preventDefault(); setSel(function (s) { return Math.max(s - 1, 0); }); }
    else if (ev.key === "Enter" && list[sel]) { ev.preventDefault(); run(list[sel]); }
    else if (ev.key === "Escape") props.onClose();
  }
  var lastG = null;
  return html`<${React.Fragment}>
    <${motion.div} className="overlay" style=${{ zIndex: 400 }} initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} exit=${{ opacity: 0 }} onClick=${props.onClose} />
    <div className="pal-wrap">
      <${motion.div} className="pal" role="dialog" aria-modal="true" aria-label="Command menu"
        initial=${{ opacity: 0, scale: .96, y: -10 }} animate=${{ opacity: 1, scale: 1, y: 0 }} exit=${{ opacity: 0, scale: .97, y: -6 }} transition=${{ duration: .22, ease: EASE }}>
        <div className="pal-in"><${Icon} name="search" />
          <input ref=${input} value=${q} onChange=${function (ev) { setQ(ev.target.value); }} onKeyDown=${key}
            placeholder="Search sections, actions and case studies" aria-label="Search commands" role="combobox" aria-expanded="true" aria-controls="pal-list"
            aria-activedescendant=${list[sel] ? "pal-" + sel : null} />
          <span className="kbd">Esc</span>
        </div>
        <ul className="pal-list" id="pal-list" role="listbox">
          ${list.length === 0 && html`<li className="pal-empty">Nothing matches “${q}”. Try a section name like “SQL”.</li>`}
          ${list.map(function (a, i) {
            var head = a.g !== lastG ? html`<li className="pal-group" role="presentation" key=${"g" + a.g}>${a.g}</li>` : null;
            lastG = a.g;
            var on = i === sel;
            return [head, html`<li key=${a.g + a.label} id=${"pal-" + i} className="pal-item" role="option" aria-selected=${on}
                onMouseMove=${function () { if (sel !== i) setSel(i); }} onClick=${function () { run(a); }}>
              ${on && html`<${motion.span} layoutId="pal-hl" className="pal-hl" transition=${{ type: "spring", stiffness: 500, damping: 40 }} />`}
              <${Icon} name=${a.icon} />${a.label}${on && html`<span className="kbd">Enter</span>`}
            </li>`];
          })}
        </ul>
      <//>
    </div>
  <//>`;
}

/* ================= nav ================= */
function Nav(props) {
  var s = useState("top"), active = s[0], setActive = s[1];
  useEffect(function () {
    var els = SECTIONS.map(function (x) { return document.getElementById(x.id); }).filter(Boolean);
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) setActive(x.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach(function (el) { io.observe(el); });
    return function () { io.disconnect(); };
  }, [props.ready]);
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  return html`<${motion.nav} className="nav" aria-label="Main" initial=${{ y: -80, x: "-50%", opacity: 0 }} animate=${{ y: props.ready ? 0 : -80, x: "-50%", opacity: props.ready ? 1 : 0 }} transition=${{ duration: .9, ease: EASE, delay: .3 }}>
    <div className="nav-links">${NAV.map(function (id) {
      var sx = SECTIONS.filter(function (x) { return x.id === id; })[0];
      var on = active === id;
      return html`<button key=${id} className="nav-link" aria-current=${on ? "true" : null} onClick=${function () { goTo(id); }}>
        ${on && html`<${motion.span} layoutId="nav-pill" className="nav-pill" transition=${{ type: "spring", stiffness: 380, damping: 32 }} />`}${sx.label}</button>`;
    })}</div>
    <button className="icon-btn" onClick=${props.onPalette} aria-label="Open command menu"><${Icon} name="search" size=${16} /><span className="menu-label">Menu</span><span className="kbd">${isMac ? "⌘" : "Ctrl"} K</span></button>
    <button className="icon-btn" onClick=${props.onTheme} aria-label=${props.theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
      <${AnimatePresence} mode="wait" initial=${false}>
        <${motion.span} key=${props.theme} style=${{ display: "inline-flex" }} initial=${{ rotate: -90, opacity: 0, scale: .6 }} animate=${{ rotate: 0, opacity: 1, scale: 1 }} exit=${{ rotate: 90, opacity: 0, scale: .6 }} transition=${{ duration: .3 }}>
          <${Icon} name=${props.theme === "dark" ? "sun" : "moon"} />
        <//>
      <//>
    </button>
  <//>`;
}

/* ================= app ================= */
function ScrollProgress() {
  var sc = useScroll();
  var x = useSpring(sc.scrollYProgress, { stiffness: 140, damping: 30, restDelta: .001 });
  return html`<${motion.div} className="progress" style=${{ scaleX: x }} aria-hidden="true" />`;
}

function App() {
  var reduced = !!useReducedMotion();
  var th = useTheme(), theme = th[0], toggleTheme = th[1];
  var tt = useToast(), toast = tt[0], toastNode = tt[1];
  var s1 = useState(reduced), ready = s1[0], setReady = s1[1];
  var s2 = useState(false), pal = s2[0], setPal = s2[1];
  var s3 = useState(null), project = s3[0], setProject = s3[1];
  var s4 = useState(!!window.THREE), three = s4[0], setThree = s4[1];

  useEffect(function () {
    if (window.THREE) return;
    var load = function () {
      var sc = document.createElement("script");
      sc.src = "assets/vendor/three.min.js";
      sc.async = true; sc.onload = function () { setThree(true); };
      document.head.appendChild(sc);
    };
    if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 1200 }); else setTimeout(load, 300);
  }, []);

  useEffect(function () {
    function key(ev) {
      if ((ev.ctrlKey || ev.metaKey) && (ev.key === "k" || ev.key === "K")) { ev.preventDefault(); setPal(function (p) { return !p; }); }
      else if (ev.key === "Escape") setPal(false);
    }
    addEventListener("keydown", key);
    return function () { removeEventListener("keydown", key); };
  }, []);

  useEffect(function () {
    if (!ready) return;
    var h = (location.hash || "").slice(1);
    if (h && document.getElementById(h)) setTimeout(function () { goTo(h); }, 120);
  }, [ready]);

  var onResume = useCallback(function () { downloadResume(); }, []);

  return html`<${MotionConfig} reducedMotion="user">
    <div className="ambient" aria-hidden="true">
      <div className="aurora a"></div><div className="aurora b"></div><div className="aurora c"></div>
      <div className="grid-bg"></div><div className="noise"></div>
    </div>
    ${FINE && !reduced && html`<div className="spotlight" aria-hidden="true"></div>`}
    ${FINE && !reduced && html`<${Cursor} />`}
    <${ScrollProgress} />
    <${AnimatePresence}>${!ready && html`<${Loader} key="loader" onDone=${function () { setReady(true); }} />`}<//>
    <${Nav} theme=${theme} onTheme=${toggleTheme} onPalette=${function () { setPal(true); }} ready=${ready} />
    <main>
      <${Hero} ready=${ready} theme=${theme} reduced=${reduced} three=${three} onResume=${onResume} />
      <${Work} onOpen=${setProject} reduced=${reduced} />
      <${Dashboard} reduced=${reduced} />
      <${Skills} />
      <${Timeline} id="experience" title="Experience" lead="What I’ve shipped as a data analyst apprentice at Idox Group." items=${EXPERIENCE} openFirst=${true} />
      <${Timeline} id="education" title="Education" lead="My degrees, most recent first." items=${EDUCATION} />
      <${Timeline} id="certifications" title="Certifications" lead="Courses I’ve completed in data science, Python and AI." items=${CERTIFICATIONS} />
      <${Contact} toast=${toast} />
    </main>
    <footer><div className="wrap"><span>© 2026 Punyaraj Sonawane</span><span>Press <span className="kbd">Ctrl K</span> to jump anywhere</span></div></footer>
    <${AnimatePresence}>${project && html`<${CaseModal} key=${project.id} p=${project} onClose=${function () { setProject(null); }} />`}<//>
    <${AnimatePresence}>${pal && html`<${Palette} key="pal" theme=${theme} toast=${toast} onClose=${function () { setPal(false); }} onTheme=${toggleTheme} onResume=${onResume}
      onOpenProject=${function (p) { goTo("work"); setTimeout(function () { setProject(p); }, 450); }} />`}<//>
    ${toastNode}
  <//>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
})();
