import {store as notification} from "react-notifications-component";

export const projectCreateSuccess =()=> notification.addNotification({
    title: "Create Success",
    message: "Your project was created.",
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

export const projectCreateError =()=> notification.addNotification({
    title: "Error",
    message: "Your project was not created.",
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