type Language = {
  id: string
  title: string
  isDefault?: true
}

export const languages: Language[] = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'nl', title: 'Dutch' }
]
