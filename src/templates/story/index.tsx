import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Book, Layout, NavigationControls } from './../../components'
import './story.scss'

const Story = ({ ...props }) => {

  const { slug, book } = props.pageContext;

  const stories = get(props, "data.allContentfulComic.edges").sort((a, b) => {

    if (a.node.page < b.node.page)
      return -1;
    else if (a.node.page > b.node.page)
      return 1;

    return 0;
  });

  const otherStories = get(props, "data.otherBooks.edges");
  const prevBook = otherStories.filter(c => c.node.book === book - 1);
  const nextBook = otherStories.filter(c => c.node.book === book + 1);
  
  const prevPath = prevBook.length > 0 ?
    `/stories/${slug}/${book - 1}` :
    '';
  const nextPath = nextBook.length > 0 ?
    `/stories/${slug}/${book + 1}` :
    '';

  return (
    <Layout>
      <Book stories={stories} />
      <NavigationControls prevPath={prevPath} nextPath={nextPath} />
    </Layout>
  )
}

export default Story;

export const query = graphql`
query ($slug: String!, $book: Int!) {
    allContentfulComic(filter: {story: {slug: {eq: $slug}},  
                                book: {eq: $book}}) {
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
    otherBooks: allContentfulComic(filter: {story: {slug: {eq: $slug}},  
                                book: {ne: $book}}) {
        edges {
            node {
                title
                book
            }
        }
    }
}`