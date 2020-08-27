import { alertConstants } from './';
import { toast } from "react-toastify";

export const alertActions = {
    success,
    error,
    info,
    clear
};

function success(message) {
    toast.success(message,
    {
        position: toast.POSITION.TOP_RIGHT
    });
    return { type: alertConstants.SUCCESS, message };
}

function info(message) {
    toast.info(message,
    {
        position: toast.POSITION.TOP_RIGHT
    });
    return { type: alertConstants.INFO, message };
}

function error(message) {
    const msg = message instanceof Object ? "Ocurrió un error al procesar la información, verifique los datos ingresados." : message;
    toast.error(msg,
    {
        position: toast.POSITION.TOP_RIGHT
    });
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}