import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "../../resources/css/CenterForm.css";
import "../../resources/css/Inputs.css";

import loginFormDidMount from "../../resources/ts/login";

import FormInput from "../components/FormInput";

import LightButton from "../components/LightButton";
import DarkButton from "../components/DarkButton";

interface Props {
    username: string;
}

interface State {
    redirect: JSX.Element | null;
}

export default class LoginForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            redirect: null
        };
    }

    public static defaultProps = {
        username: null
    };

    public componentDidMount(): void {
        loginFormDidMount(this);
    }

    public render(): JSX.Element {
        console.log("LoginForm");
        return (
            <table id="child_form">
                {this.props.username === null ? null : <Redirect to="/main"></Redirect>}
                <caption id="login_error"
                    style={{
                        fontWeight: "bold",
                        fontSize: "14pt",
                        color: "red",
                        captionSide: "bottom",
                        textAlign: "center"
                    }}></caption>
                <tbody>
                    <tr id="row_0">
                        <td colSpan={2}>
                            <FormInput
                                type="text"
                                id="username"
                                value="아이디"
                                className="input-text"
                                style={{ fontSize: "16pt" }}
                                required />
                        </td>
                    </tr>
                    <tr id="row_1">
                        <td colSpan={2}>
                            <FormInput
                                type="password"
                                id="password"
                                value="비밀번호"
                                className="input-password"
                                style={{ fontSize: "16pt" }}
                                required />
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr id="row_2">
                        <td
                            colSpan={2}
                            style={{
                                textAlign: "center",
                                fontSize: "10pt"
                            }}>
                            <Link to="/find_username" style={{ padding: "0 10px" }}>아이디 찾기</Link>
                            <Link to="/find_password" style={{ padding: "0 10px" }}>비밀번호 찾기</Link>
                        </td>
                    </tr>
                    <tr id="row_3">
                        <td colSpan={2}>
                            {this.state.redirect}
                            <LightButton id="login" value="로그인"
                                style={{
                                    width: "100%",
                                    fontSize: "14pt",
                                    padding: "10px 0"
                                }} />
                        </td>
                    </tr>
                    <tr id="row_4" style={{ textAlign: "center" }}>
                        <td style={{ padding: "20px 10px" }}>
                            <Link to="/">
                                <LightButton id="back" value="돌아가기"
                                    style={{
                                        fontSize: "14pt",
                                        padding: "10px 50px"
                                    }} />
                            </Link>
                        </td>
                        <td>
                            <Link to="/main">
                                <DarkButton id="guest" value="비회원"
                                    style={{
                                        fontSize: "14pt",
                                        padding: "10px 50px"
                                    }} />
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}