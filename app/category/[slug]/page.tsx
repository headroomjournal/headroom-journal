import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Interface for what we fetch from Sanity
interface SanityArticle {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl?: any;
  slug: string;
}

async function getArticlesByCategory(
  category: string
): Promise<SanityArticle[]> {
  // Case insensitive match is a bit harder in basic GROQ without plugins,
  // but assuming standard capitalization in CMS "Culture", "Design" etc.
  // We can try to match based on the string value stored.
  // A safer bet is to fetch all and filter in JS if exact casing isn't guaranteed,
  // OR rely on the slug to match a lowercased category field if we had one.
  // For now, let's try to match the category field directly assuming the slug 'culture' maps to 'Culture'.
  // We'll capitalize the slug first.

  // Map slugs to CMS category values
  const categoryMap: Record<string, string> = {
    art: "Art",
    "pop-culture": "Pop Culture",
    music: "Music",
  };

  const cmsCategory =
    categoryMap[category.toLowerCase()] ||
    // Fallback: capitalized slug (e.g. "culture" -> "Culture")
    category.charAt(0).toUpperCase() + category.slice(1);

  const query = `*[_type == "article" && category == $cmsCategory] | order(date desc) {
    title,
    category,
    date,
    excerpt,
    imageUrl,
    "slug": slug.current
  }`;

  try {
    return await client.fetch(query, { cmsCategory });
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return [];
  }
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Basic validation/sanitization could go here, but with dynamic CMS categories
  // we might want to accept any slug and just show empty if no articles.

  const articles = await getArticlesByCategory(slug);
  const categoryName =
    slug === "pop-culture"
      ? "Pop Culture"
      : slug.charAt(0).toUpperCase() + slug.slice(1);

  // If we really want to return 404 for completely unknown categories we'd need a separate "Category" document type in Sanity.
  // For now, consistent with previous behavior (mostly), we show empty state or 404 if we want to be strict.
  // Let's just show the page with empty state if no articles found, as it's more dynamic-friendly.

  const withImageUrl = (article: SanityArticle) => ({
    ...article,
    imageUrl: article.imageUrl ? urlFor(article.imageUrl).url() : undefined,
  });

  const formattedArticles = articles.map(withImageUrl);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 pb-20 pt-8 md:px-6">
        <div className="mb-12 border-b border-black pb-6">
          <h1 className="font-sans text-5xl font-bold uppercase tracking-tighter text-black md:text-7xl">
            {categoryName}
          </h1>
        </div>

        {formattedArticles.length > 0 ? (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {formattedArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} variant="standard" />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-gray-500">
              No articles found in this category yet.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
