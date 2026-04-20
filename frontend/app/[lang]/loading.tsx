export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 border-2 border-stone-pale border-t-crimson animate-spin" />
        <p className="font-body text-xs tracking-[0.2em] uppercase text-stone animate-pulse">
          Caricamento...
        </p>
      </div>
    </div>
  );
}
