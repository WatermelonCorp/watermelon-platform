export function DocTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      {children}
    </div>
  );
}
