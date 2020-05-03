import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import { dateFormater } from "./date_format";

import user from "./user";
import FindUsernameForm from "../../components/forms/FindUsernameForm";

export default (component: FindUsernameForm): void => {
    $(document).attr("title", "아이디 찾기");

    let validation = (): boolean => {
        if ($("#name").val() === "") {
            alert("이름을 입력해주세요.");
            return false;
        } else if (!/[a-zA-Z]/.test($("#name").val() as string) && !/[가-힣]/.test($("#name").val() as string)) {
            alert("이름을 제대로 입력해주세요.");
            return false;
        } else if ($("#birth").val() === "" || dateFormater("yyyy-MM-dd") <= ($("#birth").val() as string)) {
            alert("올바른 생년월일을 입력해주세요.");
            return false;
        } else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test($("#email").val() as string)) {
            alert("올바른 이메일 주소를 입력해주세요.");
            return false;
        }
        return true;
    };

    const findUsername = (): void => {
        if (validation())
            user.findUsername(
                $("#name").val() as string, $("#birth").val() as string, $("#email").val() as string,
                (responseData: string): void => {
                    component.props.onFindUsername($.parseJSON(responseData).username);
                    //component.setState({ redirect: <Redirect to="/find_username_result"></Redirect> });
                });
    };

    $("#name, #birth, #email").on("keyup", (e: JQuery.KeyUpEvent): void => {
        if (e.keyCode === 13) findUsername();
    });

    $("#find_username").on("click", findUsername);
};