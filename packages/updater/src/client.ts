// @ts-ignore
import sanityClient from '@sanity/client'

// If sanityBaseClient is defined, we're imported from inside Sanity Studio.
// In that case, use the part:@sanity/base/client as the client and disable the
// write-only client (set to null).
let sanityBaseClient
try {
  // @ts-ignore
  sanityBaseClient = require('part:@sanity/base/client?')
} catch (error) {}

const { projectId, dataset } = getConfig()

export const readFromSanity =
  sanityBaseClient ??
  (sanityClient({
    projectId,
    dataset,
    useCdn: true
  }) as any)

export const writeToSanity = sanityBaseClient
  ? null
  : (sanityClient({
      projectId,
      dataset,
      token: process.env.SANITY_TOKEN,
      useCdn: false
    }) as any)

function getConfig() {
  return {
    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset: process.env.SANITY_DATASET || ''
  }
}
