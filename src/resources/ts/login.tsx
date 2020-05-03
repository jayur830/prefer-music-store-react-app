import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import user from "./user";
import LoginForm from "../../components/forms/LoginForm";

export default (component: LoginForm): void => {
    $(document).attr("title", "로그인");

    let validation = (): boolean => {
        if ($("#username").val() === "") {
            alert("아이디를 입력해주세요.");
            return false;
        } else if ($("#password").val() === "") {
            alert("비밀번호를 입력해주세요.");
            return false;
        }
        return true;
    };

    const resultLogin = (): void =>
        user.login(
            ($("#username").val() as string), 
            ($("#password").val() as string),
            (responseData: string): void => {
                const data: {
                    username: string,
                    targetUrl: string,
                    error: string & null
                } = $.parseJSON(responseData);
                if (data.username != null && data.targetUrl != null) {
                    alert(data.username + "님 환영합니다.");
                    component.setState({ redirect: <Redirect to="/main"></Redirect> });
                } else $("#login_error").html(data.error);
            });

    $("#username, #password, #login").on("keyup", (e: JQuery.KeyUpEvent): void => {
        if (e.keyCode === 13 && validation()) resultLogin();
    });

    $("#login").on("click", (): void =>  {
        if (validation()) resultLogin();
    });
};