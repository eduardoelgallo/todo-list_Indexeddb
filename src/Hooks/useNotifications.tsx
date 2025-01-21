import { useEffect, useState } from 'react';

const useNotifications = () => {

    let [hasPermission, setHasPermission] = useState<boolean>(false);
    
    useEffect(() => {
        if(!Reflect.has(window, "Notification")) {
            console.log("Este navegador no soporta notificaciones");
            return
        }

        let permission = Reflect.has(Notification, "permission") ? Notification.permission : "default";

        if(permission === "denied" || permission === "default") {
            setHasPermission(false);
        } else {
            setHasPermission(true);
        }
    }, [])


    const askPermission = () => {

        if(!Reflect.has(window, 'Notification')) {
            console.log("Este navegador no soporta notificaciones");

            return;
        }

        if(checkNotificationPromise()) {
            Notification.requestPermission().then(handlerPermissions)
        } else {
            Notification.requestPermission(handlerPermissions)
        }
    }

    const handlerPermissions = (permission: any) => {

        let notificationPermission = Reflect.has(Notification, 'permission') ? Notification.permission : permission;

        if(notificationPermission === "denied" || notificationPermission === "default") {
            setHasPermission(false);
        } else {
            setHasPermission(true);
        }
    }

    const checkNotificationPromise = () => {
        try {
            Notification.requestPermission().then();
        } catch (e) {
            return false;
        }

        return true;
    }

    return {
        hasPermission,
        askPermission
    };
};

export default useNotifications;