import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout } from './../../components'

const PageTemplate = ({ ...props }) => {

    const fanArt = get(props, "data.allContentfulFanArt.edges");

    return (
        <Layout title={`Fan Art`}>
            <h2>Fan Art</h2>
            {fanArt.map(({ node }) => {
                return (
                    <div key={node.title}>
                        <h3>{node.title}</h3>
                        <Img fluid={node.image.fluid} />
                        <p>Submitted by {node.artist}</p>
                        <br/>
                    </div>
                )
            })}
        </Layout>
    )
}

export default PageTemplate;

export const query = graphql`
query {
    allContentfulFanArt {
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