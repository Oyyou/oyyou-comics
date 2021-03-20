import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import '../../styles/main.scss'
import './layout.scss'

const Layout = ({ ...props }) => {

  const { children, title, description } = props;

  const {
    allContentfulSlug: { edges: stories },
  } = useStaticQuery(graphql`
        query {
            allContentfulSlug {
                edges {
                    node {
                        slug
                        title
                    }
                }
            }
        }`
  );

  const getTitle = () => {

    let value = "Oyyou Comics";

    if (title.length > 0) {
      value += " - " + title;
    }

    return value;
  }

  const getDescription = () => {
    if (description.length > 0) {
      return description;
    }

    return "A collection of comics created by Niall A Lewin while lay in bad";
  }

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv='content-language' content='en-gb' />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>{getTitle()}</title>
        <meta name="description" content={getDescription()} />
        <meta name="author" content="Niall Lewin" />
      </Helmet>
      <nav className="header">
        <Link to="/">
          <h1>Oyyou Comics</h1>
        </Link>
      </nav>
      <div className="body">
        <article>
          {children}
        </article>
        <aside>
          <h3>Stories</h3>
          <div className="flex-down">
            {stories.map(({ node }) => {
              return (
                <Link key={node.slug} to={`/stories/${node.slug}/1`}>
                  {node.title}
                </Link>
              )
            })}
          </div>
        </aside>
      </div>
      <footer>
        <p>Niall was here</p>
      </footer>
    </div>
  )
};

export default Layout;

Layout.defaultProps = {
  title: "",
  description: "",
}
