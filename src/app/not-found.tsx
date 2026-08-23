import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07090E] text-white px-4 text-center">
      <span className="font-mono text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">404 Error</span>
      <h1 className="text-4xl sm:text-6xl font-black mb-4">Page Not Found</h1>
      <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}