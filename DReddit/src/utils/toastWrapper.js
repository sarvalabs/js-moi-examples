import { toast } from "react-hot-toast";

export const error = (message)=>{
    return toast.error(message, {
        position: "top-left"
    })
}

export const success = (message)=>{
    return toast.success(message, {
        position: "top-left",
        duration: "200",
    })
}

export const info = (message)=>{
    toast(message, {
        position: "top-left",
    })
}

