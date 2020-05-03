import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import $ from "jquery";

import "../../resources/css/CenterForm.css";

import LightButton from "../components/LightButton";

interface Props {
    valid: boolean | null;
    email: string | null;
    onRemoveFindedPassword: () => void;
}

export default class FindPasswordResultForm extends Component<Props> {
    public componentDidMount(): void {
        $(document).attr("title", "비밀번호 찾기");
        this.props.onRemoveFindedPassword();
    }

    public render(): JSX.Element {
        return (
            <table id="child_form">
                {this.props.valid ? null : <Redirect to="/find_password"></Redirect>}
                <tbody>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {this.props.email === null ? 
                                <h2>입력하신 정보와 일치하는 정보가 없습니다.</h2> :
                                <h3>
                                    회원님의 임시 비밀번호를 {this.props.email}로 보내드렸습니다.<br />
                                    확인 후 변경 바랍니다.
                                </h3>}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            <Link to="/login"><LightButton value="돌아가기" /></Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}