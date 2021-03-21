import React, { useEffect } from 'react'
import { graphql, Link, navigate } from 'gatsby'
import './navigation-controls.scss'

const NavigationControls = ({ ...props }) => {

  const { prevPath, nextPath } = props;


  const handleOnKeyDown = (event) => {

    const keyCode = event.keyCode;

    if (keyCode === 37 && prevPath.length > 0) {
      navigate(prevPath);
    }

    if (keyCode === 39 && nextPath.length > 0) {
      navigate(nextPath);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleOnKeyDown);

    return () => {
      window.removeEventListener('keydown', handleOnKeyDown);
    };
  }, [handleOnKeyDown])

  return (
    <div className='controls-container'>
      {prevPath.length > 0 ?
        <Link to={prevPath}>
          <button>&lt;</button>
        </Link> :
        <div>
        </div>
      }
      {nextPath.length > 0 ?
        <Link to={nextPath}>
          <button>&gt;</button>
        </Link> :
        <div>
        </div>
      }
    </div>
  )
}

export default NavigationControls;