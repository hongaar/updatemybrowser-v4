import { client } from './client'

type Upgradable = {
  category: 'os' | 'browser'
  key: string
  name: string
  vendor: string
  homepage: string
  description?: string
  iconUrl?: string
}

const lang = 'en'
const query = `
    *[_type == "upgradable"]
    {
        category,
        'key': slug.current,
        name,
        vendor,
        homepage,
        'description': coalesce(description[$lang], description.en),
        'iconUrl': icon.asset->url,
    }
`

client.fetch(query, { lang }).then((upgradables: Upgradable[]) => {
  upgradables.forEach(upgradable => {
    console.log(upgradable)
  })
})
