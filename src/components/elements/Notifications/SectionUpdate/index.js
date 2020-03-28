import {store as notification} from "react-notifications-component";

export const sectionUpdateSuccess =()=> notification.addNotification({
    title: "Update Success",
    message: "Your section was updated.",
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

export const sectionUpdateError =()=> notification.addNotification({
    title: "Error",
    message: "Your section was not updated.",
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