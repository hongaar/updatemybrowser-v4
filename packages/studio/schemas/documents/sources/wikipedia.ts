import { slug } from '../mixins'

export const sourceWikipedia = {
  name: 'sourceWikipedia',
  title: 'Wikipedia source',
  type: 'document',
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title,
        subtitle: 'Wikipedia',
      }
    },
  },
  fieldsets: [
    {
      name: 'selector',
      title: 'Selector',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'e.g. Opera',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    slug(),
    {
      name: 'pageId',
      title: 'Page ID',
      description: 'e.g. 2602583',
      type: 'string',
      fieldset: 'selector',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'field',
      title: 'Field',
      description: 'e.g. latest_release_version',
      type: 'string',
      fieldset: 'selector',
      validation: (Rule) => Rule.required(),
    },
  ],
}
