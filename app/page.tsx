import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full max-w-[800px] px-4 mx-auto">
      <Link
        href="https://wdl-sea.com/index"
        className="block p-1 rounded-full bg-primary-1 mx-auto w-fit hover:scale-105 transition-all shadow-[3px_3px_0px_#D38502]"
      >
        <p className="px-6 p-1 border-white border border-dashed rounded-full font-bold text-white text-center">
          Go to website
        </p>
      </Link>
    </div>
  );
}
