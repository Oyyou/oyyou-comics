import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout, Page } from './../../components'

const PageTemplate = ({ ...props }) => {

  const comic = get(props, "data.contentfulComic");


  return (
    <Layout>
      <Page story={comic} />
    </Layout>
  )
}

export default PageTemplate;

export const query = graphql`
query ($slug: String!, $book: Int!, $page: Int!) {
    contentfulComic(story: {slug: {eq: $slug}}, 
                            book: {eq: $book},
                            page: {eq: $page},
                            node_locale: {eq: "en-US"}) {
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