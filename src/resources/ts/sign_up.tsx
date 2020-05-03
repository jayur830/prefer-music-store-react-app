import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import { dateFormater } from "./date_format";

import user from "./user";

export default (component: React.Component): void => {
    $(document).attr("title", "회원가입");

    const validation = (): boolean => {
        if ($("#username").val() === "") {
            alert("아이디를 입력해주세요.");
            return false;
        } else if (($("#username").val() as string).length < 5) {
            alert("아이디는 5자 이상으로 입력해주세요.");
            return false;
        } else if (($("#username").val() as string).indexOf(" ") !== -1) {
            alert("아이디는 공백 없이 입력해주세요.");
            return false;
        } else if (!$("#username_valid").attr("disabled")) {
            alert("아이디 중복을 확인하세요.");
            return false;
        } else if ($("#password").val() === "") {
            alert("비밀번호를 입력해주세요.");
            return false;
        } else if (($("#password").val() as string).length < 8 || ($("#password").val() as string).length > 20) {
            alert("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
            return false;
        } else if (!/[a-zA-Z]/.test($("#password").val() as string) ||
            !/[0-9]/.test($("#password").val() as string) ||
            !/[~!@#$%^&*()_+|<>?:{}]/.test($("#password").val() as string)) {
            alert("비밀번호는 영문+숫자+특수문자를 포함하여 입력해주세요.");
            return false;
        } else if (($("#password").val() as string).indexOf(" ") !== -1) {
            alert("비밀번호는 공백 없이 입력해주세요.");
            return false;
        } else if ($("#password_confirm").val() === "") {
            alert("비밀번호 확인을 입력해주세요.");
            return false;
        } else if ($("#password").val() !== $("#password_confirm").val()) {
            alert("비밀번호가 일치하지 않습니다. 다시 입력하세요.")
            return false;
        } else if ($("#name").val() === "") {
            alert("이름을 입력해주세요.");
            return false;
        } else if ($("#birth").val() === "" || dateFormater("yyyy-MM-dd") <= ($("#birth").val() as string)) {
            alert("올바른 생년월일을 입력해주세요.");
            return false;
        } else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test($("#email").val() as string)) {
            alert("올바른 이메일 주소를 입력해주세요.");
            return false;
        } else if ($("input[name=gender]:checked").val() === undefined) {
            alert("성별을 체크하세요.");
            return false;
        }
        return true;
    };

    const signUp = (): void =>
        user.signUp(
            $("#username").val() as string, $("#password").val() as string,
            $("#name").val() as string, $("#birth").val() as string, $("#email").val() as string,
            parseInt($("input[name=gender]:checked").val() as string),
            new Date().getFullYear() + 1 - parseInt(($("#birth").val() as string).split("-")[0]),
            (): void => {
                alert("회원가입이 완료되었습니다.");
                component.setState({ redirect: (<Redirect exact to="/"></Redirect>) });
            });

    $(`#username, #password, #password_confirm, 
        #name, #birth, #email, input[name=gender]`)
        .on("keyup", (e: JQuery.KeyUpEvent): void => {
        if (e.keyCode === 13 && validation()) signUp();
    });
    $("#sign_up").on("click", (): void => {
        if (validation()) signUp();
    });

    $("#username_valid").on("click", (): void => {
        const username: string = $("#username").val() as string;
        if (username === "") alert("아이디를 입력하고 중복확인하세요.");
        else user.checkUsername(username, (responseData: string): void => {
            if ($.parseJSON(responseData).valid) {
                alert("사용할 수 있는 아이디입니다.");
                $("#username_valid").attr("disabled", "disabled");
                $("#username_valid").removeClass("btn_dark_light");
                $("#username_valid").addClass("btn_disabled");
            } else alert("이미 존재하는 아이디입니다.");
        });
    });

    $("#label_male").on("click", function (): void {
        $("#label_female").removeClass("fas");
        $("#label_female").addClass("fal");
        $(this).removeClass("fal");
        $(this).addClass("fas");
    });
    $("#label_female").on("click", function (): void {
        $("#label_male").removeClass("fas");
        $("#label_male").addClass("fal");
        $(this).removeClass("fal");
        $(this).addClass("fas");
    });
};