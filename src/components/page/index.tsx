import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import './page.scss'

const Page = ({ ...props }) => {

  const { story } = props;

  return (
    <div className="page-container">
      <Link to={`/stories/${story.story.slug}/${story.book}/${story.page}`}>
        <h3>{`${story.book}.${story.page} - ${story.title}`}</h3>
      </Link>
      <Img fluid={story.image.fluid} />
    </div>
  )
}

export default Page;