import { connect } from "react-redux";

import $ from "jquery";

import LoginForm from "../components/forms/LoginForm";
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
        username: string,
        auth: boolean,
        authority: string
    }): void => { data = { ..._data }; });
    return {
        username: data.username,
        auth: {
            authenticated: data.auth,
            authority: data.authority
        }
    };
})(LoginForm as any);