'use client';

// OG GBS — AI Job Demand Tracker
// Landing page for AI Native Enterprise course project

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ─── MOCK DATA ───────────────────────────────────────────────────────

const COUNTRY_JOBS: Record<string, { jobs: { title: string; sector: string; demand: 'High' | 'Medium'; reason: string }[]; flag: string }> = {
  Germany: {
    flag: '🇩🇪',
    jobs: [
      { title: 'Data Analyst',           sector: 'Technology',  demand: 'High',   reason: 'High demand due to digital transformation across mid-size German firms' },
      { title: 'Software Engineer',      sector: 'Technology',  demand: 'High',   reason: 'Shortage of tech talent in Berlin and Munich startup ecosystem' },
      { title: 'Supply Chain Manager',   sector: 'Logistics',   demand: 'Medium', reason: 'Post-COVID reshoring drives demand for supply chain professionals' },
      { title: 'Marketing Manager',      sector: 'Marketing',   demand: 'Medium', reason: 'German mid-market firms expanding digital marketing budgets' },
      { title: 'Financial Advisor',       sector: 'Finance',    demand: 'Medium', reason: 'Frankfurt financial hub sees consistent demand for junior advisors' },
    ],
  },
  'Netherlands': {
    flag: '🇳🇱',
    jobs: [
      { title: 'Data Analyst',             sector: 'Technology',  demand: 'High',   reason: 'High demand due to digital transformation across Dutch firms' },
      { title: 'Registered Nurse',         sector: 'Healthcare',  demand: 'High',   reason: 'Dutch healthcare system facing nursing staff shortages nationwide' },
      { title: 'Software Engineer',        sector: 'Technology',  demand: 'High',   reason: 'Amsterdam tech hub drives software engineering demand across sectors' },
      { title: 'Supply Chain Manager',     sector: 'Logistics',   demand: 'Medium', reason: 'Rotterdam port expansion creates logistics management roles' },
      { title: 'Financial Advisor',         sector: 'Finance',     demand: 'Medium', reason: 'Growing Dutch fintech sector drives finance professional demand' },
    ],
  },
  'United Kingdom': {
    flag: '🇬🇧',
    jobs: [
      { title: 'Data Analyst',             sector: 'Technology',  demand: 'High',   reason: 'UK financial services sector drives data analytics demand' },
      { title: 'Registered Nurse',          sector: 'Healthcare',  demand: 'High',   reason: 'NHS staffing gaps create high demand for qualified nurses across England' },
      { title: 'Software Engineer',        sector: 'Technology',  demand: 'High',   reason: 'London tech sector leads Europe with continued software engineering hiring' },
      { title: 'Supply Chain Manager',     sector: 'Logistics',   demand: 'Medium', reason: 'Post-Brexit supply chain reorganisation drives logistics demand' },
      { title: 'Financial Advisor',         sector: 'Finance',     demand: 'Medium', reason: 'London financial district sees steady demand for advisory roles' },
    ],
  },
  France: {
    flag: '🇫🇷',
    jobs: [
      { title: 'Data Analyst',             sector: 'Technology',  demand: 'High',   reason: 'French enterprises increasingly adopting data-driven decision making' },
      { title: 'Registered Nurse',          sector: 'Healthcare',  demand: 'High',   reason: 'French public hospitals facing critical nursing workforce shortages' },
      { title: 'Software Engineer',        sector: 'Technology',  demand: 'High',   reason: 'Paris tech ecosystem expansion drives software engineering demand' },
      { title: 'Supply Chain Manager',     sector: 'Logistics',   demand: 'Medium', reason: 'Lyon industrial corridor creates logistics management opportunities' },
      { title: 'Financial Advisor',         sector: 'Finance',     demand: 'Medium', reason: 'French banking sector maintains steady demand for advisory professionals' },
    ],
  },
  'United States': {
    flag: '🇺🇸',
    jobs: [
      { title: 'Data Analyst',             sector: 'Technology',  demand: 'High',   reason: 'US enterprises across all sectors prioritising data analytics hiring' },
      { title: 'Registered Nurse',          sector: 'Healthcare',  demand: 'High',   reason: 'Nationwide US healthcare staffing shortage drives nursing demand' },
      { title: 'Software Engineer',        sector: 'Technology',  demand: 'High',   reason: 'US tech sector leads globally with continued software engineering hiring' },
      { title: 'Supply Chain Manager',     sector: 'Logistics',   demand: 'Medium', reason: 'US domestic manufacturing resurgence drives logistics management demand' },
      { title: 'Financial Advisor',         sector: 'Finance',     demand: 'Medium', reason: 'US financial services sector maintains high demand for advisory roles' },
    ],
  },
  Spain: {
    flag: '🇪🇸',
    jobs: [
      { title: 'Data Analyst',             sector: 'Technology',  demand: 'High',   reason: 'Spanish SME digital adoption drives data analytics demand nationwide' },
      { title: 'Registered Nurse',          sector: 'Healthcare',  demand: 'High',   reason: 'Spanish public healthcare system facing widespread nursing shortages' },
      { title: 'Software Engineer',        sector: 'Technology',  demand: 'High',   reason: 'Barcelona and Madrid tech hubs driving software engineering demand' },
      { title: 'Supply Chain Manager',     sector: 'Logistics',   demand: 'Medium', reason: 'Spanish export growth fuels logistics management opportunities' },
      { title: 'Financial Advisor',         sector: 'Finance',     demand: 'Medium', reason: 'Spanish banking sector expands advisory roles for retail clients' },
    ],
  },
};

// Fallback job data for any country not in COUNTRY_JOBS
const DEFAULT_JOBS = {
  title: 'Data Analyst',
  sector: 'Technology',
  demand: 'High',
  reason: 'High demand across global markets for data analytics professionals',
};
const FALLBACK_JOBS = [
  { ...DEFAULT_JOBS },
  { title: 'Registered Nurse',    sector: 'Healthcare', demand: 'High',   reason: 'Nationwide healthcare staffing gaps drive nursing demand globally' },
  { title: 'Software Engineer',   sector: 'Technology', demand: 'High',   reason: 'Tech sector growth continues to drive software engineering demand' },
  { title: 'Supply Chain Manager', sector: 'Logistics',  demand: 'Medium', reason: 'Global supply chain reconfiguration drives logistics management demand' },
  { title: 'Financial Advisor',   sector: 'Finance',    demand: 'Medium', reason: 'Financial services advisory demand remains steady across markets' },
];

function getCountryJobs(countryName: string) {
  if (COUNTRY_JOBS[countryName]) return COUNTRY_JOBS[countryName];
  return { flag: '🌍', jobs: FALLBACK_JOBS };
}

// All countries are clickable — shows fallback job data for unrecognised countries
const SUPPORTED_COUNTRIES = new Set([
  '276', // Germany
  '528', // Netherlands
  '826', // United Kingdom
  '250', // France
  '840', // United States
  '724', // Spain
  '076', // Brazil
  '124', // Canada
  '036', // Australia
  '356', // India
  '392', // Japan
  '410', // South Korea
  '380', // Italy
  '052', // Barbados
  '170', // Colombia
  '484', // Mexico
  '710', // South Africa
  '566', // Nigeria
  '818', // Egypt
  '792', // Turkey
  '682', // Saudi Arabia
  '784', // UAE
  '048', // Bahrain
  '414', // Kuwait
  '512', // Oman
  '586', // Pakistan
  '050', // Bangladesh
  '360', // Indonesia
  '702', // Singapore
  '764', // Thailand
  '458', // Malaysia
  '608', // Philippines
  '156', // China
  '348', // Hungary
  '620', // Portugal
  '756', // Switzerland
  '040', // Austria
  '056', // Belgium
  '208', // Denmark
  '246', // Finland
  '752', // Sweden
  '578', // Norway
  '372', // Ireland
  '756', // Switzerland
  '616', // Poland
  '203', // Czech Republic
  '348', // Hungary
  '642', // Romania
  '100', // Bulgaria
  '300', // Greece
]);

// ─── MAP COMPONENT ──────────────────────────────────────────────────

interface WorldMapProps {
  onCountrySelect: (country: string | null) => void;
  selectedCountry: string | null;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

function WorldMap({ onCountrySelect, selectedCountry, zoom, onZoomChange }: WorldMapProps) {
  const ZOOM_STEP = 0.5;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 4;

  return (
    <div className="relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130, center: [10, 30] }}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup zoom={zoom} onMoveEnd={() => {}}>
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: { rsmKey: string; properties: { name: string; id: string } }[] }) =>
            geographies.map((geo) => {
              const numericId = geo.properties.id;
              const name = geo.properties.name;
              const isSupported = SUPPORTED_COUNTRIES.has(numericId);
              const isSelected = name === selectedCountry;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    onCountrySelect(isSelected ? null : name);
                  }}
                  style={{
                    default: {
                      fill: isSupported ? (isSelected ? '#38bdf8' : '#1e4d6b') : '#253347',
                      stroke: '#0f172a',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: 'pointer',
                      opacity: isSupported ? 1 : 0.6,
                    },
                    hover: {
                      fill: '#7dd3fc',
                      stroke: '#0f172a',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: '#0ea5e9',
                      stroke: '#0f172a',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>

      {/* ── ZOOM BUTTONS ── */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button
          onClick={() => onZoomChange(Math.min(zoom + ZOOM_STEP, MAX_ZOOM))}
          disabled={zoom >= MAX_ZOOM}
          className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-600 text-slate-300 text-lg font-bold flex items-center justify-center hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => onZoomChange(Math.max(zoom - ZOOM_STEP, MIN_ZOOM))}
          disabled={zoom <= MIN_ZOOM}
          className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-600 text-slate-300 text-lg font-bold flex items-center justify-center hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>
    </div>
  );
}

// ─── COUNTRY PANEL COMPONENT ────────────────────────────────────────

interface CountryJobPanelProps {
  country: string;
  onClose: () => void;
}

function CountryJobPanel({ country, onClose }: CountryJobPanelProps) {
  const data = getCountryJobs(country);

  return (
    <div className="bg-slate-800/40 rounded-2xl border border-slate-700 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{data.flag}</span>
          <h3 className="text-lg font-bold text-slate-200">{country}</h3>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-slate-700/60 border border-slate-600 text-slate-400 hover:text-slate-200 hover:bg-slate-600 flex items-center justify-center text-sm transition-colors flex-shrink-0"
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      <p className="text-xs text-sky-400 mb-4 uppercase tracking-wider">Top In-Demand Roles for Post-Grad Students</p>

      <div className="space-y-3">
        {data.jobs.map((job, i) => (
          <div key={i} className="bg-slate-900/60 rounded-xl p-3 border border-slate-700">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-slate-200 leading-tight">{job.title}</p>
              <span className={`flex-shrink-0 inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                job.demand === 'High'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              }`}>
                {job.demand}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mb-1">{job.sector}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{job.reason}</p>
          </div>
        ))}
      </div>

      {/* Data quality label */}
      <div className="mt-4 flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-700">
        <span className="text-emerald-400 text-xs">✅</span>
        <p className="text-[11px] text-slate-400">Data reviewed by team — AI-generated, human-approved</p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────

const BADGES: { label: string; color: string }[] = [];

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

// ─── DAY 2: WORKFLOW & HITL ────────────────────────────────────────

const WORKFLOW_STEPS = [
  { step: '1', label: 'Student Input',    detail: 'Degree, target countries, graduation year', badge: 'input',  icon: '📋' },
  { step: '2', label: 'AI Research',      detail: 'Collects job postings from global sources', badge: 'ai',     icon: '🔍' },
  { step: '3', label: 'AI Classify & Rank', detail: 'Classifies by country, ranks by demand', badge: 'ai',     icon: '📊' },
  { step: '4', label: 'Human Review',    detail: 'HITL reviewer checks source quality',       badge: 'review', icon: '👤' },
  { step: '5', label: 'Dashboard Output', detail: 'Ranked roles per country delivered',        badge: 'output', icon: '🎯' },
  { step: '6', label: 'Student Action',  detail: 'Student prioritises applications',          badge: 'action', icon: '✅' },
];

const WORKFLOW_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  input:  { bg: 'bg-sky-500/15',    text: 'text-sky-300',   label: 'INPUT'       },
  ai:     { bg: 'bg-indigo-500/15', text: 'text-indigo-300',label: 'AI ACTIVE'   },
  review: { bg: 'bg-amber-500/15',  text: 'text-amber-300', label: 'HUMAN REVIEW'},
  output: { bg: 'bg-emerald-500/15',text: 'text-emerald-300',label:'OUTPUT'      },
  action: { bg: 'bg-sky-500/15',    text: 'text-sky-300',   label: 'ACTION'      },
};

const DATA_NEEDED = [
  { icon: '🎓', item: 'Student Profile',    detail: 'Degree, field, target countries, graduation year' },
  { icon: '🌐', item: 'Job Posting Data',  detail: 'APIs or web aggregation (LinkedIn, Indeed, Glassdoor)' },
  { icon: '🏷️', item: 'Role Taxonomy',     detail: 'Job titles, industries, seniority levels' },
  { icon: '📈', item: 'Demand Frequency',   detail: 'Country-level posting volume and trend signals' },
];

const AI_ACTIONS = [
  { icon: '🔎', action: 'Query & Aggregate', detail: 'Searches global sources, collects postings at scale' },
  { icon: '🏷️', action: 'Classify',         detail: 'Labels roles by type, country, and relevance to student' },
  { icon: '📊', action: 'Rank',             detail: 'Sorts roles by demand frequency and recency' },
  { icon: '📝', action: 'Summarise',        detail: 'Produces digestible ranked output for student dashboard' },
];

const HITL_CHECKPOINTS = [
  { icon: '✅', text: 'Data sources validated for reliability and freshness before delivery' },
  { icon: '✅', text: 'Output quality reviewed — classification errors corrected' },
  { icon: '✅', text: 'Human reviewer approves final ranked list before student sees it' },
];

const MONITORING = [
  { icon: '🔔', alert: 'Source Drift',    detail: 'Triggers when data source quality or access changes' },
  { icon: '📉', alert: 'Staleness',      detail: 'Triggers when demand data exceeds update threshold' },
  { icon: '🏷️', alert: 'Class. Drift',   detail: 'Triggers when role taxonomy accuracy degrades' },
];

const WORKFLOW_RISKS: { risk: string; mitigation: string; severity: 'high' | 'medium' | 'low' }[] = [
  { risk: 'Data sources unreliable',       mitigation: 'HITL validates each source; fallback to known APIs only',    severity: 'high'   },
  { risk: 'API access policy changes',    mitigation: 'Monitor terms; maintain fallback sources; document dependency', severity: 'medium' },
  { risk: 'Classification bias',          mitigation: 'Spot-check AI output; taxonomy reviewed quarterly',           severity: 'medium' },
  { risk: 'Demand ≠ actual hiring',       mitigation: 'Label results as posting volume; add trend context',         severity: 'low'    },
];

// Mock example: IM student targeting Germany + Netherlands
const MOCK_STUDENT = {
  name: 'Maruxa',
  degree: 'MSc International Management',
  graduationYear: '2026',
  targetCountries: ['Germany', 'Netherlands'],
  targetRoles: ['Product Manager', 'Business Analyst', 'Strategy Consultant'],
};

const MOCK_OUTPUT = [
  { rank: 1, role: 'Product Manager',      country: 'Germany',     demand: 'Very High', trend: '↑ Rising', sources: 847 },
  { rank: 2, role: 'Strategy Consultant',  country: 'Germany',     demand: 'High',      trend: '↑ Rising', sources: 612 },
  { rank: 3, role: 'Business Analyst',    country: 'Netherlands', demand: 'High',      trend: '→ Stable', sources: 534 },
  { rank: 4, role: 'Product Manager',      country: 'Netherlands', demand: 'Medium',    trend: '↑ Rising', sources: 421 },
  { rank: 5, role: 'Strategy Consultant',  country: 'Netherlands', demand: 'Medium',    trend: '→ Stable', sources: 398 },
];

function WorkflowStep({ step, label, detail, badge, icon }: {
  step: string; label: string; detail: string; badge: string; icon: string;
}) {
  const b = WORKFLOW_BADGES[badge];
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
          {icon}
        </div>
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-navy border border-slate-600 flex items-center justify-center text-[10px] font-mono font-bold text-sky-300">
          {step}
        </div>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[10px] border font-medium ${b.bg} ${b.text}`}>{b.label}</span>
      <p className="text-sm font-semibold text-slate-200 leading-tight">{label}</p>
      <p className="text-xs text-slate-500 max-w-[110px]">{detail}</p>
    </div>
  );
}

function DemandBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    'Very High': 'bg-red-500/15 text-red-300 border border-red-500/30',
    'High':      'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    'Medium':    'bg-sky-500/15 text-sky-300 border border-sky-500/30',
  };
  return <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${map[level] || ''}`}>{level}</span>;
}

function RiskRow({ risk, mitigation, severity }: { risk: string; mitigation: string; severity: 'high' | 'medium' | 'low' }) {
  const dot: Record<string, string> = { high: 'bg-red-400', medium: 'bg-amber-400', low: 'bg-emerald-400' };
  return (
    <div className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0">
      <span className={`inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dot[severity]}`} />
      <div>
        <p className="text-sm font-medium text-slate-200">{risk}</p>
        <p className="text-xs text-slate-500 mt-0.5">{mitigation}</p>
      </div>
    </div>
  );
}

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
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  return (
    <div className="min-h-screen bg-navy text-slate-200">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-navy/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <span className="text-xl font-bold gradient-text">OG GBS</span>
          <span className="ml-3 text-xs text-slate-500 hidden sm:inline">AI Job Demand Tracker</span>
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
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          DAY 3 — INTERACTIVE PROTOTYPE (moved up here, after hero)
      ════════════════════════════════════════════════════════════ */}

      {/* ── EXPLORE JOB DEMAND ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">

        <div className="flex items-center justify-between mt-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-200">Who is OG GBS?</h2>
            <p className="text-slate-400 text-sm mt-1">Click any highlighted country to see the most in-demand roles for post-graduate students.</p>
          </div>
          <span className="text-xs text-sky-400 bg-sky-500/10 px-2 py-1 rounded border border-sky-500/20">INTERACTIVE</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">

          {/* ── MAP ── */}
          <div className="flex-1">
            <div className="bg-slate-800/40 rounded-2xl border border-slate-700 p-4 overflow-hidden">
              <WorldMap
                onCountrySelect={setSelectedCountry}
                selectedCountry={selectedCountry}
                zoom={mapZoom}
                onZoomChange={setMapZoom}
              />
            </div>
          </div>

          {/* ── COUNTRY PANEL ── */}
          <div className="lg:w-80 flex-shrink-0">
            {selectedCountry ? (
              <CountryJobPanel
                country={selectedCountry}
                onClose={() => setSelectedCountry(null)}
              />
            ) : (
              <div className="bg-slate-800/40 rounded-2xl border border-slate-700 p-6 text-center h-full flex items-center justify-center min-h-[200px]">
                <div>
                  <div className="text-3xl mb-3">🌍</div>
                  <p className="text-slate-400 text-sm">Click a highlighted country on the map to see in-demand jobs for post-grad students.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

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




      {/* ── WORKFLOW & HITL ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <SectionLabel label="Day 2 — Workflow & Human-in-the-Loop" />
        <h2 className="text-2xl font-bold text-slate-200 mt-4 mb-2">
          How the AI System Works
        </h2>
        <p className="text-slate-400 text-sm mb-8 max-w-2xl">
          A student inputs their profile, AI researches and ranks global job demand, a human reviewer approves the output, and the student receives a personalised prioritised dashboard.
        </p>

        {/* ── FLOW DIAGRAM ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={s.step} className="flex items-center gap-2">
                <WorkflowStep {...s} />
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span className="text-slate-600 text-lg flex-shrink-0">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── DATA NEEDED + AI ROLE (2-col) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700">
            <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
              📥 Data Needed
            </h3>
            <div className="space-y-3">
              {DATA_NEEDED.map(d => (
                <div key={d.item} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{d.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{d.item}</p>
                    <p className="text-xs text-slate-500">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700">
            <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
              🤖 AI / Model Role
            </h3>
            <div className="space-y-3">
              {AI_ACTIONS.map(a => (
                <div key={a.action} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{a.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{a.action}</p>
                    <p className="text-xs text-slate-500">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HITL + MONITORING (2-col) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-emerald-500/5 rounded-2xl p-5 border border-emerald-500/20">
            <h3 className="text-base font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              ✅ Human-in-the-Loop Checkpoint
            </h3>
            <div className="space-y-2">
              {HITL_CHECKPOINTS.map(c => (
                <div key={c.text} className="flex items-center gap-2">
                  <span className="text-emerald-400 text-sm">{c.icon}</span>
                  <p className="text-sm text-slate-300">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-300">
                <strong>Decision triggered:</strong> Student chooses which roles to prioritise based on AI-generated demand ranking.
              </p>
            </div>
          </div>
          <div className="bg-amber-500/5 rounded-2xl p-5 border border-amber-500/20">
            <h3 className="text-base font-semibold text-amber-300 mb-4 flex items-center gap-2">
              🔔 Human-on-the-Loop Monitoring
            </h3>
            <div className="space-y-2">
              {MONITORING.map(m => (
                <div key={m.alert} className="flex items-start gap-3">
                  <span className="text-lg">{m.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{m.alert}</p>
                    <p className="text-xs text-slate-500">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-300">
                <strong>Human-out-of-the-loop:</strong> Classification and ranking can run fully automated once data sources are validated.
              </p>
            </div>
          </div>
        </div>

        {/* ── MOCK EXAMPLE ── */}
        <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-200">🧪 Mock Example — Day 2 Workflow</h3>
            <span className="text-xs text-sky-400 bg-sky-500/10 px-2 py-1 rounded border border-sky-500/20">SIMULATED</span>
          </div>
          {/* Student profile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 p-3 bg-slate-900/60 rounded-lg border border-slate-700">
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Student</p>
              <p className="text-sm text-slate-200 font-medium">{MOCK_STUDENT.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Degree</p>
              <p className="text-sm text-slate-200 font-medium">{MOCK_STUDENT.degree}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Target Countries</p>
              <p className="text-sm text-slate-200 font-medium">{MOCK_STUDENT.targetCountries.join(', ')}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Graduation</p>
              <p className="text-sm text-slate-200 font-medium">{MOCK_STUDENT.graduationYear}</p>
            </div>
          </div>
          {/* AI output table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="pb-2 text-xs text-slate-500 font-medium">#</th>
                  <th className="pb-2 text-xs text-slate-500 font-medium">Role</th>
                  <th className="pb-2 text-xs text-slate-500 font-medium">Country</th>
                  <th className="pb-2 text-xs text-slate-500 font-medium">Demand</th>
                  <th className="pb-2 text-xs text-slate-500 font-medium">Trend</th>
                  <th className="pb-2 text-xs text-slate-500 font-medium">Sources</th>
                  <th className="pb-2 text-xs text-slate-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_OUTPUT.map(row => (
                  <tr key={row.rank} className="border-b border-slate-800">
                    <td className="py-2 text-slate-400 font-mono">{row.rank}</td>
                    <td className="py-2 text-slate-200 font-medium">{row.role}</td>
                    <td className="py-2 text-slate-300">{row.country}</td>
                    <td className="py-2"><DemandBadge level={row.demand} /></td>
                    <td className="py-2 text-slate-300 text-xs">{row.trend}</td>
                    <td className="py-2 text-slate-400 font-mono text-xs">{row.sources}</td>
                    <td className="py-2">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        ✅ Reviewed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Maruxa receives this dashboard after human reviewer approves output. She prioritises Product Manager roles in Germany first.
          </p>
        </div>

        {/* ── RISKS & MITIGATIONS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORKFLOW_RISKS.map(r => <RiskRow key={r.risk} {...r} />)}
          </div>
      </section>

      {/* ── TEAM ── */}
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
