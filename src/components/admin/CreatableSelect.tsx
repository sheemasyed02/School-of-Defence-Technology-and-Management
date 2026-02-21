"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Plus, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CreatableSelectProps {
  /** Settings key to persist custom options, e.g. "custom_degree_levels" */
  settingsKey: string;
  /** Default built-in options (always shown even if DB is empty) */
  defaultOptions: string[];
  /** Currently selected value */
  value: string;
  /** Called when the user picks or creates an option */
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function CreatableSelect({
  settingsKey,
  defaultOptions,
  value,
  onChange,
  disabled = false,
  placeholder,
}: CreatableSelectProps) {
  const [options, setOptions] = useState<string[]>(defaultOptions);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [saving, setSaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch persisted custom options on mount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("Settings")
          .select("value")
          .eq("key", settingsKey)
          .single();

        if (data?.value) {
          const custom: string[] = JSON.parse(data.value);
          setOptions(() => [...new Set([...defaultOptions, ...custom])]);
        }
      } catch {
        // first time – no row yet
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsKey]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setAdding(false);
        setNewValue("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus new-option input when adding mode activates
  useEffect(() => {
    if (adding && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [adding]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
  };

  const handleAdd = async () => {
    const trimmed = newValue.trim();
    if (!trimmed) return;

    // Check duplicates
    const existing = options.find((o) => o.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      onChange(existing);
      setAdding(false);
      setNewValue("");
      setOpen(false);
      return;
    }

    try {
      setSaving(true);
      const merged = [...options, trimmed];
      setOptions(merged);
      onChange(trimmed);

      await supabase.from("Settings").upsert(
        {
          key: settingsKey,
          value: JSON.stringify(merged),
          category: "custom_options",
          updatedAt: new Date().toISOString(),
        },
        { onConflict: "key" }
      );
    } catch (e) {
      console.error("Failed to save custom option", e);
    } finally {
      setSaving(false);
      setAdding(false);
      setNewValue("");
      setOpen(false);
    }
  };

  const displayValue = value || placeholder || "Select...";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          flex h-10 w-full items-center justify-between
          rounded-md border border-input bg-background
          px-3 py-2 text-sm text-left
          transition-all duration-200
          hover:border-primary/40
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          disabled:cursor-not-allowed disabled:opacity-50
          ${open ? "border-primary ring-2 ring-primary/20" : ""}
          ${!value && placeholder ? "text-muted-foreground" : "text-foreground"}
        `}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 mt-1 w-full
            rounded-md border border-gray-200 bg-white
            shadow-lg
            animate-in fade-in-0 zoom-in-95
            overflow-hidden
          "
        >
          {/* Options list */}
          <div className="max-h-52 overflow-y-auto py-1">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`
                  flex w-full items-center gap-2 px-3 py-2 text-sm text-left
                  transition-colors duration-100
                  ${
                    opt === value
                      ? "bg-primary/5 text-primary font-medium"
                      : "text-foreground hover:bg-gray-50"
                  }
                `}
              >
                <span
                  className={`w-4 h-4 flex items-center justify-center shrink-0 transition-opacity ${
                    opt === value ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-primary" />
                </span>
                <span className="truncate">{opt}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Add new section */}
          {adding ? (
            <div className="p-2 flex items-center gap-1.5">
              <input
                ref={inputRef}
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                  if (e.key === "Escape") {
                    setAdding(false);
                    setNewValue("");
                  }
                }}
                placeholder="Type new option..."
                disabled={saving}
                className="flex-1 h-8 px-2.5 text-sm rounded border border-gray-200 bg-gray-50 focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={handleAdd}
                disabled={saving || !newValue.trim()}
                className="h-8 px-2.5 rounded bg-primary text-white text-xs font-medium hover:bg-primary/90 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                {saving ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Check className="w-3 h-3" />
                )}
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setNewValue("");
                }}
                className="h-8 px-2 rounded text-muted-foreground hover:bg-gray-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-primary/70 hover:text-primary hover:bg-primary/5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add new option</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
