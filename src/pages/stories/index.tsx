import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout } from './../../components'

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
            {stories.map(({ node }) => {
                return (
                    <div key={node.title}>
                        <h1>{node.title}</h1>
                        <Img fluid={node.image.fluid} />
                    </div>
                )
            })}
        </Layout>
    )
}

export default Stories;

export const query = graphql`
query {
    allContentfulComic(filter: {node_locale: {eq: "en-US"}}) {
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