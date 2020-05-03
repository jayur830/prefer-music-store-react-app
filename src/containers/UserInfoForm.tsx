import { connect } from "react-redux";

import $ from "jquery";

import UserInfoForm from "../components/forms/UserInfoForm";

import user from "../resources/ts/user";
import StoreState from "../types/StoreState";

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
        username: string | null,
        auth: boolean,
        authority: string
    }): void => { data = { ..._data }; });
    console.log(data);
    return {
        username: data.username,
        auth: data.auth,
        user: data.auth ? { ...user.getUserInfo(data.username) } : null
    };
}, dispatch => ({
    onLogin: (username: string | null): void => { dispatch({ type: "login", username }); }
}))(UserInfoForm as any);