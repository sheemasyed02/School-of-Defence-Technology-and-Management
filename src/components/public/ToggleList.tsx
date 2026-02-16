"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ToggleListProps {
  children: React.ReactNode[];
  initialLimit?: number;
  className?: string;
  buttonLabel?: string;
}

export function ToggleList({ children, initialLimit = 5, className, buttonLabel = "View More" }: ToggleListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedChildren = isExpanded ? children : children.slice(0, initialLimit);
  const hasMore = children.length > initialLimit;

  return (
    <div className={className}>
      <div className="space-y-4">
        {displayedChildren}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/5 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-primary/10"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                {buttonLabel} ({children.length - initialLimit} more) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
