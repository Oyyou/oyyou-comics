import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import { useSwipeable } from 'react-swipeable'
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

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => { if (prevPath.length > 0) navigate(prevPath); },
    onSwipedLeft: (eventData) => { if (nextPath.length > 0) navigate(nextPath); }
  });

  const title = comic.story.title;
  const image = comic.image.fluid.src;

  return (
    <Layout title={comic.title} swipeHandlers={handlers}>
      <Helmet>
          <meta property="og:image" content={image} />
      </Helmet>
      <Link to={`/stories/${slug}/1`}>
        <h2>{title}</h2>
      </Link>
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
                src
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