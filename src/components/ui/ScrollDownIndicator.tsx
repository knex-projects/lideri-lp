export function ScrollDownIndicator({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className ?? ""}`}>
      <div className="flex h-14 w-9 items-start justify-center rounded-full border-3 border-R5">
        <span className="mt-2 block h-6 w-6 rounded-full bg-R5 animate-bounce" />
      </div>
    </div>
  );
}
