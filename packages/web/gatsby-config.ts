import * as dotenv from 'dotenv'
import type { GatsbyConfig } from 'gatsby'
import clientConfig from './client-config'

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const isProd = process.env.NODE_ENV === 'production'

const config: GatsbyConfig = {
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
  ],
}

export default config
