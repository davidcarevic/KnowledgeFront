import {store as notification} from "react-notifications-component";

export const elementUpdateSuccess =()=> notification.addNotification({
    title: "Update Success",
    message: "Your element was updated.",
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

export const elementUpdateError =()=> notification.addNotification({
    title: "Error",
    message: "Your element was not updated.",
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