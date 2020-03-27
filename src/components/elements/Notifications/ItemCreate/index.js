import {store as notification} from "react-notifications-component";

export const itemCreateSuccess =()=> notification.addNotification({
    title: "Create Success",
    message: "Your item was created.",
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

export const itemCreateError =()=> notification.addNotification({
    title: "Error",
    message: "Your item was not created.",
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