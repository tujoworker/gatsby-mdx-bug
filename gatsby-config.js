/**
 * Gatsby Config
 *
 */

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'gatsby-mdx-bug',
    description:
      'The DNB Style Guide is the go to place for all who has to design, develop or create visuals with the DNB design.',
    // homepage: 'https://www.dnb.no',
    // siteUrl: 'https://www.dnb.no',
    repoUrl: 'https://github.com/tujoworker/gatsby-mdx-bug/tree/master/'
  },
  plugins: [
    // 'gatsby-plugin-offline', // we may test the usage without the offline capabilities
    'gatsby-plugin-remove-serviceworker', // this removes the preloading of links (because of to the font flickering)
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-mdx-bug',
        short_name: 'Eufemia',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#007272',
        display: 'minimal-ui'
      }
    },
    'gatsby-plugin-sharp', // is used by gatsby-remark-images
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        // More info of using plugins: https://github.com/mdx-js/mdx/blob/d4154b8c4a546d0b675826826f85014cc04098c2/docs/plugins.md
        mdPlugins: [],
        hastPlugins: [],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
              showCaptions: true,
              sizeByPixelDensity: true
              // linkImagesToOriginal: true
              // wrapperStyle: {}
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('postcss-calc'),
          require('postcss-custom-properties'),
          require('postcss-preset-env')({ stage: 0 }),
          require('autoprefixer')({
            browsers: ['last 1 versions', 'explorer >= 11']
          })
        ]
      }
    }
  ]
}
