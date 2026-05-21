'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-navy text-slate-200">
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-navy/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold gradient-text">OG GBS</a>
            <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors hidden sm:inline">AI Job Demand Tracker</a>
          </div>
          <a href="/profile" className="text-sm px-4 py-1.5 rounded-lg border border-sky-500/30 text-sky-400 hover:bg-sky-500/10 transition-colors bg-sky-500/10">
            Create Your Profile
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <header className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">Create Your Profile</span>
        </h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Tell us about yourself and we&apos;ll match you with the most in-demand roles in your target countries.
        </p>
      </header>

      {/* ── FORM ───────────────────────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700 p-8">

          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-slate-200 mb-3">Your profile has been saved!</h2>
              <p className="text-slate-400">We will use this to personalise your job demand results.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-1.5">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    placeholder="e.g. Maruxa"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    placeholder="e.g. López"
                  />
                </div>
              </div>

              {/* University */}
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Where did you graduate from?
                </label>
                <input
                  id="university"
                  type="text"
                  required
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  placeholder="e.g. ESADE Business School"
                />
              </div>

              {/* Degree */}
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-slate-300 mb-1.5">
                  What did you study?
                </label>
                <input
                  id="degree"
                  type="text"
                  required
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  placeholder="e.g. MSc International Management"
                />
              </div>

              {/* CV or LinkedIn */}
              <div>
                <p className="block text-sm font-medium text-slate-300 mb-3">
                  CV or LinkedIn
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File upload */}
                  <label className="flex flex-col items-center gap-2 px-4 py-4 bg-slate-900/60 border border-slate-700 rounded-lg cursor-pointer hover:border-sky-500/50 transition-colors text-center">
                    <span className="text-2xl">📄</span>
                    <span className="text-sm text-slate-300">Attach your CV</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                  {/* LinkedIn URL */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 text-center">Or paste your LinkedIn URL</span>
                    <input
                      type="url"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors text-sm"
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              </div>

              {/* Job Preferences */}
              <div>
                <label htmlFor="preferences" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Tell us what kind of jobs you are looking for
                </label>
                <textarea
                  id="preferences"
                  rows={4}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                  placeholder="e.g. I am looking for marketing roles in Germany or the Netherlands, ideally in an international company..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-navy font-semibold transition-colors"
              >
                Build My Profile
              </button>

            </form>
          )}
        </div>
      </main>
    </div>
  );
}