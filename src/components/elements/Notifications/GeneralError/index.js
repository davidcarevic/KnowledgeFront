import {store as notification} from "react-notifications-component";

export const generalError =()=> notification.addNotification({
    title: "Error",
    message: "Please try again later.",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 1500,
        onScreen: true
    }
});