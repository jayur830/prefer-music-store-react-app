import React from "react";
import { createStore } from "redux";
import { Redirect } from "react-router-dom";

import StoreState from "./types/StoreState";
import StoreAction from "./types/StoreAction";

export default createStore((state: StoreState = {
    redirect: null,
    user: null,
    findUsernameResult: {
        result: null,
        valid: false
    },
    findPasswordResult: {
        result: null,
        valid: false
    },
    exec: false,
    isStore: true,
    playlist: null
}, action: StoreAction) => {
    if (action.type === "login")
        return {
            ...state,
            user: { username: action.username }
        };
    else if (action.type === "logout")
        return {
            ...state,
            user: null
        };
    else if (action.type === "find_username")
        return {
            ...state,
            redirect: "find_username_result",
            findUsernameResult: {
                result: action.username,
                valid: true
            }
        };
    else if (action.type === "find_password")
        return {
            ...state,
            findPasswordResult: {
                result: action.email,
                valid: true
            }
        };
    else if (action.type === "remove_finded_username")
        return {
            ...state,
            redirect: null,
            findUsernameResult: {
                result: null,
                valid: false
            }
        };
    else if (action.type === "remove_finded_password")
        return {
            ...state,
            findPasswordResult: {
                result: null,
                valid: false
            }
        };
    else if (action.type === "exec")
        return {
            ...state,
            exec: !action.exec
        };
    else if (action.type === "is_store")
        return {
            ...state,
            isStore: !action.isStore
        };
    else if (action.type === "set_playlist")
        return {
            ...state,
            playlist: action.playlist
        };
    return state;
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && 
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());