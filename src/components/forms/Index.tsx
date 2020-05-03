import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../resources/css/CenterForm.css";

import DarkButton from "../components/DarkButton";

export default class Index extends Component {
    public render(): JSX.Element {
        return (
            <table id="child_form">
                <tbody>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            <Link to="/sign_up">
                                <DarkButton
                                    id="sign_up"
                                    className="btn_dark_light"
                                    value="회원가입"
                                    style={{
                                        fontSize: "16pt",
                                        margin: "10px 0",
                                        height: "60px",
                                        width: "200px"
                                    }} />
                            </Link>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            <Link to="/login">
                                <DarkButton
                                    id="login"
                                    className="btn_dark_light"
                                    value="로그인"
                                    style={{
                                        fontSize: "16pt",
                                        margin: "10px 0",
                                        height: "60px",
                                        width: "200px"
                                    }} />
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}