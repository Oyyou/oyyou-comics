import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Book, Layout, Page } from './../../components'

const Story = ({ ...props }) => {

  const stories = get(props, "data.allContentfulComic.edges").sort((a, b) => {

    if (a.node.page < b.node.page)
      return -1;
    else if (a.node.page > b.node.page)
      return 1;

    return 0;
  });


  return (
    <Layout>
      <Book stories={stories} />
    </Layout>
  )
}

export default Story;

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