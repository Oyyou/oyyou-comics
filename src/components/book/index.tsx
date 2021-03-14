import React from 'react'
import { Page } from './../../components'
import './book.scss'

const Book = ({ ...props }) => {

  const { stories } = props;
  const title = stories[0].node.story.title;

  return (
    <div className='book-container'>
      <h2>{title}</h2>
      {stories.map(({ node }) => {
        return (
          <Page key={node.title} story={node} />
        )
      })}
    </div>
  )
}

export default Book;