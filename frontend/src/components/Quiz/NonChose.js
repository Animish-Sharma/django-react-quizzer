import React from 'react'
import "./NonChose.scss";
import { Helmet } from 'react-helmet'
const NonChose = () => {
    return (
        <div className="nonChose">
            <Helmet>
                <title>Choose any Option</title>
            </Helmet>
            <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Choice_re_2hkp.svg" alt="" />
            <h1>Choose any option</h1>
            <p>Choose any option from the sidebar to proceed.</p>
        </div>
    )
}

export default NonChose
