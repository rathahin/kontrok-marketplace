import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid max-w-site place-items-center px-4 py-24 text-center">
      <div>
        <p className="text-[56px] font-black text-brand">404</p>
        <h1 className="mt-2 text-[18px] font-semibold text-gray-900">Product not found</h1>
        <Link href="/" className="mt-5 inline-block rounded-md bg-brand px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-brand-600">
          Back to home
        </Link>
      </div>
    </main>
  );
}
