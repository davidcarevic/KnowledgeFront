import {store as notification} from "react-notifications-component";

export const categoryDeleteSuccess =()=> notification.addNotification({
    title: "Delete Success",
    message: "Your category was deleted.",
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

export const categoryDeleteError =()=> notification.addNotification({
    title: "Error",
    message: "Your category was not deleted.",
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