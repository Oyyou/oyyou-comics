import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

const Stories = ({...props}) => {

    const stories = get(props, "data.allContentfulComic.edges");

    debugger;

    return (
        <>
        {stories.map(story => {
            return (
                <h1 key={story.title}>{story.node.title}</h1>
            )
        })}
        </>
    )
}

export default Stories;

export const query = graphql`
query CollectionIndex($slug: String!) {
    allContentfulComic(filter: {story: {slug: {eq: $slug}}, 
                                node_locale: {eq: "en-US"}}) {
        edges {
            node {
                title
                story {
                    title
                    slug
                }
                node_locale
            }
        }
    }
}`