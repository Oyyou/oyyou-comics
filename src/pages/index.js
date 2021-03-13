import * as React from "react"
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Link } from "gatsby"
import { Layout } from './../components'
import { useRemoveDupes, useGroupBy } from './../hooks'


const IndexPage = ({...props}) => {

  const stories = get(props, "data.allContentfulComic.edges");
  const storyTitles = useRemoveDupes(stories.map(({node}) => node.story.slug));
  const groupedStories = useGroupBy(stories, (c) => c.node.story.slug);
  debugger;


    return(
      <Layout>
        <h1>Hello</h1>
        {storyTitles.map(c => <h2>{c}</h2>)}
      </Layout>
    )
}

export default IndexPage

export const query = graphql`
query {
    allContentfulComic {
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