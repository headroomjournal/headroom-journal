import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ARTICLE_QUERY, RELATED_ARTICLES_QUERY } from "@/sanity/lib/queries";
import { portableTextComponents } from "@/components/PortableTextComponents";

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return { title: "Article Not Found" };

  const articleImageUrl = article.imageUrl
    ? urlFor(article.imageUrl).width(1200).height(630).url()
    : null;

  return {
    title: `${article.title} | Headroom Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: articleImageUrl ? [articleImageUrl] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: articleImageUrl ? [articleImageUrl] : [],
    },
  };
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Re-fetch type definition to match what we need
interface SanityArticleDetail {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl?: any;
  imageSource?: string;
  spotifyUrl?: string;
  content?: any;
}

interface SanityRelatedArticle {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl?: any;
  slug: string;
}

async function getArticle(slug: string): Promise<SanityArticleDetail | null> {
  try {
    return await client.fetch(ARTICLE_QUERY, { slug });
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

async function getRelatedArticles(
  category: string,
  currentSlug: string
): Promise<SanityRelatedArticle[]> {
  try {
    return await client.fetch(RELATED_ARTICLES_QUERY, {
      category,
      currentSlug,
    });
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

export const revalidate = 21600; // Revalidate every 6 hours

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category, slug);

  const articleImageUrl = article.imageUrl
    ? urlFor(article.imageUrl).url()
    : null;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="container mx-auto max-w-4xl px-4 pb-20 pt-8 md:px-6">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="text-blue-600">{article.category}</span>
            <span>—</span>
            <span>{article.date}</span>
          </div>
          <h1 className="mb-6 font-sans text-4xl font-bold leading-tight tracking-tight text-black md:text-6xl">
            {article.title}
          </h1>
          <p className="font-serif text-xl italic leading-relaxed text-gray-600">
            {article.excerpt}
          </p>
        </header>

        {/* Hero Image */}
        {articleImageUrl && (
          <div className="mb-16">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <Image
                src={articleImageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {article.imageSource && (
              <p className="mt-2 text-right font-sans text-[10px] uppercase tracking-wider text-gray-400">
                Image: {article.imageSource}
              </p>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-lg prose-gray mx-auto max-w-2xl font-serif">
          {/* Spotify Embed (if available) */}
          {article.spotifyUrl && (
            <div className="not-prose mb-10">
              <SpotifyEmbed src={article.spotifyUrl} />
            </div>
          )}
          {/* Portable Text Content */}
          {article.content ? (
            <PortableText
              value={article.content}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-gray-400 italic">
              [Konten artikel belum diisi di CMS]
            </p>
          )}
        </div>

        {/* Related Articles ("Baca Juga") */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 border-t border-gray-100 pt-16">
            <h2 className="mb-10 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
              Read Also
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedArticles.map((rel) => (
                <ArticleCard
                  key={rel.slug}
                  title={rel.title}
                  category={rel.category}
                  date={rel.date}
                  excerpt={rel.excerpt}
                  slug={rel.slug}
                  imageUrl={rel.imageUrl ? urlFor(rel.imageUrl).url() : ""}
                  variant="standard"
                />
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
