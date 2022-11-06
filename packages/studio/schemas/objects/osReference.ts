export const osReference = {
  name: 'osReference',
  type: 'object',
  title: 'Operating system reference',
  fields: [
    {
      name: 'author',
      type: 'reference',
      to: [
        {
          type: 'author',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'author.name',
      media: 'author.image.asset',
    },
  },
}
