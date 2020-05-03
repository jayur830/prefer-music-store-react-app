import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import { dateFormater } from "./date_format";

import user from "./user";
import UserInfoForm from "../../components/forms/UserInfoForm";
import User from "../../types/User";

export default (component: UserInfoForm): void => {
    const userInfo: User = component.props.user;

    $("#username").val(userInfo.username);
    $("#password").val(userInfo.password);
    $("#name").val(userInfo.name);
    $("#birth").val(userInfo.birth);
    $("#email").val(userInfo.email);

    const genderString: [string, string] = ["female", "male"], genderIndex: number = userInfo.gender;
    $("#label_" + genderString[genderIndex]).removeClass("fal");
    $("#label_" + genderString[genderIndex]).addClass("fas");
    $("#gender_" + (userInfo.gender === 0 ? "fe" : "") + "male").attr("checked", "checked");

    const editable = (): void => {
        let disabled: boolean = $("#password").val() === userInfo.password &&
                $("#name").val() === userInfo.name &&
                $("#birth").val() === userInfo.birth &&
                $("#email").val() === userInfo.email &&
                parseInt($("input[name=gender]:checked").val() as string) === userInfo.gender;
        $("#edit").attr("disabled", "disabled");
        if (disabled) {
            $("#edit").removeClass("btn_light_dark");
            $("#edit").addClass("btn_disabled");
        } else {
            $("#edit").removeClass("btn_disabled");
            $("#edit").addClass("btn_light_dark");
        }
    };

    let isToggled: boolean = false;
    $("#password_confirm_toggle").toggle(0);
    $("#change_password").on("click", (): void => {
        if (!isToggled) {
            $("#password").attr("disabled", "disabled");
            $("#password").val("");
            $("#label_password").removeClass("placeholder_up");
            $("#label_password").addClass("placeholder");
            isToggled = true;
        } else {
            $("#password").attr("disabled", "undefined");
            $("#password").val(userInfo.password);
            $("#label_password").removeClass("placeholder");
            $("#label_password").addClass("placeholder_up");
            isToggled = false;
            editable();
        }
        $("#password_confirm_toggle").toggle(0);
    });

    $("#password").on("keyup", editable);
    $("#name").on("keyup", editable);
    $("#birth").on("click", editable);
    $("#email").on("keyup", editable);
    $("input[name=gender]").on("change", editable);

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

    const setMobile = (): void => {
        for (let i: number = 0; i < 7; ++i)
            $("#row_" + i).attr("colspan", "3");
        $("#edit, #cancel").css({
            marginRight: "10px",
            padding: "10px 30px"
        });
        $("#delete_user").css({
            fontSize: "12pt",
            padding: "8px 20px"
        });
    }, setDesktop = (): void => {
        for (let i: number = 0; i < 7; ++i)
            $("#row_" + i).attr("colspan", "1");
        $("#edit, #cancel").css({
            marginRight: "10px",
			padding: "5px 20px"
        });
        $("#delete_user").css({
            fontSize: "10pt",
            padding: "5px 15px"
        });
    };

    let isMobile: boolean = ($(window).width() as number) < 786;
    const check = (): void => {
        if (!isMobile && ($(window).width() as number) < 786) {
            isMobile = true;
            setMobile();
        } else if (isMobile && ($(window).width() as number) >= 786) {
            isMobile = false;
            setDesktop();
        }
    };

    $(document).ready((): void => isMobile ? setMobile() : setDesktop());
    $(window).resize(check);

    const validation = (): boolean => {
        if ($("#password").attr("disabled") !== "disabled" && $("#password").val() === "") {
            alert("비밀번호를 입력해주세요.");
            return false;
        } else if ($("#password").attr("disabled") !== "disabled" && (($("#password").val() as string).length < 8 || ($("#password").val() as string).length > 20)) {
            alert("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
            return false;
        } else if ($("#password").attr("disabled") !== "disabled" && (!/[a-zA-Z]/.test($("#password").val() as string) ||
                !/[0-9]/.test($("#password").val() as string) ||
                !/[~!@#$%^&*()_+|<>?:{}]/.test($("#password").val() as string))) {
            alert("비밀번호는 영문+숫자+특수문자를 포함하여 입력해주세요.");
            return false;
        } else if ($("#password").attr("disabled") !== "disabled" && ($("#password").val() as string).indexOf(" ") !== -1) {
            alert("비밀번호는 공백 없이 입력해주세요.");
            return false;
        } else if ($("#password").attr("disabled") !== "disabled" && $("#password_confirm").val() === "") {
            alert("비밀번호 확인을 입력해주세요.");
            return false;
        } else if ($("#password").attr("disabled") !== "disabled" && $("#password").val() !== $("#password_confirm").val()) {
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
        }
        return true;
    };

    const edit = (): void => {
        if (window.confirm("입력한 정보로 수정하시겠습니까?"))
            user.editUserInfo(
                $("#username").val() as string, $("#password").attr("disabled") !== "undefined" ? null : $("#password").val() as string,
                $("#name").val() as string, $("#birth").val() as string, $("#email").val() as string,
                parseInt($("input[name=gender]:checked").val() as string), new Date().getFullYear() + 1 - parseInt(($("#birth").val() as string).split("-")[0]),
                (): void => {
                    alert("회원정보 수정이 완료되었습니다.");
                    component.setState({ redirect: <Redirect to="/main"></Redirect> });
                });
    };

    $(`#username, #password, #password_confirm, 
        #name, #birth, #email, input[name=gender]`)
        .on("keyup", (e: JQuery.KeyUpEvent): void => {
        if (e.keyCode === 13 && $("#edit").attr("disabled") !== "disabled" && validation()) edit();
    });
    $("#edit").on("click", edit);
};