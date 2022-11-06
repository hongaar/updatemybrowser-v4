import { isNewer } from './versions'

describe('isNewer', () => {
  const versions = [
    ['2', '1'],
    ['1.1', '1.0'],
    ['2.0.0', '1.9.9'],
    ['410.0.0.0', '409.999.999.999'],
    ['55.1', '55'],
    ['2.0.0', '1'],
    ['2', '1.999'],
    ['v1', 'v0']
  ] as [string, string][]

  test.each([...versions, ['0', null], ['0', undefined]])(
    '%s is newer than %s',
    (newVersion, currentVersion) => {
      expect(isNewer(currentVersion, newVersion)).toBeTruthy()
    }
  )

  test.each([
    ...(versions.map(([a, b]) => [b, a]) as [string, string][]),
    [null, null],
    [undefined, undefined]
  ])('%s is not newer than %s', (newVersion, currentVersion) => {
    expect(isNewer(currentVersion, newVersion)).toBeFalsy()
  })
})
