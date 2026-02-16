import { AlumniForm } from "@/components/admin/AlumniForm";

export default function NewAlumniPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-primary">New Alumni</h1>
      </div>
      <AlumniForm />
    </div>
  );
}
