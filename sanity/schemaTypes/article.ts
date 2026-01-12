import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Art", value: "Art" },
          { title: "Pop Culture", value: "Pop Culture" },
          { title: "Music", value: "Music" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD.MM.YY",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      validation: (rule) => rule.min(1),
      description:
        "Estimated reading time in minutes (e.g. 2 for '2 min read').",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageUrl", // Keeping the name consistent with frontend props for now, though "mainImage" is more standard
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Recommended: Upload 16:9 images or use the hotspot tool to crop for the Hero section (16:9 aspect ratio).",
      fields: [
        defineField({
          name: "source",
          title: "Image Source / Credit",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
            { title: "Center", value: "center" },
            { title: "Right", value: "right" },
            { title: "Justify", value: "justify" },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Important for SEO and accessibility.",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "views",
      title: "View Count",
      type: "number",
      initialValue: 0,
      description:
        "Estimated or actual view count for sorting 'Most Read' section.",
    }),
    defineField({
      name: "isPinned",
      title: "Pin to Hero",
      type: "boolean",
      initialValue: false,
      description:
        "If checked, this article will be featured as the main Hero on the homepage.",
    }),
  ],
});
