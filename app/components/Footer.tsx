import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-24 bg-gray-100 text-slate-800">
      <p>
        Built with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by{" "}
        <Link href="https://ryan-james.dev">Ryan James</Link>
        </p>
    </footer>
    );
  }