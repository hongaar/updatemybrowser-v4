import { slug } from "./mixins/slug";

export const site = {
  name: "site",
  title: "Site",
  type: "document",
  fieldsets: [
    {
      name: "branding",
      title: "Branding",
      options: { collapsible: true, collapsed: false },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "domain",
      media: "icon",
    },
  },
  fields: [
    {
      name: "name",
      title: "Name",
      description: "e.g. Update my Browser",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    slug(),
    {
      name: "domain",
      title: "Domain",
      description: "e.g. updatemybrowser.org",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon",
      type: "icon",
      fieldset: "branding",
    },
    {
      name: "logo",
      title: "Logo",
      type: "figure",
      fieldset: "branding",
    },
    {
      name: "color",
      title: "Color",
      type: "color",
      fieldset: "branding",
    },
  ],
};
