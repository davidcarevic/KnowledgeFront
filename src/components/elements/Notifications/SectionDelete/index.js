import {store as notification} from "react-notifications-component";

export const sectionDeleteSuccess =()=> notification.addNotification({
    title: "Delete Success",
    message: "Your section was deleted.",
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

export const sectionDeleteError =()=> notification.addNotification({
    title: "Error",
    message: "Your section was not deleted.",
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