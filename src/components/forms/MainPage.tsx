import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "../../resources/css/CenterForm.css";
import "../../resources/css/Inputs.css";
import "../../resources/css/MainPage.css";

import mainPageDidMount from "../../resources/ts/main";
import adminPageDidMount from "../../resources/ts/admin";

import LightButton from "../components/LightButton";
import DarkButton from "../components/DarkButton";

interface Props {
    username: string;
    auth: {
        authenticated: boolean;
        authority: string;
    };
    exec: boolean;
    isStore: boolean;
    playlist: object[];

    onLogin: (username: string) => void;
    onLogout: () => void;
    onView: (isStore: boolean) => void;
    onExecute: (exec: boolean) => void;
    onSetPlaylist: (element: JSX.Element | null) => void;
}

interface State {
    username: string;
    exec: boolean | null;
    playlist: object[] | null;
    redirect: JSX.Element | null;
}

export default class MainPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.props.onLogin(this.props.username);
        this.state = {
            username: this.props.username,
            exec: !this.props.auth.authenticated ? null : this.props.exec,
            playlist: this.props.playlist,
            redirect: null
        };
    }

    public componentDidMount(): void {
        if (this.props.auth.authenticated && 
            this.props.auth.authority === "ROLE_ADMIN")
            adminPageDidMount(this);
        else mainPageDidMount(this);
    }

    public render(): JSX.Element {
        const auth: {
            authenticated: boolean;
            authority: string;
        } = this.props.auth;
        return (
            <table className="form">
                {this.state.redirect}
                <thead>
                    <tr>
                        <td>
                            {auth.authenticated && auth.authority === "ROLE_ADMIN" ?
                                <LightButton
                                    id="exec"
                                    value={this.props.exec ? "서버 중지" : "서버 시작"}
                                    className="main-page-btn" /> : null}
                        </td>
                        {auth.authenticated ?
                            (
                                <td className="btns">
                                    <Link to="/user_info">
                                        <LightButton
                                            id="user_info"
                                            value="회원정보 수정"
                                            className="main-page-btn" />
                                    </Link>
                                    <DarkButton
                                        id="logout"
                                        value="로그아웃"
                                        className="main-page-btn" />
                                </td>
                            ) : (
                                <td className="btns">
                                    <Link to="/login">
                                        <DarkButton
                                            id="login"
                                            value="로그인"
                                            className="main-page-btn" />
                                    </Link>
                                </td>
                            )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            id="search_area"
                            className="search-area"
                            colSpan={2}>
                            <input
                                type="text"
                                id="search"
                                className="search input-text main-page-text"
                                placeholder="가수 이름 또는 곡 제목 입력" />
                            {auth.authenticated && auth.authority === "ROLE_USER" ? 
                               <LightButton
                                    id="view"
                                    value={this.props.isStore ? "매장" : "개인"}
                                    className="main-page-btn" /> : null}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div id="list_area">
                                <table id="list" className="list">
                                    {this.props.playlist}
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}