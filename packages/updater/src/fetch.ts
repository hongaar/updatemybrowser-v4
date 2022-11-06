import baseFetch from 'cross-fetch'
import memo from 'memoize-one'

export function fetch<R>(...args: Parameters<typeof baseFetch>) {
  return memo(async (...args: Parameters<typeof baseFetch>) => {
    const response = await baseFetch(...args)

    if (response.status >= 400) {
      console.error(await response.text())
      throw new Error('Bad response from server')
    }

    return (await response.json()) as R
  })(...args)
}
