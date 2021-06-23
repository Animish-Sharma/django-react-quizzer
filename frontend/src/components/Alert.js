import React from 'react';
import { useSelector } from 'react-redux'
import './Alert.scss'
const Alert = () => {
    let alert = useSelector(state=> state.alert)
    console.log(alert)
    if(alert.length > 1) alert.pop()
    return (
        <div>
            { alert !== null && alert.length > 0 && alert.map(alerts=>{
                return <div key={alerts.id} className={`alert alert-${alerts.alertType}`}>
                        {alerts.msg}
                    </div>
            }) }
        </div>
    )
}

export default Alert
