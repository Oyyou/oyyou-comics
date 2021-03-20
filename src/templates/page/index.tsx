import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Layout, Page, NavigationControls } from './../../components'

const PageTemplate = ({ ...props }) => {

  const { book, page, slug } = props.pageContext;

  const comic = get(props, "data.contentfulComic");

  const otherStories = get(props, "data.otherPages.edges");
  const prevPage = otherStories.filter(c => c.node.page === page - 1);
  const nextPage = otherStories.filter(c => c.node.page === page + 1);
  
  const prevPath = prevPage.length > 0 ?
    `/stories/${slug}/${book}/${page - 1}` :
    '';
  const nextPath = nextPage.length > 0 ?
    `/stories/${slug}/${book}/${page + 1}` :
    '';

  const title = comic.story.title;

  return (
    <Layout title={comic.title}>
      <h2>{title}</h2>
      <Page story={comic} />
      <NavigationControls prevPath={prevPath} nextPath={nextPath} />
    </Layout>
  )
}

export default PageTemplate;

export const query = graphql`
query ($slug: String!, $book: Int!, $page: Int!) {
    contentfulComic(story: {slug: {eq: $slug}}, 
                            book: {eq: $book},
                            page: {eq: $page}) {
        title
        book
        page
        story {
            title
            slug
        }
        node_locale
        image {
            fluid (maxWidth: 800) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
    }
    otherPages: allContentfulComic(filter: {story: {slug: {eq: $slug}},  
                                book: {eq: $book}}) {
        edges {
            node {
                title
                book
                page
            }
        }
    }
}`