export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.025] mix-blend-multiply z-50 select-none noise-overlay"
      aria-hidden="true"
    />
  );
}
