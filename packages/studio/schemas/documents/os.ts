export const os = {
  name: 'os',
  title: 'Operating system',
  type: 'document',
  fieldsets: [
    {
      name: 'branding',
      title: 'Branding',
      options: { collapsible: true, collapsed: false },
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
      name: 'name',
      title: 'Name',
      description: 'e.g. Windows or Ubuntu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'e.g. windows or ubuntu',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vendor',
      title: 'Vendor',
      description: 'e.g. Microsoft or Canonical',
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
      type: 'icon',
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
