"use client";

import React, { useState } from "react";

interface Semester {
  name: string;
  subjects: string[];
}

interface Program {
  title: string;
  duration: string;
  intake: string;
  overview: string;
  eligibility: string;
  intakeCapacity: string;
  outcomes: string[];
  color: string;
  accent: string;
  semesters: Semester[];
}

export default function ProgramCard({ program: prog }: { program: Program }) {
  const [openSemester, setOpenSemester] = useState<number | null>(null);

  const toggleSemester = (index: number) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  return (
    <div className="bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg">
      {/* Header */}
      <div className={`bg-gradient-to-r ${prog.color} px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
        <h2 className="text-xl md:text-2xl font-heading font-bold text-white">{prog.title}</h2>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {prog.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            {prog.intake}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-8 space-y-6">
        {/* Overview */}
        <div>
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Program Overview</h3>
          <p className="text-foreground-muted leading-relaxed">{prog.overview}</p>
        </div>

        {/* Eligibility & Intake */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-background-muted rounded-xl p-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Eligibility Criteria</h3>
            <p className="text-sm text-foreground-muted">{prog.eligibility}</p>
          </div>
          <div className="bg-background-muted rounded-xl p-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Intake Capacity</h3>
            <p className="text-sm text-foreground-muted">{prog.intakeCapacity}</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div>
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Learning Outcomes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prog.outcomes.map((o) => (
              <div key={o} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="text-sm text-foreground-muted">{o}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum — Accordion */}
        <div>
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Curriculum</h3>
          <div className="border border-border-light rounded-xl overflow-hidden divide-y divide-border-light">
            {prog.semesters.map((sem, idx) => (
              <div key={sem.name}>
                <button
                  onClick={() => toggleSemester(idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-background-muted transition-colors"
                >
                  <span className="text-sm font-bold text-primary">{sem.name}</span>
                  <svg
                    className={`w-5 h-5 text-foreground-muted transition-transform duration-200 ${openSemester === idx ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openSemester === idx && (
                  <div className="px-6 pb-5">
                    <div className="space-y-2">
                      {sem.subjects.map((subject, si) => (
                        <div key={subject} className="flex items-center gap-3 py-1.5">
                          <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {si + 1}
                          </span>
                          <span className="text-sm text-foreground-muted">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
