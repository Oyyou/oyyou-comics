import React from 'react'
import Img from 'gatsby-image'

const Page = ({ ...props }) => {

    const { story } = props;

    return (
        <div className="page-container">
            <h3>{`${story.story.title} ${story.book}.${story.page} - ${story.title}`}</h3>
            <Img fluid={story.image.fluid} />
        </div>
    )
}

export default Page;