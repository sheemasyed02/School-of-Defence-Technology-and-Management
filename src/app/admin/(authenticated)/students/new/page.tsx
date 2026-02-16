import { StudentForm } from "@/components/admin/StudentForm";

export default function NewStudentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-primary">New Student</h1>
      </div>
      <StudentForm />
    </div>
  );
}
