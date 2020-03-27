import {store as notification} from "react-notifications-component";

export const itemDeleteSuccess =()=> notification.addNotification({
    title: "Delete Success",
    message: "Your item was deleted.",
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

export const itemDeleteError =()=> notification.addNotification({
    title: "Error",
    message: "Your item was not deleted.",
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