export const release = {
  name: "release",
  title: "Release",
  type: "document",
  preview: {
    select: {
      title: "browser.name",
      media: "browser.icon",
      os0: "oses.0.name",
      os1: "oses.1.name",
      os2: "oses.2.name",
      os3: "oses.3.name",
    },
    prepare(selection) {
      const { title, media, os0, os1, os2, os3 } = selection;
      const osNames = [os0, os1, os2].filter(Boolean);
      const subtitle = osNames.length ? osNames.join(", ") : "";
      const hasMore = Boolean(os3);
      return {
        title,
        subtitle: hasMore ? `${subtitle}…` : subtitle,
        media,
      };
    },
  },
  fields: [
    {
      name: "browser",
      title: "Browser",
      type: "reference",
      to: [{ type: "browser" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "oses",
      title: "Operating systems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "os" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sources",
      title: "Sources",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sourceWikipedia" }, { type: "sourceCanIUse" }],
        },
      ],
    },
  ],
};
