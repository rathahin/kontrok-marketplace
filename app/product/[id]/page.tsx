import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { productById, products } from "@/lib/data";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = productById((await params).id);
  return p ? { title: `${p.title} | Kontrok.com`, description: p.highlights.join(" · ") } : { title: "Product not found | Kontrok.com" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const p = productById((await params).id);
  if (!p) notFound();
  // keyed so variant/qty/gallery state resets when navigating between products
  return <ProductDetail key={p.id} p={p} />;
}
