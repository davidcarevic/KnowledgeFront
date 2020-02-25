import {store as notification} from "react-notifications-component";

export const loginSuccess =()=> notification.addNotification({
    title: "You've logged in!",
    message: "Yey!",
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

export const loginError =()=> notification.addNotification({
    title: "Oh no!",
    message: "Wrong username or password.",
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