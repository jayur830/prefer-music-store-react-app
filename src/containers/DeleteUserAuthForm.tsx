import { connect } from "react-redux";

import $ from "jquery";

import DeleteUserAuthForm from "../components/forms/DeleteUserAuthForm";

export default connect(state => {
    let data: {
        username: string | null,
        auth: boolean
    } = {
        username: null,
        auth: false
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
        auth: data.auth
    };
}, dispatch => ({
    onLogin: (username: string): void => { dispatch({ type: "login", username }); },
    onLogout: (): void => { dispatch({ type: "logout" }); }
}))(DeleteUserAuthForm as any);