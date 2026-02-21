"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import { createRecord, updateRecord } from "@/app/actions";
import CreatableSelect from "@/components/admin/CreatableSelect";

/* ── Types ──────────────────────────────────────────────── */
type Subject = { name: string; description: string };
type Semester = { semester: string; subjects: Subject[] };

type ProgramFormValues = {
  title: string;
  degree: string;
  duration: string;
  description: string;
  curriculum: string;
  eligibility: string;
  intake: string;
  outcomes: string;
  isVisible: boolean;
};

interface ProgramFormProps {
  initialData?: any;
}

/* ── Helpers ────────────────────────────────────────────── */

// Parse JSON or newline-separated text → string[]
const parseOutcomes = (raw: string | null): string[] => {
  if (!raw) return [""];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // fall back to newline-separated
    const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
    if (lines.length > 0) return lines;
  }
  return [""];
};

// Parse curriculum: supports new structured format AND old flat format
const parseCurriculum = (raw: string | null): Semester[] => {
  if (!raw) return [{ semester: "Semester 1", subjects: [{ name: "", description: "" }] }];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // New structured format: [{ semester, subjects }]
      if (parsed.length > 0 && typeof parsed[0] === "object" && parsed[0].semester) {
        return parsed as Semester[];
      }
      // Old flat format: ["Semester 1: Subject A, Subject B", ...]
      if (parsed.length > 0 && typeof parsed[0] === "string") {
        return parsed.map((line: string) => {
          const colonIdx = line.indexOf(":");
          const semName = colonIdx > -1 ? line.slice(0, colonIdx).trim() : line.trim();
          const subjectsPart = colonIdx > -1 ? line.slice(colonIdx + 1).trim() : "";
          const subjects = subjectsPart
            ? subjectsPart.split(",").map((s) => ({ name: s.trim(), description: "" }))
            : [{ name: "", description: "" }];
          return { semester: semName, subjects };
        });
      }
    }
  } catch {
    // fall back to newline text
    const lines = raw.split("\n").filter(Boolean);
    return lines.map((line) => {
      const colonIdx = line.indexOf(":");
      const semName = colonIdx > -1 ? line.slice(0, colonIdx).trim() : line.trim();
      const subjectsPart = colonIdx > -1 ? line.slice(colonIdx + 1).trim() : "";
      const subjects = subjectsPart
        ? subjectsPart.split(",").map((s) => ({ name: s.trim(), description: "" }))
        : [{ name: "", description: "" }];
      return { semester: semName, subjects };
    });
  }
  return [{ semester: "Semester 1", subjects: [{ name: "", description: "" }] }];
};

/* ── Default options ─────────────────────────────────────── */
const DEFAULT_DEGREES = ["M.Tech", "PhD", "Certificate", "MBA", "B.Tech"];

/* ── Component ──────────────────────────────────────────── */
export const ProgramForm: React.FC<ProgramFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Structured state
  const [outcomes, setOutcomes] = useState<string[]>(() =>
    parseOutcomes(initialData?.outcomes || null)
  );
  const [curriculum, setCurriculum] = useState<Semester[]>(() =>
    parseCurriculum(initialData?.curriculum || null)
  );

  const formTitle = initialData ? "Edit Program" : "Create Program";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    defaultValues: initialData
      ? {
          ...initialData,
          curriculum: "", // managed by state
          outcomes: "",   // managed by state
        }
      : {
          title: "",
          degree: "M.Tech",
          duration: "2 Years",
          description: "",
          curriculum: "",
          eligibility: "",
          intake: "",
          outcomes: "",
          isVisible: true,
        },
  });

  const degree = watch("degree");

  /* ── Outcome helpers ──────────────────────────────── */
  const addOutcome = () => setOutcomes((prev) => [...prev, ""]);
  const removeOutcome = (idx: number) =>
    setOutcomes((prev) => prev.filter((_, i) => i !== idx));
  const updateOutcome = (idx: number, val: string) =>
    setOutcomes((prev) => prev.map((o, i) => (i === idx ? val : o)));

  /* ── Curriculum helpers ────────────────────────────── */
  const addSemester = () =>
    setCurriculum((prev) => [
      ...prev,
      { semester: `Semester ${prev.length + 1}`, subjects: [{ name: "", description: "" }] },
    ]);
  const removeSemester = (idx: number) =>
    setCurriculum((prev) => prev.filter((_, i) => i !== idx));
  const updateSemesterName = (idx: number, name: string) =>
    setCurriculum((prev) => prev.map((s, i) => (i === idx ? { ...s, semester: name } : s)));
  const addSubject = (semIdx: number) =>
    setCurriculum((prev) =>
      prev.map((s, i) =>
        i === semIdx ? { ...s, subjects: [...s.subjects, { name: "", description: "" }] } : s
      )
    );
  const removeSubject = (semIdx: number, subIdx: number) =>
    setCurriculum((prev) =>
      prev.map((s, i) =>
        i === semIdx
          ? { ...s, subjects: s.subjects.filter((_, j) => j !== subIdx) }
          : s
      )
    );
  const updateSubject = (semIdx: number, subIdx: number, field: keyof Subject, val: string) =>
    setCurriculum((prev) =>
      prev.map((s, i) =>
        i === semIdx
          ? {
              ...s,
              subjects: s.subjects.map((sub, j) =>
                j === subIdx ? { ...sub, [field]: val } : sub
              ),
            }
          : s
      )
    );

  /* ── Submit ────────────────────────────────────────── */
  const onSubmit = async (data: ProgramFormValues) => {
    try {
      setLoading(true);
      setError("");

      const cleanOutcomes = outcomes.map((o) => o.trim()).filter(Boolean);
      const cleanCurr = curriculum
        .filter((s) => s.semester.trim())
        .map((s) => ({
          ...s,
          subjects: s.subjects.filter((sub) => sub.name.trim()),
        }));

      const payload = {
        ...data,
        outcomes: JSON.stringify(cleanOutcomes),
        curriculum: JSON.stringify(cleanCurr),
        updatedAt: new Date().toISOString(),
      };

      if (initialData) {
        const result = await updateRecord("Program", initialData.id, payload, "/admin/programs");
        if (!result.success) throw new Error(result.error);
      } else {
        const result = await createRecord("Program", payload, "/admin/programs");
        if (!result.success) throw new Error(result.error);
      }

      router.refresh();
      router.push("/admin/programs");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ── Shared styles ─────────────────────────────────── */
  const cardClass =
    "bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 space-y-4";
  const sectionTitle = (text: string) => (
    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-1">
      <div className="w-1 h-4 bg-gold rounded-full" />
      <h3 className="font-heading font-bold text-base text-primary">{text}</h3>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col gap-1 border-b border-primary/10 pb-4">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">{formTitle}</h1>
        <p className="text-foreground-muted text-sm">
          Define program details, curriculum structure, and learning outcomes.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ── Core Details ── */}
        <div className={cardClass}>
          {sectionTitle("Core Details")}

          <div className="space-y-2">
            <label className="text-sm font-medium">Program Title *</label>
            <Input
              disabled={loading}
              placeholder="M.Tech in Defence Technology"
              {...register("title", { required: true })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Degree Level</label>
              <CreatableSelect
                settingsKey="custom_degree_levels"
                defaultOptions={DEFAULT_DEGREES}
                value={degree}
                onChange={(v) => setValue("degree", v)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input disabled={loading} placeholder="2 Years" {...register("duration")} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={loading}
              placeholder="Overview of the program..."
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Intake Capacity</label>
              <Input disabled={loading} placeholder="30 students per year" {...register("intake")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Eligibility Criteria</label>
              <Input disabled={loading} placeholder="B.Tech with 60%..." {...register("eligibility")} />
            </div>
          </div>
        </div>

        {/* ── Learning Outcomes ── */}
        <div className={cardClass}>
          {sectionTitle("Learning Outcomes")}
          <p className="text-xs text-foreground-muted -mt-2">
            Add each outcome as a separate point.
          </p>

          <div className="space-y-3">
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="mt-2.5 text-xs text-primary/40 font-bold w-5 shrink-0 text-right">
                  {idx + 1}.
                </span>
                <Input
                  value={outcome}
                  onChange={(e) => updateOutcome(idx, e.target.value)}
                  disabled={loading}
                  placeholder={`Outcome ${idx + 1}`}
                  className="flex-1"
                />
                {outcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOutcome(idx)}
                    disabled={loading}
                    className="mt-1.5 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-primary/5 hover:border-primary/50 text-primary/60 hover:text-primary gap-2"
            onClick={addOutcome}
            disabled={loading}
          >
            <Plus className="w-4 h-4" /> Add Outcome
          </Button>
        </div>

        {/* ── Curriculum Builder ── */}
        <div className={cardClass}>
          {sectionTitle("Curriculum")}
          <p className="text-xs text-foreground-muted -mt-2">
            Structure your curriculum by semesters and subjects.
          </p>

          <div className="space-y-4">
            {curriculum.map((sem, semIdx) => (
              <div
                key={semIdx}
                className="rounded-lg border border-gray-200 bg-gray-50/80 overflow-hidden"
              >
                {/* Semester header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-primary/[0.04] border-b border-gray-200">
                  <GripVertical className="w-4 h-4 text-primary/20 shrink-0" />
                  <Input
                    value={sem.semester}
                    onChange={(e) => updateSemesterName(semIdx, e.target.value)}
                    disabled={loading}
                    placeholder="Semester name"
                    className="flex-1 bg-white h-9 font-semibold"
                  />
                  {curriculum.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSemester(semIdx)}
                      disabled={loading}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Subjects */}
                <div className="p-4 space-y-3">
                  {sem.subjects.map((sub, subIdx) => (
                    <div key={subIdx} className="flex items-start gap-2">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          value={sub.name}
                          onChange={(e) => updateSubject(semIdx, subIdx, "name", e.target.value)}
                          disabled={loading}
                          placeholder="Subject name"
                          className="h-9 text-sm"
                        />
                        <Input
                          value={sub.description}
                          onChange={(e) =>
                            updateSubject(semIdx, subIdx, "description", e.target.value)
                          }
                          disabled={loading}
                          placeholder="Brief description (optional)"
                          className="h-9 text-sm text-foreground-muted"
                        />
                      </div>
                      {sem.subjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubject(semIdx, subIdx)}
                          disabled={loading}
                          className="mt-1 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addSubject(semIdx)}
                    disabled={loading}
                    className="w-full py-2 text-xs font-medium text-primary/60 hover:text-primary border border-dashed border-primary/20 hover:border-primary/40 rounded-md hover:bg-primary/5 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Subject
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-primary/5 hover:border-primary/50 text-primary/60 hover:text-primary gap-2"
            onClick={addSemester}
            disabled={loading}
          >
            <Plus className="w-4 h-4" /> Add Semester
          </Button>
        </div>

        {/* ── Visibility & Submit ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              disabled={loading}
              {...register("isVisible")}
            />
            <span className="text-sm font-medium">Visible on Website</span>
          </label>

          <Button disabled={loading} className="w-full sm:w-auto min-w-[180px] h-11" type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {action}
          </Button>
        </div>
      </form>
    </div>
  );
};
