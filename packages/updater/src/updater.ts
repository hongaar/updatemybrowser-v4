import { readFromSanity, writeToSanity } from './client'
import { status, hr } from './console'
import { asyncForEach } from './asyncForeach'
import { fetchWikipedia, fetchCanIUse, fetchWhatIsMyBrowser } from './sources'
import { QueryResult, Matcher, Updater, Source } from './types'
import { isNewer } from './versions'

const query = `{
  'matchers': 
    *[_type == "matcher"],
  'updaters': 
    *[_type == "updater"],
	'sources': 
    *[_type match "source*"]
}`

export const fetchMap = {
  sourceCanIUse: fetchCanIUse,
  sourceWhatIsMyBrowser: fetchWhatIsMyBrowser,
  sourceWikipedia: fetchWikipedia
}

export function run() {
  hr()
  readFromSanity.fetch(query).then((queryResult: QueryResult) => {
    // Iterate over matchers to update them with their source
    asyncForEach(queryResult.matchers, runMatcher(queryResult))
  })
}

const runMatcher = (queryResult: QueryResult) => async (matcher: Matcher) => {
  const currentVersion = matcher.currentVersion || ''

  status(matcher, currentVersion, 'Fetching new version...')

  const updaters = queryResult.updaters.filter(
    updater => updater.matcher._ref === matcher._id
  )

  if (updaters.length) {
    await asyncForEach(updaters, runUpdater(queryResult, matcher))
  } else {
    status(matcher, new Error('No updaters found, skipping'))
  }

  hr()
}

const runUpdater = (queryResult: QueryResult, matcher: Matcher) => async (
  updater: Updater
) => {
  const source = queryResult.sources.find(
    source => source._id === updater.source._ref
  )

  status(updater, 'Updater found')

  if (!source) {
    status(updater, new Error('No source found, skipping'))
    return
  }

  await runSource(matcher, updater)(source)
}

const runSource = (matcher: Matcher, updater: Updater) => async (
  source: Source
) => {
  try {
    const fetchFn = fetchMap[source._type]
    const currentVersion = matcher.currentVersion
    const newVersion = await fetchFn(source as any)

    if (newVersion === null) {
      status(source, `Did not receive a new version, skipping`)
    } else {
      if (isNewer(currentVersion, newVersion)) {
        await writeToSanity
          .patch(matcher._id)
          .set({ currentVersion: newVersion })
          .commit()
        status(source, newVersion, 'Newer, version updated')
      } else if (currentVersion === newVersion) {
        status(source, newVersion, 'Equal, skipping')
      } else {
        status(source, newVersion, 'Not newer, skipping')
      }
    }
  } catch (error) {
    status(source, error)
  }
}
