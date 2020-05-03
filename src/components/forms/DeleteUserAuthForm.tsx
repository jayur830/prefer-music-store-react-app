import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "../../resources/css/Inputs.css";

import FormInput from "../components/FormInput";
import LightButton from "../components/LightButton";

import deleteUserAuthFormDidMount from "../../resources/ts/delete_user_auth";

interface Props {
    username: string;
    auth: boolean;
    onLogin: (username: string) => void;
    onLogout: () => void;
}

interface State {
    redirect: JSX.Element | null;
}

export default class DeleteUserAuthForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.props.onLogin(this.props.username);
        this.state = {
            redirect : null
        };
    }

    public componentDidMount(): void {
        deleteUserAuthFormDidMount(this);
    }

    public render(): JSX.Element {
        return (
            <table id="child_form">
                {this.state.redirect}
                {this.props.auth ? null : <Redirect to="/main"></Redirect>}
                <caption id="auth_failed"></caption>
                <tbody>
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
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            <LightButton
                                id="delete_user"
                                value="회원탈퇴"
                                style={{
                                    fontSize: "14pt",
                                    padding: "5px 20px"
                                }} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                            <Link to="/user_info">
                                <LightButton
                                    id="cancel"
                                    value="돌아가기"
                                    style={{
                                        fontSize: "14pt",
                                        padding: "5px 20px"
                                    }} />
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}