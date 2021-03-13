import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout } from './../../components'

const Page = ({ ...props }) => {

    const comic = get(props, "data.contentfulComic");


    return (
        <Layout>
            <div key={comic.title}>
                <h1>{comic.title}</h1>
                <Img fluid={comic.image.fluid} />
            </div>

        </Layout>
    )
}

export default Page;

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