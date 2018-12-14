/**
 * Gatsby Node setup
 *
 */

const path = require('path')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise(async (resolve, reject) => {
    const mdxResult = await graphql(/* GraphQL */ `
      {
        allMdx {
          edges {
            node {
              id
              tableOfContents
              fields {
                id
                slug
              }
              parent {
                ... on File {
                  absolutePath
                  name
                  sourceInstanceName
                }
              }
              code {
                scope
              }
            }
          }
        }
      }
    `)

    if (mdxResult.errors) {
      console.log(mdxResult.errors)
      reject(mdxResult.errors)
    }

    mdxResult.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug || '/',
        component: componentWithMDXScope(
          path.resolve('./src/templates/mdx.js'),
          node.code.scope,
          __dirname
        ),
        context: {
          id: node.fields.id,
          absPath: node.parent.absolutePath,
          tableOfContents: node.tableOfContents
        }
      })
    })

    resolve()
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        Root: path.resolve(__dirname),
        Src: path.resolve(__dirname, 'src'),
        Pages: path.resolve(__dirname, 'src/pages'),
        Tags: path.resolve(__dirname, 'src/shared/inlineTags'),
        Parts: path.resolve(__dirname, 'src/shared/parts')
      }
    }
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from'
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    let value = parent.relativePath.replace(parent.ext, '')

    if (value === 'index') {
      value = ''
    }

    createNodeField({
      name: 'slug',
      node,
      value: `/${value}`
    })

    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'title',
      node,
      value:
        node.frontmatter.title ||
        parent.name.replace(/^[a-z]/, parent.name[0].toUpperCase())
    })

    createNodeField({
      name: 'order',
      node,
      value: node.frontmatter.order || null
    })

    createNodeField({
      name: 'header',
      node,
      value: node.frontmatter.header
    })

    createNodeField({
      name: 'draft',
      node,
      value: node.frontmatter.draft
    })

    createNodeField({
      name: 'status',
      node,
      value: node.frontmatter.status
    })

    // File
  } else if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    // const slug = `/${path.basename(parsedFilePath.dir)}/`
    const slug = `${parsedFilePath.dir.split('/src/pages')[1]}/`

    createNodeField({ node, name: 'slug', value: slug })
  }
}
