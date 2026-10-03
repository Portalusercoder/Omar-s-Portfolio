export function ComicBootScreen({
  progress,
  leaving,
}: {
  progress: number;
  beat?: number;
  leaving?: boolean;
}) {
  return (
    <div
      id="comic-boot"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={`Loading ${progress} percent`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-bg transition-opacity duration-500"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      <div className="w-[min(20rem,72vw)] text-center">
        <p className="text-[1.35rem] font-medium tracking-[-0.03em] text-fg">
          Omar
        </p>
        <div className="mx-auto mt-8 h-px w-full overflow-hidden bg-white/12">
          <div
            className="h-full bg-fg transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
