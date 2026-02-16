"use client";

import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ChevronDown, Clock, Users } from "lucide-react";

// ─── Data ───

type Curriculum = {
  semester: string;
  subjects: string[];
};

type Program = {
  title: string;
  duration: string;
  intake: string;
  overview: string;
  eligibility: string;
  outcomes: string[];
  curriculum: Curriculum[];
  headerColor: string; // Tailwind class or hex
};

function Accordion({ items }: { items: Curriculum[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="border border-border-light rounded-lg bg-white overflow-hidden divide-y divide-border-light">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white">
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 focus:outline-none"
          >
            <span className="font-bold text-primary text-sm sm:text-base">{item.semester}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                openIndex === idx ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: openIndex === idx ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="p-4 pt-0 bg-gray-50/50 border-t border-dashed border-gray-200">
                <div className="space-y-3 pt-3">
                  {item.subjects.map((sub, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold-700 text-xs font-bold flex-shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span className="text-sm text-foreground-muted">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page Client ───

export default function ProgramsClient({ initialPrograms }: { initialPrograms: any[] }) {

  // Transform DB data to UI format
  const programs: Program[] = initialPrograms.map((p, i) => {
    // 1. Parse Curriculum
    let parsedCurriculum: Curriculum[] = [];
    try {
        const rawCurr = typeof p.curriculum === 'string' ? JSON.parse(p.curriculum) : p.curriculum;
        if (Array.isArray(rawCurr)) {
            parsedCurriculum = rawCurr.map((c: string) => {
                // Expected format: "Semester 1: Subject A, Subject B"
                const parts = c.split(':');
                const semester = parts[0]?.trim() || "Semester";
                const subjectsStr = parts.slice(1).join(':').trim();
                const subjects = subjectsStr ? subjectsStr.split(',').map(s => s.trim()) : [c];
                return { semester, subjects };
            });
        }
    } catch (e) {
        console.warn("Failed to parse curriculum for program:", p.title);
        // Fallback
        parsedCurriculum = [{ semester: "Curriculum", subjects: ["Details available soon"] }];
    }

    // 2. Parse Outcomes
    let parsedOutcomes: string[] = [];
    try {
        const rawOut = typeof p.outcomes === 'string' ? JSON.parse(p.outcomes) : p.outcomes;
        if (Array.isArray(rawOut)) {
            parsedOutcomes = rawOut;
        } else if (typeof rawOut === 'string') {
             parsedOutcomes = [rawOut];
        }
    } catch (e) {
        parsedOutcomes = [];
    }

    // Colors cycling
    const colors = ["bg-[#C49B3B]", "bg-[#1B3A6B]", "bg-[#86271E]"];

    return {
        title: p.title,
        duration: p.duration || "Duration invalid",
        intake: p.intake || "TBD",
        overview: p.description || "",
        eligibility: p.eligibility || "Check website for details",
        outcomes: parsedOutcomes.length > 0 ? parsedOutcomes : ["Outcomes to be announced"],
        curriculum: parsedCurriculum.length > 0 ? parsedCurriculum : [],
        headerColor: colors[i % colors.length]
    };
  });

  return (
    <>
      <PageHeader
        title="Academic Programs"
        subtitle="Discover our comprehensive programs designed to impart education and training in modern defence technologies."
        breadcrumb="Programs"
      />

      <div className="min-h-screen bg-background py-16 sm:py-24">
        <div className="container-site max-w-5xl space-y-16">
          {programs.length === 0 ? (
              <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-gray-500">No programs found.</h3>
              </div>
          ) : (
          programs.map((prog, i) => (
            <AnimateIn
              key={prog.title}
              type="fadeUp"
              delay={i * 0.1}
              className="bg-background-paper rounded-xl shadow-brand-lg overflow-hidden border border-border-light"
            >
              {/* Header */}
              <div className={`${prog.headerColor} p-6 sm:p-8 text-white relative overflow-hidden`}>
                {/* Pattern overlay for texture */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold max-w-2xl text-white leading-tight">
                    {prog.title}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm transition-transform hover:scale-105">
                      <Clock className="w-4 h-4 text-white/90" />
                      <span className="text-sm font-semibold tracking-wide">{prog.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm transition-transform hover:scale-105">
                      <Users className="w-4 h-4 text-white/90" />
                      <span className="text-sm font-semibold tracking-wide">{prog.intake}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-10 space-y-10">
                {/* Overview */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-l-4 border-gold pl-3">
                    Program Overview
                  </h3>
                  <p className="text-foreground-muted leading-relaxed text-lg">
                    {prog.overview}
                  </p>
                </div>

                {/* Info Grid (Eligibility & Intake) */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-background-muted p-6 rounded-lg border border-border-light shadow-sm">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 border-l-4 border-primary pl-3">
                      Eligibility Criteria
                    </h4>
                    <p className="text-sm sm:text-base text-foreground-muted font-medium">
                      {prog.eligibility}
                    </p>
                  </div>
                  <div className="bg-background-muted p-6 rounded-lg border border-border-light shadow-sm">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 border-l-4 border-primary pl-3">
                      Intake Capacity
                    </h4>
                    <p className="text-sm sm:text-base text-foreground-muted font-medium">
                      {prog.intake}
                    </p>
                  </div>
                </div>

                {/* Learning Outcomes */}
                {prog.outcomes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-l-4 border-green-600 pl-3">
                    Learning Outcomes
                  </h3>
                  <div className="space-y-3">
                    {prog.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                        <span className="text-foreground-muted group-hover:text-primary transition-colors">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {/* Curriculum Accordion */}
                {prog.curriculum.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-l-4 border-gold pl-3">
                    Curriculum
                  </h3>
                  <Accordion items={prog.curriculum} />
                </div>
                )}
              </div>
            </AnimateIn>
          ))
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full border border-white/5" />
        <div className="container-site relative z-10 text-center">
          <AnimateIn type="scaleIn">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-4">Start Your Journey</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Interested in Our Programs?</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">Contact our admissions office for eligibility criteria, fee structure, and application deadlines.</p>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold text-primary hover:bg-gold/90 h-10 px-4 py-2 sm:h-12 sm:px-8 sm:text-base">Contact Admissions</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
