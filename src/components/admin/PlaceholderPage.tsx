import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Construction className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="text-foreground-muted mt-2 max-w-md">{description}</p>
      </div>
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
        This module is under development and will be available in the next update.
      </div>
    </div>
  );
}
