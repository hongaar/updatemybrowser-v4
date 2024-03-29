export const browser = {
  name: "browser",
  title: "Browser",
  type: "document",
  fieldsets: [
    {
      name: "branding",
      title: "Branding",
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "vendor",
      media: "icon",
    },
  },
  fields: [
    {
      name: "name",
      title: "Name",
      description: "e.g. Chrome or Firefox",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      description: "e.g. chrome or firefox",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "vendor",
      title: "Vendor",
      description: "e.g. Google or Mozilla",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "homepage",
      title: "Homepage",
      description: "e.g. https://www.google.com/chrome/",
      type: "url",
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
