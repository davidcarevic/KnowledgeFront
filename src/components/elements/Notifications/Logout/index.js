import {store as notification} from "react-notifications-component";

export const logoutSuccess =()=> notification.addNotification({
    title: "You've logged out!",
    message: "See you next time!",
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