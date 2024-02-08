import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Notifications = (value)=>{
    return toast(value.text, {
        type: value.type
    })
}