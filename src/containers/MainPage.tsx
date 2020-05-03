import { connect } from "react-redux";

import MainPage from "../components/forms/MainPage";

import $ from "jquery";
import StoreState from "../types/StoreState";
import { Dispatch } from "react";
import { Action } from "redux";

export default connect((state: StoreState) => {
    let data: {
        username: string | null,
        auth: boolean,
        authority: string | null
    } = {
        username: null,
        auth: false,
        authority: null
    };
    $.ajax({
        url: "/is_auth",
        type: "post",
        async: false
    }).done((_data: {
        username: string,
        auth: boolean,
        authority: string
    }): void => { data = { ..._data }; });
    return {
        username: data.username,
        auth: {
            authenticated: data.auth,
            authority: data.authority
        },
        exec: state.exec,
        isStore: state.isStore,
        playlist: state.playlist
    };
}, dispatch => ({
    onLogin: (username: string): void => { dispatch({ type: "login", username }); },
    onLogout: (): void => { dispatch({ type: "logout" }); },
    onExecute: (exec: boolean): void => { dispatch({ type: "exec", exec }); },
    onView: (isStore: boolean): void => { dispatch({ type: "is_store", isStore }); },
    onSetPlaylist: (playlist: JSX.Element) => dispatch({ type: "set_playlist", playlist })
}))(MainPage as any);