import { ArticleCard } from "@/components/ArticleCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Re-defining the Article interface for the component's internal use based on Sanity response
interface SanityArticle {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl?: any; // Sanity Image object
  slug: string;
  spotifyUrl?: string;
  content?: any;
}

async function getArticles(): Promise<SanityArticle[]> {
  // Fetch all articles sorted by date
  // We explicitly fetch the slug as a string
  const query = `*[_type == "article"] | order(date desc) {
    title,
    category,
    date,
    excerpt,
    imageUrl,
    "slug": slug.current,
    spotifyUrl,
    content
  }`;

  try {
    const articles = await client.fetch<SanityArticle[]>(query);
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const allArticles = await getArticles();

  // Helper to transform Sanity image object to URL string
  const withImageUrl = (article: SanityArticle) => ({
    ...article,
    imageUrl: article.imageUrl ? urlFor(article.imageUrl).url() : undefined,
  });

  // Separate "Text Only" articles (those without images) from "Visual" articles
  // This maintains the "From the Archives" section logic
  const visualArticlesRaw = allArticles.filter((a) => a.imageUrl);
  const textArticlesRaw = allArticles.filter((a) => !a.imageUrl);

  // Transform to match component props
  const visualArticles = visualArticlesRaw.map(withImageUrl);
  const textArticles = textArticlesRaw.map(withImageUrl);

  // Distribution logic matches the original static design
  const heroArticle = visualArticles[0];
  const sideArticles = visualArticles.slice(1, 4);
  const gridArticles = visualArticles.slice(4);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 pb-20 pt-8 md:px-6">
        {/* Section 1: Hero & Highlight */}
        {heroArticle && (
          <section className="mb-20 grid gap-8 lg:grid-cols-12">
            {/* Main Hero */}
            <div className="lg:col-span-8">
              <ArticleCard {...heroArticle} variant="hero" className="h-full" />
            </div>

            {/* Side Highlight (Vertical Stack) */}
            <div className="flex flex-col gap-8 border-l border-gray-100 pl-0 lg:col-span-4 lg:pl-8">
              <div className="mb-4 border-b border-gray-100 pb-2">
                <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                  Latest Updates
                </h2>
              </div>
              {sideArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  variant="compact"
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: The Grid */}
        {gridArticles.length > 0 && (
          <section className="mb-24">
            <div className="mb-8 flex items-end justify-between border-b border-black pb-4">
              <h2 className="font-sans text-3xl font-bold leading-none tracking-tighter text-black">
                Selected Stories
              </h2>
              <span className="font-mono text-xs text-gray-500">
                01 — {gridArticles.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  variant="standard"
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Text Only / Ideas */}
        {textArticles.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 border-b border-black pb-4">
              <h2 className="font-sans text-3xl font-bold leading-none tracking-tighter text-black">
                From the Archives
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {textArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  variant="text-only"
                  imageUrl="" // Fallback for prop requirement
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
