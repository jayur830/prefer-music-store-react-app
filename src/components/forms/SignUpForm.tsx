import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "../../resources/css/CenterForm.css";
import "../../resources/css/Inputs.css";

import signUpFormDidMount from "../../resources/ts/sign_up";

import FormInput from "../components/FormInput";
import Gender from "../components/Gender";

import LightButton from "../components/LightButton";
import DarkButton from "../components/DarkButton";

interface State {
    redirect: Redirect | null;
}

export default class SignUpForm extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            redirect: null
        };
    }

    public componentDidMount(): void {
        signUpFormDidMount(this);
    }

    public render(): JSX.Element {
        console.log("SignUpForm");
        return (
            <table id="child_form">
                <tbody>
                    <tr>
                        <td>
                            <FormInput
                                type="text"
                                id="username"
                                value="아이디"
                                className="input-text"
                                style={{ fontSize: "14pt" }}
                                required />
                        </td>
                        <td
                            id="username_valid_row"
                            style={{
                                padding: 0,
                                textAlign: "center"
                            }}>
                            <DarkButton
                                id="username_valid"
                                value="중복확인"
                                style={{
                                    fontSize: "12pt",
                                    padding: "3px 15px",
                                    marginBottom: "30px"
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <FormInput
                                type="password"
                                id="password"
                                value="비밀번호"
                                className="input-password"
                                style={{ fontSize: "14pt" }}
                                required />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <FormInput
                                type="password"
                                id="password_confirm"
                                value="비밀번호 확인"
                                className="input-password"
                                style={{ fontSize: "14pt" }}
                                required />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <FormInput
                                type="text"
                                id="name"
                                value="이름"
                                className="input-text"
                                style={{ fontSize: "14pt" }}
                                required />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <FormInput
                                type="date"
                                id="birth"
                                value="생년월일"
                                className="input-date"
                                style={{
                                    fontSize: "14pt",
                                    height: "30px"
                                }}
                                labelStyle={{
                                    fontSize: "14pt",
                                    height: "30px"
                                }}
                                up required />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <FormInput
                                type="email"
                                id="email"
                                value="이메일"
                                className="input-email"
                                style={{ fontSize: "14pt" }}
                                required />
                        </td>
                    </tr>
                    <tr id="gender_row">
                        <td colSpan={2} style={{ verticalAlign: "middle" }}>
                            <Gender
                                spanStyle={{
                                    float: "left",
                                    textAlign: "center",
                                    padding: "18px 0",
                                    width: "50%"
                                }}
                                labelStyle={{ cursor: "pointer" }}></Gender>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            {this.state.redirect}
                            <LightButton
                                id="sign_up"
                                value="회원가입"
                                style={{
                                    fontSize: "12pt",
                                    padding: "6px 30px",
                                    marginRight: "15px"
                                }} />
                            <Link to="/">
                                <LightButton
                                    id="cancel"
                                    value="돌아가기"
                                    style={{
                                        fontSize: "12pt",
                                        padding: "6px 30px",
                                        marginRight: "15px"
                                    }} />
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}