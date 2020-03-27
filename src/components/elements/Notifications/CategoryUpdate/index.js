import {store as notification} from "react-notifications-component";

export const categoryUpdateSuccess =()=> notification.addNotification({
    title: "Update Success",
    message: "Your category was updated.",
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

export const categoryUpdateError =()=> notification.addNotification({
    title: "Error",
    message: "Your category was not updated.",
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