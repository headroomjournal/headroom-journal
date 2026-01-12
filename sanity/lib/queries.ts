import { groq } from "next-sanity";

// Homepage Query: Recent 100 articles, exclude 'content' to reduce payload
export const ARTICLES_QUERY = groq`*[_type == "article"] | order(date desc)[0...100] {
  title,
  category,
  date,
  readingTime,
  excerpt,
  imageUrl,
  "slug": slug.current,
  spotifyUrl,
  views,
  isPinned
}`;

// Article Detail Query: Fetch single article by slug, includes 'content'
export const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0] {
  title,
  category,
  date,
  readingTime,
  excerpt,
  imageUrl,
  "imageSource": imageUrl.source,
  spotifyUrl,
  content
}`;

// Related Articles Query: Fetch 2 articles from same category, exclude current
export const RELATED_ARTICLES_QUERY = groq`*[_type == "article" && category == $category && slug.current != $currentSlug] | order(date desc) [0...2] {
  title,
  category,
  date,
  readingTime,
  excerpt,
  imageUrl,
  "slug": slug.current
}`;
