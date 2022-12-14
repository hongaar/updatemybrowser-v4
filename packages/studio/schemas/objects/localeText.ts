import { languages } from '@updatemybrowser/core'

export const localeText = {
  name: 'localeText',
  title: 'Localized text',
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
    type: 'text',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
