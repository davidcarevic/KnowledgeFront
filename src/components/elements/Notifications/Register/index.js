import {store as notification} from "react-notifications-component";

export const registerSuccess =()=> notification.addNotification({
    title: "Register Success",
    message: "Your account has been created.",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 1500,
        onScreen: true
    }
});

export const registerError =()=> notification.addNotification({
    title: "Error",
    message: "Server error, try again later.",
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