// @ts-ignore
import sanityClient from '@sanity/client'

const {
  api: { projectId, dataset }
} = requireConfig('../../studio/sanity.json')

export const client = sanityClient({
  projectId,
  dataset,
  useCdn: true
}) as any

function requireConfig(path: string) {
  try {
    return require(path)
  } catch (e) {
    console.error(
      'Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js'
    )
    return {
      api: {
        projectId: process.env.SANITY_PROJECT_ID || '',
        dataset: process.env.SANITY_DATASET || ''
      }
    }
  }
}
