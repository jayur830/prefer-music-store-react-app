import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import $ from "jquery";

import "../../resources/css/CenterForm.css";

import LightButton from "../components/LightButton";

interface Props {
    username: string | null;
    valid: boolean | null;
}

interface State {
    username: string | null;
}

export default class FindUsernameResultForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: this.props.username
        };
    }

    public componentDidMount(): void {
        $(document).attr("title", "아이디 찾기");
        //this.props.onRemoveFindedUsername();
    }

    public render(): JSX.Element {
        console.log("this.props.valid:", this.props.valid);
        return (
            <table id="child_form">
                {this.props.valid ? null : <Redirect to="/find_username"></Redirect>}
                <tbody>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {this.state.username !== null ?
                                <h3>{`회원님의 아이디는 ${this.state.username}입니다.`}</h3> :
                                <h4>입력하신 정보와 일치하는 계정이 존재하지 않습니다.</h4>}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {this.state.username !== null ? 
                                <Link to="/find_password">
                                    <LightButton
                                        value="비밀번호 찾기"
                                        style={{
                                            fontSize: "14pt",
                                            padding: "8px 20px",
                                            margin: "0 10px"
                                        }} />
                                </Link> : null}
                            <Link to="/login">
                                <LightButton
                                    value="돌아가기"
                                    style={{
										fontSize: "14pt",
										padding: "8px 20px",
                                        margin: "0 10px"
									}} />
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}