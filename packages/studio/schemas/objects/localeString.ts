import { languages } from '@updatemybrowser/core'

export const localeString = {
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
