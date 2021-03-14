import React from 'react'
import { graphql } from 'gatsby'
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


  return (
    <Layout>
      <h2>{stories[0].node.story.title}</h2>
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
    allContentfulComic(filter: {story: {slug: {eq: $slug}}, 
                                node_locale: {eq: "en-US"}}) {
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
                    fluid {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
        }
    }
}`