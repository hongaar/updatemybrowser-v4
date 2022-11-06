export const browser = {
  name: 'browser',
  title: 'Browser',
  type: 'document',
  fieldsets: [
    {
      name: 'branding',
      title: 'Branding',
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'vendor',
      media: 'icon',
    },
  },
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Browser', value: 'browser' },
          { title: 'Operating System', value: 'os' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      description: 'e.g. Windows or Firefox',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'e.g. windows or firefox',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vendor',
      title: 'Vendor',
      description: 'e.g. Microsoft or Mozilla',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'homepage',
      title: 'Homepage',
      description: 'e.g. https://www.microsoft.com/windows',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'figure',
      fieldset: 'branding',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'figure',
      fieldset: 'branding',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      fieldset: 'branding',
    },
  ],
}
