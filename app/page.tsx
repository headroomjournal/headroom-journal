import { ArticleCard } from "@/components/ArticleCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Re-defining the Article interface for the component's internal use based on Sanity response
interface SanityArticle {
  title: string;
  category: string;
  date: string;
  readingTime?: number;
  excerpt: string;
  imageUrl?: any;
  slug: string;
  spotifyUrl?: string;
  views?: number;
  isPinned?: boolean;
}

async function getArticles(): Promise<SanityArticle[]> {
  try {
    const articles = await client.fetch<SanityArticle[]>(ARTICLES_QUERY);
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export const revalidate = 3600; // Revalidate every 1 hour

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
  const allArticlesFormatted = allArticles.map(withImageUrl);

  // Pin Feature Logic
  const pinnedArticle = allArticlesFormatted.find((a) => a.isPinned);

  let heroArticle: any;
  if (pinnedArticle) {
    heroArticle = pinnedArticle;
  } else {
    heroArticle = allArticlesFormatted[0];
  }

  // Distribution logic decoupled from Hero
  const sideArticles = allArticlesFormatted.slice(0, 3);
  const gridArticles = allArticlesFormatted.slice(3, 6);
  const archiveArticles = allArticlesFormatted.slice(6);

  // "Most Read" logic - sort by views
  const mostReadArticles = [...allArticlesFormatted]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  // "Listen" section - articles with spotifyUrl
  const listenArticles = allArticlesFormatted
    .filter((a) => a.spotifyUrl)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 pb-20 pt-8 md:px-6">
        {/* Spotlight Section */}
        {heroArticle && (
          <section className="mb-20 grid gap-8 lg:grid-cols-12">
            <div
              className={cn(
                sideArticles.length > 0 ? "lg:col-span-8" : "lg:col-span-12"
              )}
            >
              <ArticleCard
                {...heroArticle}
                variant="hero"
                className="h-full"
                priority={true}
              />
            </div>

            {sideArticles.length > 0 && (
              <div className="flex flex-col gap-5 border-l border-gray-100 pl-0 lg:col-span-4 lg:pl-8">
                <div className="mb-2 border-b border-gray-100 pb-2">
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
            )}
          </section>
        )}

        {/* Selected Stories (The Grid) */}
        {gridArticles.length > 0 && (
          <section className="mb-24">
            <div className="mb-8 flex items-end justify-between border-b border-black pb-4">
              <h2 className="font-sans text-3xl font-bold leading-none tracking-tighter text-black">
                Selected Stories
              </h2>
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

        {/* Most Read & Archive Mid-Section */}
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Most Read Items */}
          {mostReadArticles.length >= 3 && (
            <section className="lg:col-span-4">
              <div className="mb-8 border-b border-black pb-4">
                <h2 className="font-sans text-2xl font-bold tracking-tight text-black">
                  Most Read
                </h2>
              </div>
              <div className="flex flex-col divide-y divide-gray-100">
                {mostReadArticles.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/article/${article.slug}`}
                    className="group flex gap-4 py-4 first:pt-0"
                  >
                    <span className="font-sans text-2xl font-black text-gray-200 transition-colors group-hover:text-blue-600">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="flex flex-col">
                      <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                        {article.category}
                      </span>
                      <h3 className="font-sans text-sm font-bold leading-tight text-black group-hover:underline">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* From the Archives */}
          {archiveArticles.length > 0 && (
            <section
              className={cn(
                mostReadArticles.length >= 3
                  ? "lg:col-span-8"
                  : "lg:col-span-12"
              )}
            >
              <div className="mb-8 border-b border-black pb-4 flex items-center justify-between">
                <h2 className="font-sans text-2xl font-bold tracking-tight text-black">
                  From the Archives
                </h2>
              </div>
              <div
                className={cn(
                  "grid grid-cols-2 gap-6 md:grid-cols-3 text-sm",
                  mostReadArticles.length < 3 && "md:grid-cols-4 lg:grid-cols-6"
                )}
              >
                {archiveArticles.map((article) => (
                  <ArticleCard key={article.slug} {...article} variant="mini" />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Listen Section (Audio/Playlists) */}
        {listenArticles.length > 0 && (
          <section className="mt-24 border-t-2 border-black pt-12">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="font-sans text-5xl font-black leading-none tracking-tighter text-black md:text-7xl">
                  Listen
                </h2>
                <p className="mt-4 max-w-md font-serif text-sm text-gray-500">
                  Weekly playlists, mixtapes and podcasts for your listening
                  pleasure.
                </p>
              </div>
              <div className="hidden border-l border-gray-200 pl-8 md:block">
                <Link
                  href="/category/Music"
                  className="group flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-widest text-black"
                >
                  More Audio
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-6">
              {listenArticles.map((article) => (
                <ArticleCard key={article.slug} {...article} variant="audio" />
              ))}
            </div>

            <div className="mt-10 block md:hidden">
              <Link
                href="/category/Music"
                className="flex items-center justify-center border border-black py-4 font-sans text-xs font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white"
              >
                More Audio →
              </Link>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
