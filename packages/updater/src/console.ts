import colors from 'ansi-colors'
import { Slug } from './types'

export function hr() {
  status('------------------------------------------------------------')
}

export function status(
  ...args: Array<{ _type: string; slug: Slug } | string | Error>
) {
  const colours = [colors.yellow, colors.green]

  console.log(
    args
      .map((arg, index) => {
        if (typeof arg === 'string') {
          // Only last string is plain text
          return index === args.length - 1 ? arg : `[${colours[index](arg)}]`
        }

        if (arg instanceof Error) {
          return colors.red(arg.message)
        }

        return `[${colors.blue(arg._type)} ${colours[index](arg.slug.current)}]`
      })
      .join(' ')
  )
}
