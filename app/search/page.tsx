import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

interface SanityArticle {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl?: any;
  slug: string;
}

async function searchArticles(queryStr: string): Promise<SanityArticle[]> {
  const query = `*[_type == "article" && (title match $text || excerpt match $text || content[].children[].text match $text)] | order(date desc) {
    title,
    category,
    date,
    excerpt,
    imageUrl,
    "slug": slug.current
  }`;

  try {
    // Sanity's 'match' operator works best with specific text search strategies,
    // appending * wildcard for partial matches usually helps in simple implementations.
    return await client.fetch(query, { text: `*${queryStr}*` });
  } catch (error) {
    console.error("Error searching articles:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";

  const articles = query ? await searchArticles(query) : [];

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
          <h1 className="font-sans text-2xl font-bold uppercase tracking-tighter text-black md:text-3xl">
            Search Results: <span className="text-gray-500">"{query}"</span>
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
              {query
                ? "No articles found matching your search."
                : "Enter a keyword to start searching."}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
