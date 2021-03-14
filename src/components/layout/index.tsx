import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import '../../styles/main.scss'
import './layout.scss'

const Layout = ({ ...props }) => {

  const { children } = props;

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

  return (
    <div className="container">
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