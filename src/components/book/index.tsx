import React from 'react'
import { Link } from 'gatsby'
import { Page } from './../../components'
import './book.scss'

const Book = ({ ...props }) => {

  const { stories } = props;
  const firstStory = stories[0].node;
  const title = firstStory.story.title;

  return (
    <div className='book-container'>
      <Link to={`/stories/${firstStory.story.slug}/1`}>
        <h2>{title}</h2>
      </Link>
      {stories.map(({ node }) => {
        return (
          <React.Fragment key={node.title}>
            <Page story={node} />
            <br />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Book;