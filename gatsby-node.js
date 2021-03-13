const path = require('path')

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      return result;
    })
  )
});

// Implement the Gatsby API "createPages". This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
  
    // Create pages for each blog.
    const getStory = makeRequest(graphql, `
       {
        allContentfulComic {
            edges {
              node {
                story {
                    title
                    slug
                }
                title
              }
            }
          }
       }
       `).then(result => {
           let stories = [];
      result.data.allContentfulComic.edges.forEach(({ node }) => {
          const slug = node.story.slug;
          if(stories.includes(slug)) {
            return;
          }
        createPage({
          path: `stories/${slug}`,
          component: path.resolve(`src/templates/stories/index.tsx`),
          context: {
            slug: slug,
          },
        })
        stories = [...stories, slug]
      })
    });

    return Promise.all([
        getStory,
    ])
}