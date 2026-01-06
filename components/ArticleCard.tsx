import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  category: string;
  date: string;
  excerpt?: string;
  imageUrl?: string;
  slug: string;
  variant?: "hero" | "standard" | "compact" | "text-only";
  className?: string;
}

export function ArticleCard({
  title,
  category,
  date,
  excerpt,
  imageUrl,
  slug,
  variant = "standard",
  className,
}: ArticleCardProps) {
  if (variant === "text-only") {
    return (
      <Link
        href={`/article/${slug}`}
        className={cn("group block h-full", className)}
      >
        <div className="flex h-full flex-col justify-between border-t border-gray-200 pt-4 transition-colors hover:border-black">
          <div>
            <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <span className="text-blue-600">{category}</span>
              <span>{date}</span>
            </div>
            <h3 className="font-heading text-2xl font-bold leading-tight text-black group-hover:text-gray-600 font-sans">
              {title}
            </h3>
            {excerpt && (
              <p className="mt-3 font-serif text-sm leading-relaxed text-gray-600 line-clamp-3">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${slug}`} className={cn("group block", className)}>
      <div className="flex flex-col gap-4">
        {/* Image Container - Only render if imageUrl exists */}
        {imageUrl ? (
          <div className="relative overflow-hidden bg-gray-100">
            <div
              className={cn(
                "relative w-full transition-transform duration-500 group-hover:scale-105",
                variant === "hero" ? "aspect-[16/9]" : "aspect-[3/2]"
              )}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ) : (
          /* Fallback if no image but not text-only variant (though arguably should use text-only logic) */
          <div className="relative overflow-hidden bg-gray-100">
            <div
              className={cn(
                "relative w-full bg-gray-200",
                variant === "hero" ? "aspect-[16/9]" : "aspect-[3/2]"
              )}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="text-blue-600">{category}</span>
            <span>{date}</span>
          </div>
          <h3
            className={cn(
              "font-bold leading-tight text-black transition-colors group-hover:text-gray-600 font-sans",
              variant === "hero"
                ? "text-3xl md:text-5xl lg:text-6xl mb-4"
                : "text-xl md:text-2xl mb-2"
            )}
          >
            {title}
          </h3>
          {excerpt && (
            <p
              className={cn(
                "font-serif text-gray-600 leading-relaxed",
                variant === "hero"
                  ? "text-lg md:text-xl line-clamp-3 max-w-3xl"
                  : "text-sm line-clamp-3"
              )}
            >
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
