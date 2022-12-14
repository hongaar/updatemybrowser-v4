import { slug } from '../mixins'

export const sourceCanIUse = {
  name: 'sourceCanIUse',
  title: 'caniuse.com source',
  type: 'document',
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title,
        subtitle: 'caniuse.com',
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
      name: 'agent',
      title: 'Agent identifier',
      description: 'e.g. opera',
      type: 'string',
      fieldset: 'selector',
      validation: (Rule) => Rule.required(),
    },
  ],
}
