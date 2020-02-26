import {store as notification} from "react-notifications-component";

export const sectionCreateSuccess =()=> notification.addNotification({
    title: "Create Success",
    message: "Your section was created.",
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

export const sectionCreateError =()=> notification.addNotification({
    title: "Error",
    message: "Your section was not created.",
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