import {store as notification} from "react-notifications-component";

export const elementCreateSuccess =()=> notification.addNotification({
    title: "Create Success",
    message: "Your element was created.",
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

export const elementCreateError =()=> notification.addNotification({
    title: "Error",
    message: "Your element was not created.",
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