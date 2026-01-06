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
      of: [{ type: "block" }],
    }),
  ],
});
