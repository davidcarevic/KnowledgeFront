import {store as notification} from "react-notifications-component";

export const inviteRetrieveError =()=> notification.addNotification({
    title: "Error",
    message: "Could not retrieve the invite",
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