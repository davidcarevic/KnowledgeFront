import {store as notification} from "react-notifications-component";

export const teamCreateSuccess =()=> notification.addNotification({
    title: "Create Success",
    message: "Your team has been created.",
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

export const teamCreateError =()=> notification.addNotification({
    title: "Error",
    message: "Your team was not created.",
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