import './Notification.css'
import { useEffect, useState } from "react"


export const Notification = (props) => {
    const [intervalId, setIntervalId] = useState(null);
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);


    const starTtimer = () => {
        const id = setInterval(() => {
            setWidth((rate) => {
                if (rate < 100) {
                    return rate + 0.5;
                };
                return rate;
            });
        },15);
        setIntervalId(id);
    };

    const pauseTimer=()=>{
        clearInterval(intervalId)
    };

    const closeNotification=()=>{
        pauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: 'REMOVE_NOTIFICATION',
                id: props.id
            })
        }, 300000000);
    }

    useEffect(()=>{
        starTtimer()
    },[props])

    useEffect(()=>{
        if(width===100){
            closeNotification()
        }
    },[width]);

    return (
        <div 
        onMouseEnter={pauseTimer}
        onMouseLeave={starTtimer}
        className={
            `notificationItem 
            ${props.type === 'SUCCESS'
            ? 'success'
            : 'error'
        } ${exit ? 'exit' : ''}`
    }>
            <p className="notificationBtn"
                onClick={() => setExit(true)}>x</p>
                
            <p className='notificationMesage'>{props.message}</p>
                

            <div className="bar"
                style={{ width: `${width}%` }} ></div>

        </div>
    )
}