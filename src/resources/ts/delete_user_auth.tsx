import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import user from "./user";
import DeleteUserAuthForm from "../../components/forms/DeleteUserAuthForm";

export default (component: DeleteUserAuthForm): void => {
    const deleteUser = (): void => {
        if ($("#password").val() === "")
            alert("비밀번호를 입력해주세요.");
        else user.isValid(
                component.props.username, 
                $("#password").val() as string,
                (responseData: string): void => {
                    const data: {
                        valid: boolean,
                        error: string
                    } = $.parseJSON(responseData);
                    if (data.valid) {
                        user.deleteUser(component.props.username);
                        user.logout((): void => {
                            component.props.onLogout();
                            alert("그 동안 이용해주셔서 감사합니다. 안녕히 가세요.");
                            component.setState({ redirect: <Redirect to="/login"></Redirect> });
                        });
                    } else $("#auth_failed").html(data.error);
                });
    };

    $("#password, #delete_user").on("keyup", (e: JQuery.KeyUpEvent): void => {
        if (e.keyCode === 13) deleteUser();
    });
    $("#delete_user").on("click", deleteUser);
};