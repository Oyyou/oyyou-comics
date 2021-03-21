import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout, Page } from './../../components'

const Stories = ({ ...props }) => {

  const stories = get(props, "data.allContentfulComic.edges").sort((a, b) => {

    if (a.node.page < b.node.page)
      return -1;
    else if (a.node.page > b.node.page)
      return 1;

    return 0;
  });

  const firstStory = stories[0].node;
  const title = firstStory.story.title;

  return (
    <Layout title={title}>
    <Link to={`/stories/${firstStory.story.slug}/1`}>
      <h2>{title}</h2>
    </Link>
      {stories.map(({ node }) => {
        return (
          <React.Fragment key={node.title}>
            <Page story={node} />
            <br></br>
          </React.Fragment>
        )
      })}
    </Layout>
  )
}

export default Stories;

export const query = graphql`
query ($slug: String!) {
    allContentfulComic(filter: {story: {slug: {eq: $slug}}}) {
        edges {
            node {
                title
                book
                page
                story {
                    title
                    slug
                }
                node_locale
                image {
                    fluid (maxWidth: 800) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
        }
    }
}`