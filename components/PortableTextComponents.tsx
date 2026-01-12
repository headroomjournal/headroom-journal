import { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 font-serif text-base leading-relaxed text-gray-800 md:text-xl">
        {children}
      </p>
    ),
    center: ({ children }) => (
      <p className="mb-6 font-serif text-base leading-relaxed text-gray-800 md:text-xl text-center">
        {children}
      </p>
    ),
    right: ({ children }) => (
      <p className="mb-6 font-serif text-base leading-relaxed text-gray-800 md:text-xl text-right">
        {children}
      </p>
    ),
    justify: ({ children }) => (
      <p className="mb-6 font-serif text-base leading-relaxed text-gray-800 md:text-xl text-justify">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-sans text-3xl font-bold tracking-tight text-black">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-8 font-sans text-2xl font-bold tracking-tight text-black">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-blue-600 pl-6 italic text-gray-900">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 ml-6 list-disc space-y-2 font-serif text-base text-gray-800 md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 ml-6 list-decimal space-y-2 font-serif text-base text-gray-800 md:text-lg">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-600"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-10">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-gray-100">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-sans text-xs text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
