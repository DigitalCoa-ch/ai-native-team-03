// OG GBS — AI Job Demand Tracker
// Landing page for AI Native Enterprise course project

const BADGES = [
  { label: 'AI Native Enterprise · Day 1 Prototype', color: 'sky' },
  { label: 'International Management Track', color: 'indigo' },
];

const PROBLEM = {
  emoji: '😩',
  title: 'The Problem',
  body: 'Post-grad students searching for their first job feel lost. The process of finding, researching, and applying to positions across multiple countries is slow, fragmented, and exhausting.',
};

const AUDIENCE = {
  emoji: '🎓',
  title: 'Who We Help',
  body: 'Post-graduate International Management students who are actively job-hunting globally — navigating roles across many countries, industries, and platforms simultaneously.',
};

const PAIN = {
  emoji: '🌍',
  title: 'The Pain Point',
  body: 'Understanding which roles are most in-demand globally requires manually scrolling LinkedIn, Indeed, and dozens of other sources. The data is outdated the moment you collect it. The work never ends.',
};

const SOLUTION = {
  emoji: '🤖',
  title: 'Our AI-Native Solution',
  body: 'An AI service that continuously researches and aggregates global job demand data — classifying roles by country, industry, and frequency, and keeping results fresh. A human reviewer has the final say before any insight is delivered.',
};

const WHY_AI = [
  {
    title: 'Scale',
    detail: 'AI scans thousands of postings worldwide in minutes. A human team would take days for the same coverage.',
    icon: '⚡',
  },
  {
    title: 'Speed',
    detail: 'Real-time updating means students always see current demand, not last month\'s snapshot.',
    icon: '🔄',
  },
  {
    title: 'Continuous Monitoring',
    detail: 'AI runs 24/7. Market shifts, new roles, and emerging trends are caught automatically.',
    icon: '🕐',
  },
];

const OXYGEN = {
  emoji: '🫁',
  title: 'Oxygen Test',
  subtitle: 'What if we remove AI?',
  result: 'Severely degraded.',
  detail:
    'Without AI, the product collapses from a real-time global research engine to a static report updated monthly. Scale and update frequency are impossible to replicate manually. The core value — "what jobs are in demand, where, right now" — disappears.',
  verdict: 'Product is AI-native. AI is the core engine, not a feature.',
};

const PERCH_RISKS: { risk: string; detail: string; severity: 'high' | 'medium' | 'low' }[] = [
  {
    risk: 'Data Sourcing',
    detail: 'Where does the AI collect data? LinkedIn, Indeed, Glassdoor? Are these sources reliable? This is our biggest technical risk — unresolved.',
    severity: 'high',
  },
  {
    risk: 'LinkedIn Competition',
    detail: 'LinkedIn already aggregates postings and has job recommendation features. We must demonstrate clear added value through global demand analysis, not just listing jobs.',
    severity: 'medium',
  },
  {
    risk: 'Evidence Base',
    detail: 'Current evidence is assumption-driven (team\'s own experience). No external data cited yet. We need real student interviews and market validation.',
    severity: 'medium',
  },
  {
    risk: 'Scope Creep',
    detail: 'Students may want interview prep or CV feedback more than job discovery. The prototype direction needs to narrow based on real user feedback.',
    severity: 'low',
  },
];

const TEAM = [
  { role: 'A — Business Logic', name: 'Daria' },
  { role: 'B — Workflow & Risk', name: 'Maruxa' },
  { role: 'C — Prototype & Tools', name: 'Sofya' },
];

const NEXT_STEPS = [
  'Build the interactive prototype (job demand dashboard)',
  'Conduct user interviews with fellow IM students',
  'Resolve data sourcing strategy',
  'Add real job demand data (mock or API)',
  'Validate against LinkedIn\'s existing features',
];

function Badge({ label, color }: { label: string; color: 'sky' | 'indigo' | 'amber' }) {
  const styles: Record<string, string> = {
    sky: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
    indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs border font-medium ${styles[color]}`}>
      {label}
    </span>
  );
}

function Card({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 card-glow">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{emoji}</span>
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs font-mono uppercase tracking-widest text-sky-400">{label}</span>
      <div className="h-px flex-1 bg-slate-800" />
    </div>
  );
}

function SeverityDot({ severity }: { severity: 'high' | 'medium' | 'low' }) {
  const colors: Record<string, string> = { high: 'bg-red-400', medium: 'bg-amber-400', low: 'bg-emerald-400' };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[severity]} mr-2`} />;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy text-slate-200">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-navy/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold gradient-text">OG GBS</span>
            <span className="text-xs text-slate-500 hidden sm:inline">AI Job Demand Tracker</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge label="Day 1 · Concept" color="sky" />
            <Badge label="AI Native Enterprise" color="indigo" />
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <header className="text-center py-16 px-4">
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {BADGES.map(b => <Badge key={b.label} label={b.label} color={b.color as 'sky' | 'indigo'} />)}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">OG GBS</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
          AI-powered global job demand research — helping International Management students find the right path after graduation.
        </p>
        <div className="flex gap-3 justify-center flex-wrap text-sm text-slate-500">
          <span>Team: Daria · Maruxa · Sofya</span>
          <span className="text-slate-700">·</span>
          <span>AI Native Enterprise Course</span>
        </div>
      </header>

      {/* ── PROBLEM / AUDIENCE / PAIN (3-column cards) ─────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <SectionLabel label="The Concept" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card emoji={PROBLEM.emoji} title={PROBLEM.title} body={PROBLEM.body} />
          <Card emoji={AUDIENCE.emoji} title={AUDIENCE.title} body={AUDIENCE.body} />
          <Card emoji={PAIN.emoji} title={PAIN.title} body={PAIN.body} />
        </div>
      </section>

      {/* ── SOLUTION ───────────────────────────────────────────── */}
      <section className="bg-slate-800/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <SectionLabel label="AI-Native Solution" />
          <div className="flex items-start gap-4 mt-4">
            <span className="text-3xl mt-1">{SOLUTION.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-200 mb-3">{SOLUTION.title}</h2>
              <p className="text-slate-400 leading-relaxed max-w-3xl">{SOLUTION.body}</p>
              <div className="mt-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20 inline-block">
                <p className="text-sm text-emerald-300">
                  <strong>Human-in-the-Loop:</strong> A reviewer has final oversight before any AI-generated insight is delivered to students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY AI MATTERS ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <SectionLabel label="Why AI is Essential" />
        <h2 className="text-2xl font-bold text-slate-200 mt-4 mb-6">Three reasons AI cannot be removed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WHY_AI.map(item => (
            <div key={item.title} className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700 text-center card-glow">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OXYGEN TEST ─────────────────────────────────────────── */}
      <section className="bg-slate-800/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <SectionLabel label="Oxygen Test" />
          <div className="mt-4 bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">{OXYGEN.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-slate-200 mb-1">{OXYGEN.title}</h2>
                <p className="text-slate-400 text-sm">{OXYGEN.subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Result without AI</div>
                <div className="text-lg font-bold text-red-300">{OXYGEN.result}</div>
              </div>
              <div className="md:col-span-2 bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">What breaks</div>
                <p className="text-sm text-slate-300 leading-relaxed">{OXYGEN.detail}</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-300 font-medium">✅ Verdict: {OXYGEN.verdict}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERCH EVIDENCE & RISKS ──────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <SectionLabel label="Evidence & Risks (PERCH)" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Evidence column */}
          <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">📊 Evidence Base</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 text-sm mt-0.5">✓</span>
                <p className="text-sm text-slate-400">Team experience as IM students approaching graduation — first-hand pain point observation.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 text-sm mt-0.5">⚠</span>
                <p className="text-sm text-slate-400">No external market data cited yet. Evidence is currently assumption-driven.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-600 text-sm mt-0.5">○</span>
                <p className="text-sm text-slate-500">LinkedIn's existing job aggregation partially addresses job discovery — our differentiator must be clearly defined.</p>
              </div>
            </div>
          </div>
          {/* Risks column */}
          <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">⚠ Key Risks</h3>
            <div className="space-y-4">
              {PERCH_RISKS.map(r => (
                <div key={r.risk} className="flex items-start gap-2">
                  <SeverityDot severity={r.severity} />
                  <div>
                    <p className="text-sm font-medium text-slate-200">{r.risk}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEPS ───────────────────────────────────────────── */}
      <section className="bg-slate-800/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <SectionLabel label="What's Next" />
          <h2 className="text-2xl font-bold text-slate-200 mt-4 mb-6">Interactive Prototype — coming Day 2</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {NEXT_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-3 bg-slate-800/40 rounded-xl px-4 py-3 border border-slate-700">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs flex items-center justify-center font-mono font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-300">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-sky-500/10 border border-sky-400/20">
            <p className="text-sm text-sky-300 text-center">
              <strong>Note:</strong> This page explains the concept. The interactive prototype — an AI-powered job demand dashboard — will be built and improved next.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <SectionLabel label="The Team" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {TEAM.map(member => (
            <div key={member.name} className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700 text-center card-glow">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/30 mx-auto mb-3 flex items-center justify-center text-sky-300 font-bold">
                {member.name[0]}
              </div>
              <div className="text-lg font-semibold text-slate-200">{member.name}</div>
              <div className="text-xs text-slate-500 mt-1">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 text-center text-slate-600 text-xs pb-8 pt-6">
        OG GBS · AI Native Enterprise Course · International Management Track · 2026
      </footer>
    </div>
  );
}
