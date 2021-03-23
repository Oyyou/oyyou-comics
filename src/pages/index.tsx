import * as React from "react"
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout, Page } from '../components'


const IndexPage = ({ ...props }) => {

  const stories = get(props, "data.allContentfulComic.edges");

  return (
    <Layout>
      <h2>Latest posts</h2>
      {stories.map(({ node }) => {
        return (
          <React.Fragment key={node.title}>
            <Page story={node} />
            <br />
          </React.Fragment>
        )
      })}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query {
    allContentfulComic(limit: 5) {
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
  }
`