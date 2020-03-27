import {store as notification} from "react-notifications-component";

export const itemUpdateSuccess =()=> notification.addNotification({
    title: "Update Success",
    message: "Your item was updated.",
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

export const itemUpdateError =()=> notification.addNotification({
    title: "Error",
    message: "Your item was not updated.",
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