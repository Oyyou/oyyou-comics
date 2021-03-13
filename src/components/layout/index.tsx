import React from 'react'
import './layout.scss'

const Layout = ({ ...props }) => {

    const { children } = props;

    return (
        <div className="wrapper">
            {children}
        </div>
    )
};

export default Layout;