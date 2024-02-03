
import { createContext, useContext, useReducer } from "react";
import {v4} from 'uuid';
import { notificationReduser } from "../lib/notificationReduser";
import { Notification } from "../components/Notification/Notification";


const NotificationContext = createContext();

export const NotificationProvider = ({
    children
}) => {

    const [state, dispatch] = useReducer(notificationReduser, [])

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className="notification-wrapper">
                {state.map(x => {
                    return <Notification dispatch={dispatch} key={x.id} {...x} />
                })}
            </div>
            {children} 
        </NotificationContext.Provider>
    )
}

export const useNotification=()=>{
    const dispatch=useContext(NotificationContext);

    return (props)=>{
        dispatch({
            type:'ADD_NOTIFICATION',
            payload:{
                id: v4(),
                ...props
            }
        })
    }
}
