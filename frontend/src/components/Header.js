import React from 'react'
import { Helmet } from 'react-helmet'
const Head = ({ title }) => {
    return (
        <div className="headers--container">
            <Helmet>
                <title>{title}</title>
                <style>{'body { background-color: #5d53e1; }'}</style>
            </Helmet>
        </div>
    )
}

export default Head
