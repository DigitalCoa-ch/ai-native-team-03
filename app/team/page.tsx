'use client';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-navy text-slate-200">
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-navy/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold gradient-text">OG GBS</a>
            <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors hidden sm:inline">AI Job Demand Tracker</a>
          </div>
          <div className="flex items-center gap-2">
            <a href="/team" className="text-sm px-3 py-1.5 rounded-lg border border-sky-500/30 text-sky-400 hover:bg-sky-500/10 transition-colors bg-sky-500/10">
              Meet the Team
            </a>
            <a href="/profile" className="text-sm px-3 py-1.5 rounded-lg border border-sky-500/30 text-sky-400 hover:bg-sky-500/10 transition-colors">
              Create Your Profile
            </a>
          </div>
        </div>
      </nav>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <header className="text-center py-12 px-4">
        <p className="text-slate-400 text-sm mb-3 uppercase tracking-wider">OG GBS</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Meet the Team</span>
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
          We are OG GBS — a team of three International Management students at Geneva Business School, combining business logic, workflow design, and technical prototyping to build an AI-native job discovery tool.
        </p>
      </header>

      {/* ── TEAM CARDS ─────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── DARIA ── */}
          <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden card-glow flex flex-col">
            {/* Card header */}
            <div className="bg-sky-500/10 border-b border-sky-500/20 px-5 pt-5 pb-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 font-bold text-lg">
                  D
                </div>
                <span className="flex-shrink-0 inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Prototype & Tools
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-200">Daria Constantinescu</h2>
              <p className="text-xs text-slate-400 mt-0.5">International Management · Geneva Business School</p>
            </div>

            {/* Card body */}
            <div className="px-5 py-4 flex-1 flex flex-col gap-4">
              {/* Bio */}
              <p className="text-sm text-slate-400 leading-relaxed">
                Designer turned product builder — bridges visual communications and web development to create the tools and interfaces that power the OG GBS prototype.
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Highlights</p>
                <div className="space-y-1.5">
                  {[
                    'Web & Graphic Designer — SwissMed Clinic, Muse Country Club',
                    'Marketing Intern at WindShape, Geneva',
                    'Cinema & sales strategy at Sea Oak Productions',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0">›</span>
                      <p className="text-xs text-slate-400 leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {['Web Design', 'Graphic Design', 'Organisation'].map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded bg-slate-700/60 text-[10px] text-slate-300 border border-slate-600">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Languages */}
              <p className="text-[11px] text-slate-500 border-t border-slate-700/60 pt-3 mt-auto">
                <span className="font-medium text-slate-400">Languages:</span> Romanian (native) · English (fluent) · French (working)
              </p>
            </div>
          </div>

          {/* ── SOFYA ── */}
          <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden card-glow flex flex-col">
            {/* Card header */}
            <div className="bg-sky-500/10 border-b border-sky-500/20 px-5 pt-5 pb-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 font-bold text-lg">
                  S
                </div>
                <span className="flex-shrink-0 inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Business Logic
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-200">Sofya Z</h2>
              <p className="text-xs text-slate-400 mt-0.5">Business Administration · Geneva Business School</p>
            </div>

            {/* Card body */}
            <div className="px-5 py-4 flex-1 flex flex-col gap-4">
              {/* Bio */}
              <p className="text-sm text-slate-400 leading-relaxed">
                Brand strategist and researcher — defines the user problem, shapes the AI-native logic, and ensures OG GBS delivers real value to post-grad job seekers.
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Highlights</p>
                <div className="space-y-1.5">
                  {[
                    'Head of Marketing, GBS Finance Club — financial events & conferences',
                    'Project Intern at Softel, Moscow — led team of 12, budget & feasibility analysis',
                    'Health & beauty marketing, digital strategy & branding',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0">›</span>
                      <p className="text-xs text-slate-400 leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {['Brand Marketing', 'Advertising', 'Research'].map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded bg-slate-700/60 text-[10px] text-slate-300 border border-slate-600">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Languages */}
              <p className="text-[11px] text-slate-500 border-t border-slate-700/60 pt-3 mt-auto">
                <span className="font-medium text-slate-400">Languages:</span> English (fluent) · Russian (native) · Spanish (professional) · French (elementary)
              </p>
            </div>
          </div>

          {/* ── MARUXA ── */}
          <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden card-glow flex flex-col">
            {/* Card header */}
            <div className="bg-sky-500/10 border-b border-sky-500/20 px-5 pt-5 pb-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 font-bold text-lg">
                  M
                </div>
                <span className="flex-shrink-0 inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Workflow & Worksheets
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-200">Maruxa Borjas</h2>
              <p className="text-xs text-slate-400 mt-0.5">International Management · Geneva Business School</p>
            </div>

            {/* Card body */}
            <div className="px-5 py-4 flex-1 flex flex-col gap-4">
              {/* Bio */}
              <p className="text-sm text-slate-400 leading-relaxed">
                Operations and process expert — drives daily worksheet completion, refines the prototype&apos;s workflows, and keeps the team aligned on deliverables and next steps.
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Highlights</p>
                <div className="space-y-1.5">
                  {[
                    'Sales Assistant at GLOBUS, Geneva (2026–present)',
                    'HR Intern at One Placement SA · Archivist at Harry Winston',
                    'Summer internship — Vogue College of Fashion, Madrid',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0">›</span>
                      <p className="text-xs text-slate-400 leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {['Social Media', 'Marketing', 'Adobe Photoshop'].map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded bg-slate-700/60 text-[10px] text-slate-300 border border-slate-600">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Languages */}
              <p className="text-[11px] text-slate-500 border-t border-slate-700/60 pt-3 mt-auto">
                <span className="font-medium text-slate-400">Languages:</span> French (native) · Spanish (native) · English (fluent) · German (elementary)
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}