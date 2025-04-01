import axios from "axios";

export const navigate = (path) => {
    if (window.location.pathname !== path) {
        history.pushState(null, "", path);
        window.dispatchEvent(new Event("app:navigate"));
    }
}

export const updateAllData = async () => {
    
}