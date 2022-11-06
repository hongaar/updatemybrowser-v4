import compareVersions from 'compare-versions'

export function isNewer(
  currentVersion?: string | null,
  newVersion?: string | null
) {
  if (!currentVersion && !newVersion) {
    return false
  }

  if (!currentVersion) {
    return true
  }

  if (!newVersion) {
    throw new Error('newVersion is not specified')
  }

  return compareVersions(newVersion || '', currentVersion || '') === 1
}
