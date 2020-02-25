import {store as notification} from "react-notifications-component";

export const resetPassSuccess =()=> notification.addNotification({
    title: "Reset Success",
    message: "Your password has been changed.",
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

export const resetPassError =()=> notification.addNotification({
    title: "Error",
    message: "We could not reset your password, try again later.",
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