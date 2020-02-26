import {store as notification} from "react-notifications-component";

export const categoryCreateSuccess =()=> notification.addNotification({
    title: "Create Success",
    message: "Your category was created.",
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

export const categoryCreateError =()=> notification.addNotification({
    title: "Error",
    message: "Your category was not created.",
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