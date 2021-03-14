import * as React from "react"
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout, Page } from '../components'


const IndexPage = ({ ...props }) => {

  const story = get(props, "data.contentfulComic");

  return (
    <Layout>
      <h2>Latet post</h2>
      <Page story={story} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query {
    contentfulComic {
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
}`