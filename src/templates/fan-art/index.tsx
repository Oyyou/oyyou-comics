import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout } from './../../components'

const PageTemplate = ({ ...props }) => {

    const { book, page, slug } = props.pageContext;

    const fanArt = get(props, "data.allContentfulFanArt.edges");
    const firstFanArt = fanArt[0].node;
    const title = firstFanArt.story.title;

    return (
        <Layout title={`${title} - Fan Art`}>
            <h2>{title} - Fan Art</h2>
            {fanArt.map(({ node }) => {
                return (
                    <div key={node.title}>
                        <p>{node.title}</p>
                        <Img fluid={node.image.fluid} />
                        <p>Submitted by {node.artist}</p>
                    </div>
                )
            })}
        </Layout>
    )
}

export default PageTemplate;

export const query = graphql`
query ($slug: String!) {
    allContentfulFanArt(filter: {story: {slug: {eq: $slug}}}) {
        edges {
            node {
                title
                artist
                story {
                    title
                    slug
                }
                submitDate
                image {
                    fluid (maxWidth: 800) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
        }
    }
}`