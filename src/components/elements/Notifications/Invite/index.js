import {store as notification} from "react-notifications-component";

export const inviteSuccess =(email)=> notification.addNotification({
    title: "Invite Success",
    message: "You have invited "+email+".",
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

export const inviteError =()=> notification.addNotification({
    title: "Error",
    message: "The invite was not successful.",
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