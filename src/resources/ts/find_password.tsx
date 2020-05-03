import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import user from "./user";
import FindPasswordForm from "../../components/forms/FindPasswordForm";

export default (component: FindPasswordForm): void => {
    $(document).attr("title", "비밀번호 찾기");

    const findPassword = (): void => {
        const username: string = $("#username").val() as string, 
            email: string = $("#email").val() as string;
        
        if (username === "") alert("아이디를 입력해주세요.");
        // 이메일이 유효하지 않은 경우
        else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email))
            alert("올바른 이메일 주소를 입력해주세요.");
        else {
            $(".placeholder").addClass("placeholder_up");
            $(".placeholder").removeClass("placeholder");
            $("#username, #email, #find_password, #cancel").attr("disabled", "disabled");
            user.findPassword(username, email, (responseData: string): void => {
                const valid: boolean = $.parseJSON(responseData).valid;
                component.props.onFindPassword(valid ? email : null);
                component.setState({ redirect: <Redirect to="/find_password_result"></Redirect> });
            });
        }
    };

    $("#username, #email, #find_password").on("keyup", (e: JQuery.KeyUpEvent): void => {
        if (e.keyCode === 13) findPassword();
    });
};