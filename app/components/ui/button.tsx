"use client";

export function Button({ children, onClick, variant = "default", disabled = false, type = "button", className }: { children: React.ReactNode; onClick?: () => void; variant?: "default" | "outline"; disabled?: boolean; type?: "button" | "submit"; className?: string }) {
  const cls = variant === "outline" ? "border bg-slate-100 text-slate-800" : "bg-rutgers text-white";
  return <button type={type} disabled={disabled} onClick={onClick} className={`rounded px-3 py-2 text-sm ${cls} disabled:opacity-50${className ? ` ${className}` : ""}`}>{children}</button>;
}
