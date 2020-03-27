import {store as notification} from "react-notifications-component";

export const elementDeleteSuccess =()=> notification.addNotification({
    title: "Delete Success",
    message: "Your element was deleted.",
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

export const elementDeleteError =()=> notification.addNotification({
    title: "Error",
    message: "Your element was not deleted.",
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