export function slug(options = { source: 'title' }) {
  return {
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    description: 'URL fragment of this object',
    options: {
      source: options.source,
      maxLength: 96,
    },
    validation: (Rule) => Rule.required(),
  }
}
